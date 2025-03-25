'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Product, mockProducts } from '../mocks/products';
import { useCart } from '../contexts/CartContext';
import CartButton from '../components/CartButton';
import { useSearchParams, useRouter } from 'next/navigation';

const productsPerPage = 3;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  
  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(mockProducts.length / productsPerPage);
  const { items, addToCart, updateQuantity } = useCart();

  useEffect(() => {
    // Simulated API call with delay
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Simulated delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Simulate pagination
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const paginatedProducts = mockProducts.slice(startIndex, endIndex);
        
        setProducts(paginatedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, productsPerPage]);

  const getProductQuantity = (productId: string) => {
    const cartItem = items.find(item => item.product.id === productId);
    return cartItem?.quantity || 0;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 italic text-gray-700 border-l-4 border-gray-300 pl-4">&ldquo;Our Products, your desire&rdquo;</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative aspect-w-16 aspect-h-9 bg-gray-200 h-48">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                <CartButton
                  quantity={getProductQuantity(product.id)}
                  onAdd={() => addToCart(product)}
                  onIncrease={() => updateQuantity(product.id, getProductQuantity(product.id) + 1)}
                  onDecrease={() => updateQuantity(product.id, getProductQuantity(product.id) - 1)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
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