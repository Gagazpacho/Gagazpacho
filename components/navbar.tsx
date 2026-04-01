'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '../app/context/CartContext';

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) { // start transparency after 50px scroll
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    });
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-locked', isOpen);
    return () => {
      document.body.classList.remove('nav-locked');
    };
  }, [isOpen]);

  // Check if current path is shop or shop product page
  const isShopActive = pathname === '/shop' || pathname.startsWith('/shop/');

  // Check if current path is home or project page
  const isRecentWorksActive = pathname === '/' || pathname.startsWith('/projects/');

  const isCartActive = pathname === '/cart';

  const closeNav = () => setIsOpen(false);
  const toggleNav = () => setIsOpen((prev) => !prev);

  return (
    <>
      <header className="header">
        <div className="container header-flex">
          <nav className={`nav ${isOpen ? 'is-open' : ''}`} id="main-nav">
            <div className="nav-links">
              <Link href="/pages/main.html" onClick={closeNav}>INICIO</Link>
              <Link
                href="http://localhost:3000"
                className={isRecentWorksActive ? 'active' : ''}
                onClick={closeNav}
              >
                OBRAS RECIENTES
              </Link>

              <Image
                src="/images/logo2.webp"
                alt="GAGAZPACHO Logo"
                width={40}
                height={40}
                className="center-logo"
              />

              <Link href="/pages/who.html" onClick={closeNav}>QUIÉN</Link>
              <Link
                href="/shop"
                className={isShopActive ? 'active' : ''}
                onClick={closeNav}
              >
                TIENDA
              </Link>
              <Link
                href="/cart"
                className={`cart-link ${isCartActive ? 'active' : ''}`}
                onClick={closeNav}
              >
                CARRITO
                <span
                  className="cart-count"
                  aria-live="polite"
                  style={{ display: totalItems > 0 ? 'inline-flex' : 'none' }}
                >
                  {totalItems}
                </span>
              </Link>
            </div>
          </nav>
          <button
            className="nav-toggle"
            type="button"
            aria-controls="main-nav"
            aria-expanded={isOpen}
            aria-label="Abrir menú"
            onClick={toggleNav}
          >
            <Image src="/images/logo2.webp" alt="Menú" width={22} height={22} />
          </button>
        </div>
      </header>
      <div
        className={`nav-backdrop ${isOpen ? 'is-visible' : ''}`}
        id="nav-backdrop"
        aria-hidden={!isOpen}
        onClick={closeNav}
      ></div>
    </>
  );
}

