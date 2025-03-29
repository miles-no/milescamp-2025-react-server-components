'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Product } from '../mocks/products';
import CartButton from '../components/CartButton';
import { useSearchParams, useRouter } from 'next/navigation';
import { getPaginatedProductsFromDb } from '../lib/db/productsDb';
import { PromotionBanner } from '../lib/db/promotionDb';
import { LoadingSpinner } from '../components/LoadingSpinner';
import CartTotalBar from '../components/CartTotalBar';
import Link from 'next/link';

const productsPerPage = 3;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});
  const [cartLoading, setCartLoading] = useState(true);
  const [promotion, setPromotion] = useState<PromotionBanner | null>(null);
  const [promotionLoading, setPromotionLoading] = useState(true);
  const [promotionError, setPromotionError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { products, totalPages } = await getPaginatedProductsFromDb(currentPage);
        setProducts(products);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCartItems = async () => {
      try {
        setCartLoading(true);
        const response = await fetch('/api/cart');
        if (!response.ok) throw new Error('Failed to fetch cart items');
        const items = await response.json();
        const cartMap = items.reduce((acc: { [key: string]: number }, item: { product: Product, quantity: number }) => {
          acc[item.product.id] = item.quantity;
          return acc;
        }, {});
        setCartItems(cartMap);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setCartLoading(false);
      }
    };

    const fetchPromotion = async () => {
      try {
        setPromotionLoading(true);
        setPromotionError(null);
        const response = await fetch('/api/promotion');
        if (!response.ok) throw new Error('Failed to fetch promotion');
        const data = await response.json();
        setPromotion(data);
      } catch (error) {
        console.error('Error fetching promotion:', error);
        setPromotionError('Failed to load promotion');
      } finally {
        setPromotionLoading(false);
      }
    };

    fetchProducts();
    fetchCartItems();
    fetchPromotion();
  }, [currentPage]);

  const updateCartItem = async (productId: string, quantity: number) => {
    try {
      const response = await fetch(`/api/cart/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });
      if (!response.ok) throw new Error('Failed to update cart');
      const items = await response.json();
      const cartMap = items.reduce((acc: { [key: string]: number }, item: { product: Product, quantity: number }) => {
        acc[item.product.id] = item.quantity;
        return acc;
      }, {});
      setCartItems(cartMap);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const addToCart = async (product: Product) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error('Failed to add to cart');
      const items = await response.json();
      const cartMap = items.reduce((acc: { [key: string]: number }, item: { product: Product, quantity: number }) => {
        acc[item.product.id] = item.quantity;
        return acc;
      }, {});
      setCartItems(cartMap);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const getProductQuantity = (productId: string) => {
    return cartItems[productId] || 0;
  };

  if (loading || cartLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <div className="space-y-8 pb-24">
      <h1 className="text-3xl font-bold">Products</h1>
      {promotion && !promotionError && (
        <div className="bg-blue-100 border border-blue-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-blue-800">{promotion.promotionText}</h2>
          <p className="text-blue-600">Save {promotion.discountPercentage}% until {new Date(promotion.validUntil).toLocaleDateString()}</p>
        </div>
      )}
      {promotionError && (
        <div className="bg-red-100 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{promotionError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <Link href={`/products/${product.id}`}>
              <div className="relative aspect-w-16 aspect-h-9 bg-gray-200 h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </Link>
            <div className="p-4">
              <Link href={`/products/${product.id}`} className="block">
                <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">{product.name}</h2>
              </Link>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                <CartButton
                  quantity={getProductQuantity(product.id)}
                  onAdd={() => addToCart(product)}
                  onIncrease={() => updateCartItem(product.id, getProductQuantity(product.id) + 1)}
                  onDecrease={() => updateCartItem(product.id, getProductQuantity(product.id) - 1)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
      <CartTotalBar />
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="mt-8 flex justify-center items-center gap-4">
      <button
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>
      <span className="text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
} 