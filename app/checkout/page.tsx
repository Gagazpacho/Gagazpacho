"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import Navbar from "@/components/navbar";


export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice, totalItems, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map(item => ({ slug: item.slug, quantity: item.quantity, size: item.size })),
        }),
      });
      
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // redirect to Stripe checkout
      } else {
        alert(data.error || "Checkout failed. Please try again.");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error(error);
      alert("Checkout failed. Please try again.");
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <main className="bg-black text-white min-h-screen pt-32 pb-32 flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold uppercase text-[#ff8a00] mb-6">Tu carrito está vacío</h1>
            <Link
              href="/shop"
              className="inline-block px-8 py-4 bg-[#ff8a00] text-black font-bold uppercase text-sm tracking-widest rounded-lg hover:bg-[#ff5e00] transition-all"
            >
              Seguir comprando
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-black text-white min-h-screen pt-32 pb-32 flex items-center justify-center relative overflow-hidden">
        
        {/* BACKGROUND EFFECTS */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#ff8a00]/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tl from-[#ff3c3c]/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="w-full max-w-4xl mx-auto px-8 md:px-12 lg:px-16 relative z-10">
        <div className="h-9"></div>
          {/* MAIN CONTENT */}
          <div className="max-w-4xl mx-auto px-8 md:px-16 lg:px-24">
            
            {/* HEADER */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-7xl font-black uppercase text-[#ff8a00] tracking-wider leading-tight mb-4 font-sans">
                Finalizar compra
              </h1>
              <h2 className="text-2xl font-bold uppercase text-white/90 tracking-[0.15em] px-8" style={{fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '0.1em'}}>
                Tu pedido
              </h2>
            </div>
            <div className="h-7"></div>

            {/* ORDER SUMMARY CARD */}
            <div className="bg-transparent p-16 mb-12 relative overflow-hidden">
              <div className="relative z-10 px-8">
              {/* ITEMS LIST */}
              <div className="!space-y-6 mb-10 px-6 sm:px-8 lg:px-10">
                {cart.map((item) => (
                  <div key={`${item.slug}-${item.size || "nosize"}`} className="flex items-center gap-6 p-5 bg-[#1b1b1b] rounded-[16px] shadow-[inset_0_0_16px_rgba(255,255,255,0.04)] hover:shadow-[inset_0_0_18px_rgba(255,176,74,0.16)] transition-all backdrop-blur-sm border border-[#d4a373]/60 hover:border-[#f0c38f]">
                    <div className="w-20 h-20 rounded-lg overflow-hidden shadow-[0_0_12px_rgba(255,138,0,0.2)] flex-shrink-0 mr-4">
                      <img
                        src={`/images/${item.image}`}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      
                    </div>
                    
                    <div className="flex-1 min-w-0 mr-6">
                      <p className="text-lg text-gray-100 font-bold font-montserrat mb-2">{item.title}</p>
                      <p className="text-sm text-gray-400 font-montserrat">
                        Cantidad: {item.quantity} × €{item.price.toFixed(2)}
                      </p>
                      {item.size && (
                        <p className="text-xs text-gray-500 font-montserrat mt-2">
                          Talla: {item.size}
                        </p>
                      )}
                    </div>
                    <p className="text-xl text-[#ff8a00] font-bold font-montserrat flex-shrink-0 pr-2">
                      €{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              

              </div>
            </div>
            <div className="h-7"></div>

            {/* TOTAL */}
            <div className="flex justify-between items-center px-8 mb-12">
              <span className="text-2xl font-bold uppercase tracking-widest font-montserrat text-white">Total</span>
              <span className="text-2xl text-[#ff8a00] font-bold font-montserrat">€{totalPrice.toFixed(2)}</span>
            </div>
             <div className="h-7"></div>

            {/* INFO BOX */}
            <div className="bg-gradient-to-br from-[#ff8a00]/10 to-[#ff8a00]/5 rounded-2xl p-10 mb-12 shadow-[inset_0_0_30px_rgba(255,138,0,0.1)] backdrop-blur-sm">
              <div className="flex items-start gap-6">
                
                <div className="w-14 h-14 rounded-full bg-[#ff8a00]/20 flex items-center justify-center flex-shrink-0 mt-1">
                
                  <svg className="w-8 h-8 text-[#ff8a00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="h-3"></div>
                  <h3 className="text-[#ff8a00] font-bold text-2xl mb-4 font-montserrat">¿Qué sucede ahora?</h3>
                  <ul className="text-gray-300 text-base space-y-3 font-montserrat">
                    <li>• Serás redirigido al pago seguro de Stripe</li>
                    <li>• Introduce tus datos de envío y pago</li>
                    <li>• Completa tu compra de forma segura</li>
                    <div className="h-3"></div>
                  </ul>
                </div>
                
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="h-7"></div>
            <div className="flex px-16 py-6 flex-col sm:flex-row gap-12 justify-between items-center">
              <Link
                href="/cart"
                className="px-16 py-6 border-2 border-gray-700 text-gray-300 font-bold uppercase text-base tracking-widest rounded-xl hover:border-[#ff8a00] hover:text-[#ff8a00] transition-all font-montserrat"
              >
                ← Volver al carrito
              </Link>
              
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className={`px-30 py-15 font-bold uppercase text-lg tracking-[0.2em] rounded-xl transition-all duration-300 font-montserrat shadow-lg ${
                  isProcessing
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-[#ff8a00] text-black hover:bg-[#ff5e00] hover:shadow-[0_0_50px_rgba(255,138,0,0.7)] transform hover:scale-105"
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-4">
                    <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </span>
                ) : (
                  "Ir al pago →"
                )}
              </button>
            </div>

            {/* SECURITY BADGES */}
            <div className="mt-16 text-center">
              <div className="flex items-center justify-center gap-4 text-gray-500 text-sm font-montserrat">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Pago seguro a través de Stripe</span>
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
              <a href="https://www.instagram.com/gagazpacho_art/" aria-label="Instagram">
                <img src="/images/icon-instagram.png" alt="" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100076318996215" aria-label="Facebook">
                <img src="/images/icon-facebook.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
