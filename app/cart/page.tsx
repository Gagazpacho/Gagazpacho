"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import Navbar from "@/components/navbar";


export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const total = totalPrice;

  return (
    <>
      <Navbar />

      <main className="bg-black text-white min-h-screen pt-32 pb-32 flex flex-col items-center">
        <div className="w-full max-w-7xl px-8">
          
          {/* HEADER */}
          <div className="mb-16">
            <h1 className="text-6xl md:text-7xl font-extrabold uppercase text-[#ff8a00] tracking-wide leading-tight mb-4">
              Carrito de Compras
            </h1>
            <div className="w-20 h-[2px] bg-gradient-to-r from-[#ff8a00] to-transparent"></div>
            <p className="text-gray-400 text-sm uppercase tracking-widest mt-14 font-montserrat mb-12">
              {totalItems} {totalItems === 1 ? "Artículo" : "Artículos"}
            </p>
          </div>

          <div className="h-8"></div>

          {cart.length === 0 ? (
            // EMPTY CART
            <div className="text-center py-20">
              <p className="text-2xl text-gray-500 mb-8">Tu carrito está vacío</p>
              <Link
                href="/shop"
                className="inline-block px-8 py-4 bg-[#ff8a00] text-black font-bold uppercase text-sm tracking-widest rounded-lg hover:bg-[#ff5e00] transition-all"
              >
                Continuar Comprando
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* LEFT: CART ITEMS */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-6 items-center text-xs uppercase tracking-widest text-gray-500 border-b border-gray-800 pb-4 font-montserrat font-bold">
                  <span>Detalles del Producto</span>
                  <span className="text-center">Cantidad</span>
                  <span className="text-right">Precio</span>
                  <span className="text-right">Total</span>
                </div>

                {cart.map((item) => (
  <div
    key={`${item.slug}-${item.size || "nosize"}`}
    className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-6 items-center border-b border-gray-800 pb-6"
  >
    {/* PRODUCT DETAILS */}
    <div className="flex items-center gap-4">
      <Link href={`/shop/${item.slug}`} className="flex-shrink-0">
        <img
          src={`/images/${item.image}`}
          alt={item.title}
          className="w-24 h-24 object-cover rounded-lg border border-[#ff8a00]/20"
        />
      </Link>
      <div className="flex-1">
        <Link href={`/shop/${item.slug}`}>
          <h3 className="text-base font-bold text-white hover:text-[#ff8a00] transition-colors font-montserrat">
            {item.title}
          </h3>
        </Link>
        
        {/* LÓGICA ACTUALIZADA PARA TAMAÑO / TALLA */}
        <p className="text-xs text-gray-500 uppercase tracking-wide mt-1 font-montserrat">
          {item.category || "Arte Impreso"}
          {item.size && (
            item.category?.toLowerCase() === "prints" 
              ? ` · Tamaño ${item.size}` 
              : ` · Talla ${item.size}`
          )}
        </p>

        <button
          onClick={() => removeFromCart(item.slug, item.size)}
          className="text-xs text-red-500 hover:text-red-400 mt-2 uppercase tracking-widest font-montserrat"
        >
          Eliminar
        </button>
      </div>
    </div>

                    {/* QUANTITY */}
                    <div className="flex items-center justify-center">
                      <div className="flex items-center gap-0 border border-gray-700 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.slug, item.quantity - 1, item.size)}
                          className="px-3 py-2 hover:bg-[#ff8a00] hover:text-black transition-colors font-bold"
                        >
                          −
                        </button>
                        <div className="px-4 py-2 border-l border-r border-gray-700 min-w-[50px] text-center">
                          <span className="font-bold">{item.quantity}</span>
                          {item.quantity >= 20 && (
                            <span className="text-[10px] text-red-400 block">Máx</span>
                          )}
                        </div>
                        <button
                          onClick={() => updateQuantity(item.slug, item.quantity + 1, item.size)}
                          disabled={item.quantity >= 20}
                          className="px-3 py-2 hover:bg-[#ff8a00] hover:text-black transition-colors font-bold disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* PRICE */}
                    <div className="text-right">
                      <p className="text-base text-gray-400 font-montserrat">€{item.price.toFixed(2)}</p>
                    </div>

                    {/* TOTAL */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#ff8a00] font-montserrat">
                        €{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                {/* CONTINUE SHOPPING */}
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-[#ff8a00] transition-colors uppercase tracking-widest mt-8"
                >
                  ← Continuar Comprando
                </Link>
              </div>

              {/* RIGHT: ORDER SUMMARY */}
              <div className="bg-[#0e0e0e] border border-[#ff8a00]/20 rounded-lg p-8 h-fit sticky top-32">
                <h2 className="text-2xl font-extrabold uppercase tracking-wide mb-8 text-[#ff8a00] font-montserrat">
                  Resumen del Pedido
                </h2>

                {/* ITEMS */}
                <div className="space-y-6 mb-8">
                  <div className="text-base">
                    <span className="text-gray-400 font-montserrat uppercase tracking-wide text-sm">Subtotal ({totalItems} artículos)</span>
                  </div>
                </div>

                {/* TOTAL */}
                <div className="border-t border-[#ff8a00]/30 pt-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="uppercase tracking-wide font-montserrat font-bold text-white text-lg">Total</span>
                    <span className="text-[#ff8a00] font-extrabold text-2xl">€{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* CHECKOUT BUTTON */}
                <Link href="/checkout" className="block w-full py-5 px-6 bg-[#ff8a00] text-black font-bold uppercase text-base tracking-[0.2em] rounded-lg hover:bg-[#ff5e00] hover:shadow-[0_0_25px_rgba(255,138,0,0.5)] transition-all duration-300 font-montserrat text-center">
                  Pagar
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <nav className="footer-nav">
            <a href="/pages/cookies.html">Cookies</a>
            <a href="/pages/privacy-policy.html">Política de Privacidad</a>
            <a href="/pages/legal-warning.html">Aviso Legal</a>
            <a href="/pages/terms.html">Términos y Condiciones</a>
          </nav>

          <div className="footer-meta">
            <p>Desarrollado Por: Mateusz Plizga</p>
            <p>© 2026 GAGAGAZPACHO</p>
            <p>pablozunolg@gmail.com / +34 613 190 883</p>
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
