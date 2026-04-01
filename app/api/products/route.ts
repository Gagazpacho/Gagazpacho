import { products } from "@/app/data/shop/products";
import { NextResponse } from "next/server";

export async function GET() {
  // Only return slug and price for all products
  const minimal = products.map(({ slug, price }) => ({ slug, price }));
  return NextResponse.json(minimal);
}
