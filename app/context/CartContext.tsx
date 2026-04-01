"use client";
export type { CartItem };
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { products } from "../data/shop/products";

interface CartItem {
  slug: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
  size?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (slug: string, size?: string) => void;
  updateQuantity: (slug: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Compara SLUG y SIZE para que A4 y A3 se traten como productos distintos
  const isSameItem = (a: CartItem, b: Pick<CartItem, "slug" | "size">) =>
    a.slug === b.slug && (a.size || "") === (b.size || "");

  // Cargar carrito desde localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsed = JSON.parse(savedCart) as CartItem[];
      const validSlugs = new Set(products.map((product) => product.slug));
      
      const sanitized = parsed
        .filter((item) => validSlugs.has(item.slug))
        .map((item) => {
          const product = products.find((p) => p.slug === item.slug);
          const isClothes = product?.category?.toLowerCase() === "clothes";
          const isPrints = product?.category?.toLowerCase() === "prints";

          // Si es ropa y perdió la talla, ponemos M por defecto
          if (isClothes && !item.size) {
            return { ...item, size: "M" };
          }
          
          // IMPORTANTE: Para láminas (prints), mantenemos el precio que ya 
          // viene en el localStorage, porque es el precio de la variante elegida.
          return item;
        });
      setCart(sanitized);
    }
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((i) => isSameItem(i, item));
      if (existing) {
        // Si ya existe el mismo slug con la misma talla, sumamos cantidad
        return prev.map((i) =>
          isSameItem(i, item) ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      // Si es un tamaño nuevo, se añade como fila nueva
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (slug: string, size?: string) => {
    setCart((prev) => prev.filter((item) => !isSameItem(item, { slug, size })));
  };

  const updateQuantity = (slug: string, quantity: number, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(slug, size);
      return;
    }
    const validQuantity = Math.min(Math.max(1, Math.floor(quantity)), 20);
    setCart((prev) =>
      prev.map((item) =>
        isSameItem(item, { slug, size }) ? { ...item, quantity: validQuantity } : item
      )
    );
  };

  const clearCart = useCallback(() => setCart([]), []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}