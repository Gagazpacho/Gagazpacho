"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { products } from "../data/shop/products";
import Navbar from "@/components/navbar";

const PARTICLE_COUNT = 15;
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};
const shuffleWithSeed = <T,>(items: T[], seed: number) => {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const particles = Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
  const left = seededRandom(42 + i * 2) * 100;
  const top = seededRandom(1337 + i * 3) * 100;
  const duration = 4 + i;
  const delay = i * 0.3;
  return {
    left: `${left.toFixed(4)}%`,
    top: `${top.toFixed(4)}%`,
    duration,
    delay,
  };
});

export default function ShopLanding() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceSort, setPriceSort] = useState<string>("none");
  const [dateSort, setDateSort] = useState<string>("none");
  const [openMenu, setOpenMenu] = useState<"filter" | "sort" | null>(null);

  const shuffledProducts = useMemo(() => shuffleWithSeed(products, 1337), []);

  // Get unique categories
  const categories = ["all", ...new Set(products.map(p => p.category || "Lámina de Arte"))];

  // Filter and sort products
  let filteredProducts = selectedCategory === "all" 
    ? shuffledProducts 
    : shuffledProducts.filter(p => (p.category || "Art Print") === selectedCategory);

  // Apply sorting
  if (priceSort === "asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (priceSort === "desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (dateSort === "newest") {
    filteredProducts = [...filteredProducts].reverse();
  } else if (dateSort === "oldest") {
    filteredProducts = [...filteredProducts];
  }

  const getSortLabel = () => {
    if (priceSort === "asc") return "Menor → Mayor";
    if (priceSort === "desc") return "Mayor → Menor";
    if (dateSort === "newest") return "Más nuevo";
    if (dateSort === "oldest") return "Más antiguo";
    return "Ordenar";
  };

  const getFilterLabel = () => {
    if (selectedCategory === "all") return "Todos";
    return selectedCategory;
  };

  const closeMenus = () => setOpenMenu(null);

  return (
    <>
      <Navbar />

      <main className="shop-shell bg-black text-white min-h-screen relative z-0 pt-32 pb-32 overflow-hidden">
        
        {/* ANIMATED BACKGROUND */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Gradient orbs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#ff8a00]/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#ff3c3c]/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-[#ff8a00]/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Animated grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#ff8a00" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Floating particles */}
          <div className="absolute inset-0">
            {particles.map((particle, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-[#ff8a00] rounded-full opacity-30"
                style={{
                  left: particle.left,
                  top: particle.top,
                  animation: `float ${particle.duration}s infinite ease-in-out`,
                  animationDelay: `${particle.delay}s`,
                }}
              />
            ))}
          </div>

          {/* Noise texture */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`
            }}
          />
        </div>

        {/* CENTERED MAIN CONTENT */}
        <div className="shop-inner flex flex-col items-center w-full px-8 md:px-16 relative z-10">
          
          {/* HEADER WITH BUTTONS */}
          <div className="shop-toolbar w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-6 mb-24">
            <header className="text-center sm:text-left flex-1">
              <h1 className="text-6xl md:text-7xl font-extrabold uppercase text-[#ff8a00] tracking-wide leading-tight">
                Tienda
              </h1>
              <div className="w-20 h-[2px] bg-gradient-to-r from-[#ff8a00] to-transparent mx-auto md:mx-0 gap-14"></div>
              <p className="text-gray-400 text-xs uppercase tracking-[0.3em] font-light gap-14">
                Cosinas bien guapas, de mi pa ti
              </p>
            </header>

            {/* BUTTONS CONTAINER */}
            <div className="flex gap-4 flex-shrink-0">
              
              {/* FILTER BUTTON */}
              <div className="relative">
                <button
                  onClick={() => setOpenMenu(openMenu === "filter" ? null : "filter")}
                  className="px-6 py-3 border-2 border-[#ff8a00] text-[#ff8a00] font-bold uppercase text-xs tracking-widest rounded-none hover:bg-[#ff8a00] hover:text-black transition-all duration-300 flex items-center gap-3 whitespace-nowrap shadow-lg hover:shadow-[0_0_20px_rgba(255,138,0,0.4)]"
                >
                  Filtrar
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${openMenu === "filter" ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                {/* FILTER DROPDOWN */}
                {openMenu === "filter" && (
                  <div className="absolute top-full left-0 mt-3 bg-black border-2 border-[#ff8a00]/60 rounded-none shadow-2xl z-50 min-w-64 overflow-hidden backdrop-blur-sm">
                    
                    {/* CATEGORIES SECTION */}
                    <div className="p-4 border-b border-[#ff8a00]/30">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-[#ff8a00] mb-4">Categorías</h3>
                      <div className="flex flex-col gap-2">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => {
                              setSelectedCategory(cat);
                              closeMenus();
                            }}
                            className={`text-left text-xs py-3 px-3 transition-all duration-200 border-l-2 ${
                              selectedCategory === cat 
                                ? "bg-[#ff8a00]/20 text-[#ff8a00] font-bold border-[#ff8a00] translate-x-1" 
                                : "text-gray-300 hover:text-[#ff8a00] border-transparent hover:border-[#ff8a00] hover:bg-[#ff8a00]/10"
                            }`}
                          >
                            {cat === "all" ? "Todos los productos" : cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* RESET OPTION */}
                    <div className="p-2 bg-black/50">
                      <button
                        onClick={() => {
                          setSelectedCategory("all");
                          closeMenus();
                        }}
                        className="w-full text-left text-xs py-2 px-3 text-gray-400 hover:text-[#ff8a00] transition-colors font-light uppercase tracking-wide"
                      >
                        Restablecer categoría
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* SORT BUTTON */}
              <div className="relative">
                <button
                  onClick={() => setOpenMenu(openMenu === "sort" ? null : "sort")}
                  className="px-6 py-3 border-2 border-[#ff8a00] text-[#ff8a00] font-bold uppercase text-xs tracking-widest rounded-none hover:bg-[#ff8a00] hover:text-black transition-all duration-300 flex items-center gap-3 whitespace-nowrap shadow-lg hover:shadow-[0_0_20px_rgba(255,138,0,0.4)]"
                >
                  {getSortLabel()}
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${openMenu === "sort" ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                {/* SORT DROPDOWN MENU */}
                {openMenu === "sort" && (
                  <div className="absolute top-full right-0 mt-3 bg-black border-2 border-[#ff8a00]/60 rounded-none shadow-2xl z-50 min-w-64 overflow-hidden backdrop-blur-sm">
                    
                    {/* PRICE SECTION */}
                    <div className="border-b border-[#ff8a00]/30 p-4">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-[#ff8a00] mb-4">Precio</h3>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => {
                            setPriceSort("asc");
                            setDateSort("none");
                            closeMenus();
                          }}
                          className={`text-left text-xs py-3 px-3 transition-all duration-200 border-l-2 ${
                            priceSort === "asc" 
                              ? "bg-[#ff8a00]/20 text-[#ff8a00] font-bold border-[#ff8a00] translate-x-1" 
                              : "text-gray-300 hover:text-[#ff8a00] border-transparent hover:border-[#ff8a00] hover:bg-[#ff8a00]/10"
                          }`}
                        >
                          Menor → Mayor
                        </button>
                        <button
                          onClick={() => {
                            setPriceSort("desc");
                            setDateSort("none");
                            closeMenus();
                          }}
                          className={`text-left text-xs py-3 px-3 transition-all duration-200 border-l-2 ${
                            priceSort === "desc" 
                              ? "bg-[#ff8a00]/20 text-[#ff8a00] font-bold border-[#ff8a00] translate-x-1" 
                              : "text-gray-300 hover:text-[#ff8a00] border-transparent hover:border-[#ff8a00] hover:bg-[#ff8a00]/10"
                          }`}
                        >
                          Mayor → Menor
                        </button>
                      </div>
                    </div>

                    {/* DATE SECTION */}
                    <div className="border-b border-[#ff8a00]/30 p-4">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-[#ff8a00] mb-4">Fecha</h3>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => {
                            setDateSort("newest");
                            setPriceSort("none");
                            closeMenus();
                          }}
                          className={`text-left text-xs py-3 px-3 transition-all duration-200 border-l-2 ${
                            dateSort === "newest" 
                              ? "bg-[#ff8a00]/20 text-[#ff8a00] font-bold border-[#ff8a00] translate-x-1" 
                              : "text-gray-300 hover:text-[#ff8a00] border-transparent hover:border-[#ff8a00] hover:bg-[#ff8a00]/10"
                          }`}
                        >
                          Más nuevo
                        </button>
                        <button
                          onClick={() => {
                            setDateSort("oldest");
                            setPriceSort("none");
                            closeMenus();
                          }}
                          className={`text-left text-xs py-3 px-3 transition-all duration-200 border-l-2 ${
                            dateSort === "oldest" 
                              ? "bg-[#ff8a00]/20 text-[#ff8a00] font-bold border-[#ff8a00] translate-x-1" 
                              : "text-gray-300 hover:text-[#ff8a00] border-transparent hover:border-[#ff8a00] hover:bg-[#ff8a00]/10"
                          }`}
                        >
                          Más antiguo
                        </button>
                      </div>
                    </div>

                    {/* RESET OPTION */}
                    <div className="p-2 bg-black/50">
                      <button
                        onClick={() => {
                          setPriceSort("none");
                          setDateSort("none");
                          closeMenus();
                        }}
                        className="w-full text-left text-xs py-2 px-3 text-gray-400 hover:text-[#ff8a00] transition-colors font-light uppercase tracking-wide"
                      >
                        Restablecer orden
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* PRODUCTS COUNT */}
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-16 font-light">
            <span className="text-[#ff8a00] font-bold text-sm">{filteredProducts.length}</span> productos
          </p>

          {/* PRODUCTS GRID */}
          <section className="shop-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-5xl">
            {filteredProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/shop/${product.slug}`}
                className="group relative overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-[1.06]"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-xl mb-5 border border-[#ff8a00]/20 group-hover:border-[#ff8a00]/60 transition-colors">
                  <img
                    src={`/images/${product.image}`}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none group-hover:from-black/50 transition-all duration-300"></div>
                </div>
                <div className="h-2"></div>

                {/* Product Info - Centered */}
                <div className="text-center space-y-3">
                  <h3 className="text-sm md:text-base font-black uppercase text-[#ff8a00] tracking-[0.2em] transition-colors duration-300 group-hover:text-[#ff5e00] leading-tight font-montserrat">
                    {product.title}
                  </h3>
                  
                  {/* Decorative line */}
                  
                  <p className="text-xl font-bold text-[#ff8a00] tracking-wider group-hover:text-[#ff5e00] transition-colors">
                    €{product.price.toFixed(2)}
                  </p>
                  
                  <p className="text-xs text-gray-500 uppercase tracking-[0.15em] opacity-60 font-light group-hover:opacity-80 transition-opacity">
                    {product.category || 'Lámina de Arte'}
                  </p>
                </div>
              </Link>
            ))}
          </section>
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
            <p>pablo@gagazpacho.com / +34 613 190 883</p>
            <div className="footer-socials">
              <a href="https://www.instagram.com/gagazpacho_art/" aria-label="Instagram">
                <img src="/images/icon-instagram.webp" alt="" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100076318996215" aria-label="Facebook">
                <img src="/images/icon-facebook.webp" alt="" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

