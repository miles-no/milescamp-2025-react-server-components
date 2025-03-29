'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../../mocks/products';
import CartButton from '../../components/CartButton';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Product not found');
          }
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    const fetchCartQuantity = async () => {
      try {
        const response = await fetch('/api/cart');
        if (!response.ok) throw new Error('Failed to fetch cart');
        const items = await response.json();
        const item = items.find((item: { product: Product, quantity: number }) => item.product.id === params.id);
        setCartQuantity(item ? item.quantity : 0);
      } catch (err) {
        console.error('Error fetching cart quantity:', err);
      }
    };

    fetchProduct();
    fetchCartQuantity();
  }, [params.id]);

  const updateCartQuantity = async (quantity: number) => {
    try {
      const response = await fetch(`/api/cart/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });
      if (!response.ok) throw new Error('Failed to update cart');
      const items = await response.json();
      const item = items.find((item: { product: Product, quantity: number }) => item.product.id === params.id);
      setCartQuantity(item ? item.quantity : 0);
      window.dispatchEvent(new Event('cart-update'));
    } catch (err) {
      console.error('Error updating cart:', err);
    }
  };

  const addToCart = async () => {
    if (!product) return;
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error('Failed to add to cart');
      const items = await response.json();
      const item = items.find((item: { product: Product, quantity: number }) => item.product.id === params.id);
      setCartQuantity(item ? item.quantity : 0);
      window.dispatchEvent(new Event('cart-update'));
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="text-gray-600">{error || 'Product not found'}</p>
        <Link 
          href="/products" 
          className="text-blue-500 hover:text-blue-600 underline"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>
          <div className="flex items-center gap-4">
            <CartButton
              quantity={cartQuantity}
              onAdd={addToCart}
              onIncrease={() => updateCartQuantity(cartQuantity + 1)}
              onDecrease={() => updateCartQuantity(cartQuantity - 1)}
            />
          </div>
          <Link 
            href="/products" 
            className="inline-block text-blue-500 hover:text-blue-600 underline"
          >
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
} 