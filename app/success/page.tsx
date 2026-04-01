"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import Navbar from "@/components/navbar";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart after successful payment
    clearCart();
  }, [clearCart]);

  return (
    <>
      <Navbar />

      <main className="bg-black text-white min-h-screen pt-40 pb-40 flex flex-col items-center justify-center">
        <div className="text-center max-w-3xl px-8">
          {/* Success Icon */}
          <div className="mb-14 animate-bounce">
            <div className="w-32 h-32 mx-auto rounded-full bg-[#ff8a00]/10 border-4 border-[#ff8a00] flex items-center justify-center shadow-[0_0_30px_rgba(255,138,0,0.3)]">
              <svg
                className="w-16 h-16 text-[#ff8a00]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Header */}
          <h1 className="text-6xl md:text-7xl font-extrabold uppercase text-[#ff8a00] tracking-wide leading-tight mb-8">
            Order Confirmed!
          </h1>
          
          <div className="w-24 h-[3px] bg-gradient-to-r from-transparent via-[#ff8a00] to-transparent mx-auto mb-12"></div>

          {/* Message */}
          <div className="text-center mb-16">
            <p className="text-gray-200 text-xl mb-12 font-montserrat font-medium">
              Thank you for your purchase!
            </p>
            <div className="h-3"></div>
            <p className="text-gray-400 text-base font-montserrat leading-relaxed">
              You will receive an email confirmation shortly with your order details.
            </p>
            <div className="h-3"></div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link
              href="/shop"
              className="inline-block px-10 py-5 bg-[#ff8a00] text-black font-bold uppercase text-sm tracking-widest rounded-lg hover:bg-[#ff5e00] transition-all hover:shadow-[0_0_30px_rgba(255,138,0,0.5)] font-montserrat"
            >
              Continue Shopping
            </Link>
            <a
              href="/pages/main.html"
              className="inline-block px-10 py-5 border-2 border-[#ff8a00] text-[#ff8a00] font-bold uppercase text-sm tracking-widest rounded-lg hover:bg-[#ff8a00] hover:text-black transition-all font-montserrat"
            >
              Back to Home
            </a>
          </div>

          {/* Additional Info */}
          <div className="mt-20 p-10 bg-[#111] border border-[#ff8a00]/20 rounded-xl shadow-lg">
            <div className="h-3"></div>
            <h2 className="text-2xl font-bold uppercase text-gray-100 mb-8 tracking-wide font-montserrat text-center">
              What's Next?
            </h2>
            <div className="h-3"></div>
            <ul className="text-center text-gray-400 text-base space-y-5 font-montserrat max-w-md mx-auto">
              <li className="flex items-center justify-center gap-4">
                <span className="text-[#ff8a00] text-xl">✓</span>
                <span>Check your email for order confirmation</span>
              </li>
              <li className="flex items-center justify-center gap-4">
                <span className="text-[#ff8a00] text-xl">✓</span>
                <span>Your items will be prepared for shipment</span>
              </li>
              <li className="flex items-center justify-center gap-4">
                <span className="text-[#ff8a00] text-xl">✓</span>
                <span>You'll receive tracking information soon</span>
              </li>
            </ul>
            <div className="h-3"></div>
          </div>

          {/* Contact */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <div className="h-3"></div>
            <p className="text-gray-500 text-sm font-montserrat text-center">
              Questions?
            </p>
            <p className="text-gray-500 text-sm font-montserrat mt-2 text-center">
              Contact us at: {" "}
              <a href="mailto:pablozunolg@gmail.com" className="text-[#ff8a00] hover:text-[#ff5e00] transition-colors font-medium">
                pablozunolg@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <nav className="footer-nav">
            <a href="/pages/cookies.html">Cookies</a>
            <a href="/pages/privacy-policy.html">Privacy Policy</a>
            <a href="/pages/legal-warning.html">Legal warning</a>
            <a href="/pages/terms.html">Terms and conditions</a>
          </nav>

          <div className="footer-meta">
            <p>Developed By: Mateusz Plizga</p>
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

