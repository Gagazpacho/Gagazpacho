"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Navbar from "../../../components/navbar";

const ClientGallery = dynamic(() => import("../../../components/ClientGallery"), {
  loading: () => <div className="w-full h-96 bg-gray-900 animate-pulse rounded"></div>,
});
const ProjectImageCarousel = dynamic(() => import("../../../components/ProjectImageCarousel"), {
  loading: () => <div className="w-full h-96 bg-gray-900 animate-pulse rounded"></div>,
});

export default function ProjectClient({ project, relatedProjects }: any) {
  // Creamos un array único con todas las imágenes del proyecto
  const allImages = [project.mainImage, ...(project.images || [])];
  
  // Guardamos el índice de la imagen abierta (null si está cerrado)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // Funciones de navegación
  const closeNames = () => setCurrentIndex(null);
  const nextImg = useCallback(() => {
    if (currentIndex !== null) setCurrentIndex((currentIndex + 1) % allImages.length);
  }, [currentIndex, allImages.length]);
  
  const prevImg = useCallback(() => {
    if (currentIndex !== null) setCurrentIndex((currentIndex - 1 + allImages.length) % allImages.length);
  }, [currentIndex, allImages.length]);

  // Manejo de teclado (Escape y Flechas)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === "Escape") closeNames();
      if (e.key === "ArrowRight") nextImg();
      if (e.key === "ArrowLeft") prevImg();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, nextImg, prevImg]);

  return (
    <>
      <Navbar />

      <div className="bg-[#0e0e0e] text-white relative z-0 pt-52 pb-0">
        <div className="project-main-wrapper w-full flex justify-center px-8 md:px-16">
          <div className="w-full max-w-7xl mb-40">
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-24 items-center">
              
              <div className="flex flex-col justify-center text-center md:text-left space-y-10">
                <h1 className="font-extrabold uppercase text-[#ff8a00] text-4xl md:text-6xl italic">
                  {project.title}
                </h1>
                <div className="w-20 h-[2px] bg-[#ff8a00] mx-auto md:mx-0"></div>
                <p className="text-gray-300 whitespace-pre-line leading-relaxed">{project.description}</p>
              </div>

              {/* Contenedor del Carrusel con botón de zoom para evitar conflicto con flechas */}
              <div className="relative group min-w-0">
                <ProjectImageCarousel mainImage={project.mainImage} images={project.images} title={project.title} />
                
                {/* Botón de lupa que aparece al pasar el ratón para abrir el modal */}
                <button 
                  onClick={() => setCurrentIndex(0)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-[#ff8a00] p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
                  aria-label="Ver pantalla completa"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                </button>
              </div>

            </div>
          </div>
        </div>

        <section className="gallery pb-16">
          <ClientGallery images={relatedProjects} />
        </section>
      </div>

      {/* --- MODAL CON NAVEGACIÓN --- */}
      {currentIndex !== null && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center select-none animate-in fade-in duration-200">
          
          {/* Botón Cerrar */}
          <button onClick={closeNames} className="absolute top-8 right-8 text-white/50 hover:text-white text-5xl z-[10000]">&times;</button>
          
          {/* Flecha Izquierda */}
          <button onClick={(e) => { e.stopPropagation(); prevImg(); }} className="absolute left-4 md:left-8 text-white/30 hover:text-[#ff8a00] text-6xl z-[10000] p-4 transition-colors">‹</button>
          
          {/* Imagen Actual */}
          <div className="w-full h-full flex items-center justify-center p-4 md:p-20" onClick={closeNames}>
            <img 
              src={allImages[currentIndex]} 
              className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-300"
              alt={`Imagen ${currentIndex + 1}`}
              onClick={(e) => e.stopPropagation()} // Evita que al hacer clic en la foto se cierre
            />
          </div>

          {/* Flecha Derecha */}
          <button onClick={(e) => { e.stopPropagation(); nextImg(); }} className="absolute right-4 md:right-8 text-white/30 hover:text-[#ff8a00] text-6xl z-[10000] p-4 transition-colors">›</button>

          {/* Contador inferior */}
          <div className="absolute bottom-8 text-white/40 tracking-widest text-xs uppercase">
            {currentIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </>
  );
}