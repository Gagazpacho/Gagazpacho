"use client";

import { useState, use, useRef } from "react";
import "@/styles/shop/slug-responsive.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, Product } from "../../data/shop/products";
import Navbar from "@/components/navbar";
import { useCart } from "../../context/CartContext";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: Props) {
  const { slug } = use(params);
  const product: Product | undefined = products.find((p) => p.slug === slug);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const { addToCart } = useCart();
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // --- NEW: Category and Variant Logic ---
  const isClothes = product?.category?.toLowerCase() === "clothes";
  const isPrints = product?.category?.toLowerCase() === "prints";
  const [selectedSize, setSelectedSize] = useState<string>("");

  const sizeOptionsClothes = ["S", "M", "L", "XL"];
  
  // Fallback to hardcoded print variants if they aren't in your data file yet
  const printVariants = product?.variants || [
    { size: "A4 21x30cm", price: 20 },
    { size: "A3 30x40cm", price: 30 }
  ];

  // Validation: Must select size if it's clothes OR prints
  const isSizeValid = (!isClothes && !isPrints) || selectedSize.length > 0;

  // Calculate the price dynamically based on selected print size
  let currentPrice = product?.price || 0;
  if (isPrints && selectedSize) {
    const activeVariant = printVariants.find(v => v.size === selectedSize);
    if (activeVariant) {
      currentPrice = activeVariant.price;
    }
  }
  // ---------------------------------------

  if (!product) return notFound();

  const normalizeImagePath = (path: string) =>
    path.replace(/\.(png|jpg|jpeg)$/i, ".webp");

  const allImages = [product.image, ...product.gallery].map(normalizeImagePath);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    if (!isSizeValid) return;
    
    for (let i = 0; i < quantity; i++) {
      addToCart({
        slug: product.slug,
        title: product.title,
        price: currentPrice, // <-- UPDATED: Now uses dynamic price
        image: normalizeImagePath(product.image),
        category: product.category,
        size: (isClothes || isPrints) ? selectedSize : undefined, // <-- UPDATED
      });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

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
        if (diff > 0) handleNextImage(); 
        else handlePrevImage(); 
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };
  // --- NUEVO: Lógica de seguimiento del cursor ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current || !imageRef.current) return;
    
    // Obtenemos las dimensiones y posición del contenedor
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    
    // Calculamos el porcentaje de la posición X e Y del ratón
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    // Movemos el "centro" del zoom a esa posición
    imageRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    // Reseteamos al centro cuando el ratón sale
    imageRef.current.style.transformOrigin = "center center";
  };

  return (
    <>
      <Navbar />
      <main className="bg-black text-white min-h-screen pt-32 flex flex-col items-center">
        <div className="w-full max-w-6xl px-8 mb-16">
          <Link href="/shop" className="text-xs text-gray-500 hover:text-[#ff8a00] transition-colors uppercase tracking-widest">
            ← Volver a la tienda
          </Link>
        </div>

        <div className="w-full max-w-6xl px-8 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* --- LEFT: IMAGE SECTION --- */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-full max-w-sm">
                <div
                  ref={imageContainerRef} // <--- AÑADIDO: Enlazamos el contenedor
                  className="relative w-full aspect-[4/5] overflow-visible mb-8 group"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onMouseMove={handleMouseMove}   // <--- AÑADIDO: Detecta movimiento
                  onMouseLeave={handleMouseLeave} // <--- AÑADIDO: Detecta salida
                >
                  <div className="absolute inset-0 rounded-2xl shadow-2xl border border-[#ff8a00]/40 overflow-hidden cursor-zoom-in"> {/* <--- AÑADIDO: cursor-zoom-in */}
                    <img
                      ref={imageRef} // <--- AÑADIDO: Enlazamos la imagen
                      src={`/images/${allImages[currentImageIndex]}`}
                      alt={`${product.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 lg:hover:scale-200"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                  </div>
                  
                  {/* ... El resto de tus botones de la galería se quedan igual ... */}
                  <div className="hidden md:block">
                    <button onClick={handlePrevImage} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#ff8a00] hover:text-white p-2 z-10">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={handleNextImage} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#ff8a00] hover:text-white p-2 z-10">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 bg-black/60 px-3 py-1 rounded text-sm text-[#ff8a00] z-10">
                    {currentImageIndex + 1} / {allImages.length}
                  </div>
                  
                  <div className="absolute top-6 right-6 bg-[#ff8a00] text-black px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg z-20">
                    Nuevo
                  </div>
                </div>
              </div>
            </div>

            {/* --- RIGHT: PRODUCT INFO --- */}
            <div className="flex flex-col gap-10 product-info-responsive-center">
              <div>
                <span className="inline-block text-xs uppercase tracking-widest text-[#ff8a00] font-bold border border-[#ff8a00]/50 px-4 py-2 rounded-full">
                  {product.category || "Lámina de Arte"}
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-extrabold uppercase text-[#ff8a00] tracking-wide leading-tight">
                  {product.title}
                </h1>
                <div className="w-20 h-[2px] bg-gradient-to-r from-[#ff8a00] to-transparent"></div>
              </div>

              {/* UPDATED: Dynamic Price Display */}
              <div className="flex flex-wrap items-end gap-4 pt-4">
                <span className="text-5xl font-bold text-[#ff8a00]">
                  €{currentPrice.toFixed(2)}
                </span>
                <span className="text-xs text-white/40 uppercase tracking-[0.3em]">
                  IVA incl.
                </span>
              </div>

              <div className="pt-6">
                <div className="h-px w-full bg-gradient-to-r from-white/12 via-white/6 to-transparent"></div>
                <div className="space-y-3 pt-6">
                  <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    Calidad premium. Envío gratuito. Disponibilidad limitada.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">Cantidad</h3>
                <div className="flex items-center justify-start">
                  <div className="flex items-center gap-0 border border-gray-700 rounded-lg overflow-hidden">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-[#ff8a00] hover:text-black transition-colors font-bold">−</button>
                    <div className="px-4 py-2 border-l border-r border-gray-700 min-w-[50px] text-center"><span className="font-bold">{quantity}</span></div>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-[#ff8a00] hover:text-black transition-colors font-bold">+</button>
                  </div>
                </div>
              </div>

              {/* EXISTING: Clothes Sizes */}
              {isClothes && (
                <div className="space-y-5">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white">Talla</h3>
                  <div className="flex flex-wrap gap-3">
                    {sizeOptionsClothes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[52px] h-[40px] px-4 border text-sm font-bold uppercase tracking-widest rounded-lg transition-all duration-200 ${
                          selectedSize === size ? "border-[#ff8a00] text-[#ff8a00] bg-[#ff8a00]/15" : "border-gray-600 text-gray-300 hover:border-[#ff8a00] hover:text-[#ff8a00]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <div className="h-2"></div>
                  {!isSizeValid && (
                    <p className="text-xs text-red-400 uppercase tracking-widest font-montserratpt-2">Selecciona una talla para continuar</p>
                  )}
                </div>
              )}

              {/* NEW: Print Variants with Prices */}
              {isPrints && (
                <div className="space-y-5">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white">Tamaño de Lámina</h3>
                  <div className="flex flex-wrap gap-3">
                    {printVariants.map((variant) => (
                      <button
                        key={variant.size}
                        onClick={() => setSelectedSize(variant.size)}
                        className={`h-[40px] px-4 border text-sm font-bold uppercase tracking-widest rounded-lg transition-all duration-200 ${
                          selectedSize === variant.size ? "border-[#ff8a00] text-[#ff8a00] bg-[#ff8a00]/15" : "border-gray-600 text-gray-300 hover:border-[#ff8a00] hover:text-[#ff8a00]"
                        }`}
                      >
                        {variant.size}
                      </button>
                    ))}
                  </div>
                  <div className="h-2"></div>
                  {!isSizeValid && (
                    <p className="text-xs text-red-400 uppercase tracking-widest font-montserratpt-2">Selecciona un tamaño para continuar</p>
                  )}
                </div>
              )}

              <div className="pt-30">
                <button 
                  onClick={handleAddToCart}
                  disabled={!isSizeValid}
                  className={`w-full py-8 px-8 font-bold uppercase text-base tracking-[0.2em] rounded-lg transition-all duration-300 responsive-btn-width ${
                    addedToCart ? "bg-green-600 text-white" : "bg-[#ff8a00] text-black hover:bg-[#ff5e00] hover:shadow-[0_0_25px_rgba(255,138,0,0.5)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none"
                  }`}
                >
                  {addedToCart ? "✓ Añadido al carrito" : "Añadir al carrito"}
                </button>
                <div className="h-5"></div>
                <Link href="/cart" className="block w-full py-8 px-6 border-2 border-[#ff8a00] text-[#ff8a00] font-bold uppercase text-base tracking-[0.2em] rounded-lg hover:bg-[#ff8a00] hover:text-black transition-all duration-300 text-center responsive-btn-width">
                  Ver carrito
                </Link>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <nav className="footer-nav">
            <a href="/pages/cookies.html">Cookies</a>
            <a href="/pages/privacy-policy.html">Política de privacidad</a>
            <a href="/pages/legal-warning.html">Aviso legal</a>
            <a href="/pages/terms.html">Términos y condiciones</a>
          </nav>
          <div className="footer-meta">
            <p>Desarrollado por: Mateusz Plizga</p>
            <p>© 2026 GAGAGAZPACHO</p>
            <p>pablozunolg@gmail.com / +34 613 190 883</p>
            <div className="footer-socials">
              <a href="https://www.instagram.com/gagazpacho_art/" aria-label="Instagram"><img src="/images/icon-instagram.png" alt="" /></a>
              <a href="https://www.facebook.com/profile.php?id=100076318996215" aria-label="Facebook"><img src="/images/icon-facebook.png" alt="" /></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}