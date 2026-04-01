"use client";

import { useState, useRef } from "react";

interface Props {
  mainImage: string;
  images: string[];
  title: string;
}

export default function ProjectImageCarousel({ mainImage, images, title }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const allImages = [mainImage, ...images.filter(img => img !== mainImage)];
  const currentImage = allImages[currentImageIndex];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  // Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          handleNextImage(); // swipe left
        } else {
          handlePrevImage(); // swipe right
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="project-carousel flex justify-center relative group"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="project-carousel-frame overflow-hidden rounded-xl shadow-[0_24px_60px_rgba(255,138,0,0.25)]">
        <img
          src={currentImage}
          alt={title}
          className="project-carousel-image w-full h-full transition-transform duration-500 ease-in-out hover:scale-105"
          decoding="async"
          fetchPriority="high"
        />
      </div>

      {/* Arrows only on desktop */}
      <div className="hidden md:block">
        <button
          onClick={handlePrevImage}
          className="project-carousel-arrow project-carousel-arrow-left absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#ff8a00] hover:text-white p-2"
          aria-label="Previous image"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNextImage}
          className="project-carousel-arrow project-carousel-arrow-right absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#ff8a00] hover:text-white p-2"
          aria-label="Next image"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Image Counter */}
      <div className="absolute bottom-4 right-4 bg-black/60 px-3 py-1 rounded text-sm text-[#ff8a00]">
        {currentImageIndex + 1} / {allImages.length}
      </div>
    </div>
  );
}
