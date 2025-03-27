import { NextResponse } from 'next/server';
import { getCartItems, addToCart } from '@/app/lib/db/cartDb';
import { Product } from '@/app/mocks/products';

export async function GET() {
  try {
    const items = await getCartItems();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cart items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const product: Product = await request.json();
    const items = await addToCart(product);
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 });
  }
} 