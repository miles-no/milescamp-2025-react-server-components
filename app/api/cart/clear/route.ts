import { NextResponse } from 'next/server';
import { clearCart } from '@/app/lib/db/cartDb';

export async function POST() {
  try {
    await clearCart();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to clear cart' }, { status: 500 });
  }
} 