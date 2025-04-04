import { Product, mockProducts } from '@/app/mocks/products';

const productsPerPage = 3;

export async function getPaginatedProductsFromDb(page: number = 1): Promise<{
  products: Product[];
  totalPages: number;
}> {
  // Simulated delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulate pagination
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = mockProducts.slice(startIndex, endIndex);
  
  return {
    products: paginatedProducts,
    totalPages: Math.ceil(mockProducts.length / productsPerPage)
  };
}

export async function getProductById(id: string): Promise<Product | null> {
  // Simulated delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const product = mockProducts.find(p => p.id === id);
  return product || null;
} 