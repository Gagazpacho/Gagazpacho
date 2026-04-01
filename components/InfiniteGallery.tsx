'use client';

import type React from 'react';
import { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';
import { projects } from '../app/data/projects';

type ImageItem = string | { src: string; alt?: string; slug?: string };

interface FadeSettings {
    fadeIn: { start: number; end: number };
    fadeOut: { start: number; end: number };
}

interface BlurSettings {
    blurIn: { start: number; end: number };
    blurOut: { start: number; end: number };
    maxBlur: number;
}

interface InfiniteGalleryProps {
    images: ImageItem[];
    speed?: number;
    zSpacing?: number;
    visibleCount?: number;
    falloff?: { near: number; far: number };
    fadeSettings?: FadeSettings;
    blurSettings?: BlurSettings;
    className?: string;
    style?: React.CSSProperties;
}

interface PlaneData {
    index: number;
    z: number;
    imageIndex: number;
    x: number;
    y: number;
    isInteractive: boolean;
}

const DEFAULT_DEPTH_RANGE = 60;
const MAX_HORIZONTAL_OFFSET = 6;
const MAX_VERTICAL_OFFSET = 5;

const createClothMaterial = () => {
    return new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
            map: { value: null },
            opacity: { value: 1.0 },
            blurAmount: { value: 0.0 },
            scrollForce: { value: 0.0 },
            time: { value: 0.0 },
            isHovered: { value: 0.0 }, // Controla el zoom
        },
        vertexShader: `
      uniform float scrollForce;
      uniform float isHovered;
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        vec3 pos = position;

        // Efecto de Zoom del 10%
        float zoomFactor = 1.0 + (isHovered * 0.3);
        pos.xy *= zoomFactor;
        
        // Deformación por scroll (curvatura)
        float curveIntensity = scrollForce * 0.3;
        float distanceFromCenter = length(pos.xy);
        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;
        
        // Pequeño efecto de vibración por movimiento
        float ripple = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;
        
        pos.z -= (curve + ripple);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
        fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      varying vec2 vUv;
      
      void main() {
        vec4 color = texture2D(map, vUv);
        
        if (blurAmount > 0.0) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          
          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }
        
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
    });
};

function ImagePlane({ texture, position, scale, material, slug, isInteractive }: {
    texture: THREE.Texture;
    position: [number, number, number];
    scale: [number, number, number];
    material: THREE.ShaderMaterial;
    slug?: string;
    isInteractive: boolean;
}) {
    const router = useRouter();
    const meshRef = useRef<THREE.Mesh>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (material && texture) {
            material.uniforms.map.value = texture;
        }
    }, [material, texture]);

    // Manejo de la animación suave del zoom
    useFrame((state, delta) => {
        if (material) {
            const targetZoom = isHovered ? 1.0 : 0.0;
            // Suavizamos el cambio del valor (lerp)
            material.uniforms.isHovered.value = THREE.MathUtils.lerp(
                material.uniforms.isHovered.value,
                targetZoom,
                0.15
            );
        }
        if (meshRef.current) {
            meshRef.current.raycast = isInteractive ? THREE.Mesh.prototype.raycast : () => null;
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={position}
            scale={scale}
            material={material}
            onClick={(e) => {
                e.stopPropagation();
                if (!isInteractive) return;
                if (slug && slug in projects) {
                    router.push(`/projects/${slug}`);
                }
            }}
            onPointerEnter={() => {
                if (!isInteractive) return;
                document.body.style.cursor = 'pointer';
                setIsHovered(true);
            }}
            onPointerLeave={() => {
                document.body.style.cursor = 'default';
                setIsHovered(false);
            }}
        >
            <planeGeometry args={[1, 1, 32, 32]} />
        </mesh>
    );
}

function GalleryScene({ images, speed = 1, visibleCount = 8, fadeSettings = { fadeIn: { start: 0.05, end: 0.15 }, fadeOut: { start: 0.85, end: 0.95 } }, blurSettings = { blurIn: { start: 0.0, end: 0.1 }, blurOut: { start: 0.9, end: 1.0 }, maxBlur: 3.0 } }: Omit<InfiniteGalleryProps, 'className' | 'style'>) {
    const [scrollVelocity, setScrollVelocity] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    const lastInteraction = useRef(Date.now());
    const scrollOffsetRef = useRef(0);

    const normalizedImages = useMemo(() => images.map((img) => typeof img === 'string' ? { src: img, alt: '' } : img), [images]);
    const textures = useTexture(normalizedImages.map((img) => img.src));
    const materials = useMemo(() => Array.from({ length: visibleCount }, () => createClothMaterial()), [visibleCount]);
    const totalImages = normalizedImages.length;
    const depthRange = DEFAULT_DEPTH_RANGE;

    const spatialPositions = useMemo(() => {
        const positions: { x: number; y: number }[] = [];
        for (let i = 0; i < totalImages; i++) {
            const horizontalAngle = (i * 2.618) % (Math.PI * 2);
            const verticalAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);
            const horizontalRadius = (i % 3) * 1.2;
            const verticalRadius = ((i + 1) % 4) * 0.8;
            const x = (Math.sin(horizontalAngle) * horizontalRadius * MAX_HORIZONTAL_OFFSET) / 3;
            const y = (Math.cos(verticalAngle) * verticalRadius * MAX_VERTICAL_OFFSET) / 4 + 1;
            positions.push({ x, y });
        }
        return positions;
    }, [totalImages]);

    const planesData = useRef<PlaneData[]>([]);

    useEffect(() => {
        planesData.current = Array.from({ length: visibleCount }, (_, i) => {
            const initialZ = (depthRange / visibleCount) * i;
            const globalIndex = visibleCount - 1 - i;
            const imgIdx = ((globalIndex % totalImages) + totalImages) % totalImages;
            return {
                index: i,
                z: initialZ,
                imageIndex: imgIdx,
                x: spatialPositions[imgIdx]?.x ?? 0,
                y: spatialPositions[imgIdx]?.y ?? 0,
                isInteractive: true,
            };
        });
    }, [depthRange, spatialPositions, totalImages, visibleCount]);

    const handleWheel = useCallback((event: WheelEvent) => {
        event.preventDefault();
        setScrollVelocity((prev) => prev + event.deltaY * 0.01 * speed);
        setAutoPlay(false);
        lastInteraction.current = Date.now();
    }, [speed]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
            setScrollVelocity((prev) => prev - 2 * speed);
            setAutoPlay(false);
            lastInteraction.current = Date.now();
        } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
            setScrollVelocity((prev) => prev + 2 * speed);
            setAutoPlay(false);
            lastInteraction.current = Date.now();
        }
    }, [speed]);

    useEffect(() => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.addEventListener('wheel', handleWheel, { passive: false });
            document.addEventListener('keydown', handleKeyDown);
            return () => {
                canvas.removeEventListener('wheel', handleWheel);
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [handleWheel, handleKeyDown]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Date.now() - lastInteraction.current > 3000) setAutoPlay(true);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useFrame((state, delta) => {
        if (autoPlay) setScrollVelocity((prev) => prev + 0.3 * delta);
        setScrollVelocity((prev) => prev * 0.95);

        const time = state.clock.getElapsedTime();
        materials.forEach((material) => {
            if (material && material.uniforms) {
                material.uniforms.time.value = time;
                material.uniforms.scrollForce.value = scrollVelocity;
            }
        });

        const totalRange = depthRange;
        const spacing = totalRange / Math.max(visibleCount, 1);
        scrollOffsetRef.current += scrollVelocity * delta * 10;

        planesData.current.forEach((plane, i) => {
            const initialZ = i * spacing;
            const absoluteZ = initialZ + scrollOffsetRef.current;
            const wraps = Math.floor(absoluteZ / totalRange);
            plane.z = absoluteZ - wraps * totalRange;
            const globalIndex = (visibleCount - 1 - i) + wraps * visibleCount;
            
            if (totalImages > 0) {
                plane.imageIndex = ((globalIndex % totalImages) + totalImages) % totalImages;
            }

            const pos = spatialPositions[plane.imageIndex];
            plane.x = pos?.x ?? 0;
            plane.y = pos?.y ?? 0;

            const normalizedPosition = plane.z / totalRange;
            let opacity = 1;

            if (normalizedPosition >= fadeSettings.fadeIn.start && normalizedPosition <= fadeSettings.fadeIn.end) {
                opacity = (normalizedPosition - fadeSettings.fadeIn.start) / (fadeSettings.fadeIn.end - fadeSettings.fadeIn.start);
            } else if (normalizedPosition < fadeSettings.fadeIn.start) {
                opacity = 0;
            } else if (normalizedPosition >= fadeSettings.fadeOut.start && normalizedPosition <= fadeSettings.fadeOut.end) {
                opacity = 1 - (normalizedPosition - fadeSettings.fadeOut.start) / (fadeSettings.fadeOut.end - fadeSettings.fadeOut.start);
            } else if (normalizedPosition > fadeSettings.fadeOut.end) {
                opacity = 0;
            }

            opacity = Math.max(0, Math.min(1, opacity));
            plane.isInteractive = opacity > 0.2 && normalizedPosition >= fadeSettings.fadeIn.start && normalizedPosition <= fadeSettings.fadeOut.end;

            let blur = 0;
            if (normalizedPosition >= blurSettings.blurIn.start && normalizedPosition <= blurSettings.blurIn.end) {
                const blurInProgress = (normalizedPosition - blurSettings.blurIn.start) / (blurSettings.blurIn.end - blurSettings.blurIn.start);
                blur = blurSettings.maxBlur * (1 - blurInProgress);
            } else if (normalizedPosition < blurSettings.blurIn.start) {
                blur = blurSettings.maxBlur;
            } else if (normalizedPosition >= blurSettings.blurOut.start && normalizedPosition <= blurSettings.blurOut.end) {
                const blurOutProgress = (normalizedPosition - blurSettings.blurOut.start) / (blurSettings.blurOut.end - blurSettings.blurOut.start);
                blur = blurSettings.maxBlur * blurOutProgress;
            } else if (normalizedPosition > blurSettings.blurOut.end) {
                blur = blurSettings.maxBlur;
            }

            blur = Math.max(0, Math.min(blurSettings.maxBlur, blur));

            const material = materials[i];
            if (material && material.uniforms) {
                material.uniforms.opacity.value = opacity;
                material.uniforms.blurAmount.value = blur;
            }
        });
    });

    if (normalizedImages.length === 0) return null;

    return (
        <>
            {planesData.current.map((plane, i) => {
                const texture = textures[plane.imageIndex];
                const material = materials[i];
                if (!texture || !material) return null;

                const worldZ = plane.z - depthRange / 2;
                const aspect = texture.image ? (texture.image as HTMLImageElement).width / (texture.image as HTMLImageElement).height : 1;
                const scale: [number, number, number] = aspect > 1 ? [3.5 * aspect, 3.5, 1] : [3.5, 3.5 / aspect, 1];

                return (
                    <ImagePlane
                        key={plane.index}
                        texture={texture}
                        position={[plane.x, plane.y, worldZ]}
                        scale={scale}
                        material={material}
                        slug={normalizedImages[plane.imageIndex]?.slug}
                        isInteractive={plane.isInteractive}
                    />
                );
            })}
        </>
    );
}

function FallbackGallery({ images }: { images: ImageItem[] }) {
    const normalizedImages = useMemo(() => images.map((img) => typeof img === 'string' ? { src: img, alt: '' } : img), [images]);
    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
            <p className="text-gray-600 mb-4">WebGL not supported. Showing image list:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {normalizedImages.map((img, i) => (
                    <img key={i} src={img.src || '/placeholder.svg'} alt={img.alt} className="w-full h-32 object-cover rounded" />
                ))}
            </div>
        </div>
    );
}

export default function InfiniteGallery({
    images,
    className = 'h-96 w-full',
    style,
    fadeSettings = { fadeIn: { start: 0.05, end: 0.25 }, fadeOut: { start: 0.4, end: 0.43 } },
    blurSettings = { blurIn: { start: 0.0, end: 0.1 }, blurOut: { start: 0.4, end: 0.43 }, maxBlur: 8.0 },
}: InfiniteGalleryProps) {
    const [webglSupported, setWebglSupported] = useState(true);

    useEffect(() => {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) setWebglSupported(false);
        } catch (e) {
            setWebglSupported(false);
        }
    }, []);

    if (!webglSupported) {
        return (
            <div className={className} style={style}>
                <FallbackGallery images={images} />
            </div>
        );
    }

    return (
        <div className={className} style={style}>
            <Canvas camera={{ position: [0, 0, 0], fov: 55 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
                <GalleryScene images={images} fadeSettings={fadeSettings} blurSettings={blurSettings} />
            </Canvas>
        </div>
    );
}