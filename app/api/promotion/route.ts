import { NextResponse } from 'next/server';
import { getCurrentPromotion } from '@/app/lib/db/promotionDb';

export async function GET() {
  try {
    const promotion = await getCurrentPromotion();
    return NextResponse.json(promotion);
  } catch (error) {
    console.error('Error fetching promotion:', error);
    return NextResponse.json(
      { error: 'Failed to fetch promotion data' },
      { status: 500 }
    );
  }
} 