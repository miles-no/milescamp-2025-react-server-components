import { NextResponse } from 'next/server';
import { updateCartItemQuantity, removeFromCart } from '@/app/slowDb/cartDb';

export async function PUT(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { quantity } = await request.json();
    const items = await updateCartItemQuantity(params.productId, quantity);
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
    const items = await removeFromCart(params.productId);
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove item from cart' }, { status: 500 });
  }
} 