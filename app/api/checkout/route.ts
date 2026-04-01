import Stripe from "stripe";
import { NextResponse } from "next/server";
import { products } from "../../data/shop/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover" as any,
});

interface CheckoutItem {
  slug: string;
  quantity: number;
  size?: string;
}

export async function POST(req: Request) {
  try {
    const { items }: { items: CheckoutItem[] } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const line_items = items.map((item) => {
      const product = products.find((p) => p.slug === item.slug);
      if (!product) {
        throw new Error(`Invalid product: ${item.slug}`);
      }

      // 1. LÓGICA DE PRECIO
      let unitPrice = product.price;
      if (product.category?.toLowerCase() === "prints" && item.size) {
        const variant = product.variants?.find(v => v.size === item.size);
        if (variant) unitPrice = variant.price;
      }

      const quantity = Math.floor(Number(item.quantity)) || 1;

      // 2. CODIFICACIÓN DE IMAGEN (Esto arregla el error de la 'ñ')
      const origin = req.headers.get("origin") || "";
      const rawImageUrl = `${origin}/images/${product.image}`;
      const safeImageUrl = encodeURI(rawImageUrl); // Transforma "ñ" en "%C3%B1"

      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: item.size ? `${product.title} (${item.size})` : product.title,
            images: [safeImageUrl], // Usamos la URL segura
          },
          unit_amount: Math.round(unitPrice * 100),
        },
        quantity: quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/cart`,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ['AD', 'AL', 'AT', 'BA', 'BE', 'BG', 'CH', 'CZ', 'DE', 
  'DK', 'EE', 'ES', 'FI', 'FR', 'GB', 'GI', 'GR', 'HR', 'HU', 
  'IE', 'IT', 'LI', 'LT', 'LU', 'LV', 'MC', 'MD', 'ME', 
  'MK', 'NL', 'NO', 'PL', 'PT', 'RO', 'RS', 'SE', 'SI', 
  'SK', 'SM', 'UA', 'VA'],
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("STRIPE ERROR:", error); 
    return NextResponse.json(
      { error: "Unable to process checkout. Please try again." },
      { status: 500 }
    );
  }
}