"use client";

import { useRef } from "react";
import Link from "next/link";

interface Image {
  src: string;
  alt: string;
  slug?: string;
}

interface Props {
  images: Image[];
}

export default function ClientGallery({ images }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const loopImages = [...images, ...images];

  return (
    <div className="w-max overflow-hidden relative py-0">
     
        <div
          ref={sliderRef}
          className="flex gap-7 animate-infinite-scroll whitespace-nowrap will-change-transform"
        >
          {loopImages.map((img, idx) => (
            <Link
              key={idx}
              href={img.slug ? `/projects/${img.slug}` : "#"}
              className="flex-shrink-0 w-[320px] h-[220px] md:w-[380px] md:h-[260px] rounded-xl relative cursor-pointer overflow-hidden group shadow-2xl block"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover rounded-xl transition-transform duration-100 ease-out group-hover:scale-105 will-change-transform"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-base text-center rounded-xl p-4 font-semibold group-hover:text-[#ff8a00]">
                Haga clic para ver detalles
              </div>
            </Link>
          ))}
        </div>
      
    </div>
  );
}
