'use client';
import { useEffect } from 'react';
import Navbar from '@/components/navbar';
import InfiniteGallery from '@/components/InfiniteGallery';

export default function Home() {
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // disable scroll on homepage
    return () => {
      document.body.style.overflow = 'auto'; // reset when leaving homepage
    };
  }, []);

  const sampleImages = [
    { slug: 'art-1', src: '/images/GRAFFITIS/abrazobrockhampton/1.webp', category: 'Muralismo', alt: 'abrazobrockhampton' },
    { slug: 'art-2', src: '/images/GRAFFITIS/bananna/1.webp', category: 'Muralismo', alt: 'bananna' },
    { slug: 'art-3', src: '/images/GRAFFITIS/Candy Monster/1.webp', category: 'Muralismo', alt: 'Candy Monster' },
    { slug: 'art-4', src: '/images/Lamparas y objetos/prometeo 1/1.webp', category: 'Arte funcional', alt: 'Lámpara Prometeo' },
    { slug: 'art-5', src: '/images/GRAFFITIS/Dao Beach/1.webp', category: 'Muralismo', alt: 'Dao Beach' },
    { slug: 'art-6', src: '/images/GRAFFITIS/El David y los perros/1.webp', category: 'Muralismo', alt: 'El David y los perros' },
    { slug: 'art-7', src: '/images/GRAFFITIS/El rapto/1.webp', category: 'Muralismo', alt: 'El rapto' },
    { slug: 'art-8', src: '/images/GRAFFITIS/kemando billete/1.webp', category: 'Muralismo', alt: 'kemando billete' },
    { slug: 'art-9', src: '/images/GRAFFITIS/La fiesta Monart/1.webp', category: 'Muralismo', alt: 'La fiesta Monart' },
    { slug: 'art-10', src: '/images/GRAFFITIS/La Plaza/1.webp', category: 'Muralismo', alt: 'La Plaza' },
    { slug: 'art-11', src: '/images/GRAFFITIS/las cabezas/1.webp', category: 'Muralismo', alt: 'las cabezas' },
    { slug: 'art-12', src: '/images/GRAFFITIS/Mapa/1.webp', category: 'Muralismo', alt: 'Mapa' },
    { slug: 'art-13', src: '/images/GRAFFITIS/mimo/1.webp', category: 'Muralismo', alt: 'mimo' },
    { slug: 'art-14', src: '/images/GRAFFITIS/Nadie/1.webp', category: 'Muralismo', alt: 'Nadie' },
    { slug: 'art-15', src: '/images/GRAFFITIS/Titiritero/1.webp', category: 'Muralismo', alt: 'Titiritero' },
    { slug: 'art-16', src: '/images/GRAFFITIS/Tristán Otto/1.webp', category: 'Muralismo', alt: 'Tristán Otto' },
    { slug: 'art-17', src: '/images/GRAFFITIS/westend/1.webp', category: 'Muralismo', alt: 'westend' },
    { slug: 'art-18', src: '/images/GRAFFITIS/Yggdrasil/1.webp', category: 'Muralismo', alt: 'Yggdrasil' },
    { slug: 'art-19', src: '/images/Lamparas y objetos/Las Pistas/1.webp', category: 'Ilustración', alt: 'Las Pistas' }, 
  ];

  return (
    <>
      <Navbar />
      <div className="page-bg min-h-screen relative z-0">
        <main className="relative z-10 h-screen w-screen overflow-hidden">
          <InfiniteGallery
            images={sampleImages}
            speed={2.5}
            zSpacing={1.5}
            visibleCount={19}
            falloff={{ near: 0.3, far: 30 }}
            className="h-screen w-screen"
            style={{ width: '100vw', height: '100vh' }}
          />

          

          <div className="text-center fixed bottom-10 left-0 right-0 font-mono uppercase text-[11px] font-semibold z-20">
            <p className="text-white">
             Utilice la rueda del mouse, las teclas de flecha o toque para navegar
            </p>
            <p className="text-white">Haga clic en cualquier imagen para ver una breve explicación.</p>
            <p className="text-gray-400">
              La reproducción automática se reanuda después de 3 segundos de inactividad
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

