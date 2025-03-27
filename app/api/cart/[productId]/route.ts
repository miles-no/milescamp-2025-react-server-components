import { NextResponse } from 'next/server';
import { updateCartItemQuantity, removeFromCart } from '@/app/lib/db/cartDb';

export async function PUT(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = await params;
    const { quantity } = await request.json();
    const items = await updateCartItemQuantity(productId, quantity);
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update cart item' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = await params;
    const items = await removeFromCart(productId);
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove item from cart' }, { status: 500 });
  }
} 