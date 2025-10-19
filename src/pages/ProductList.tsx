import { useState, useEffect } from 'react';
import { Star, ChevronRight, ChevronLeft } from 'lucide-react';
import { api } from '../lib/api';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
}

interface ProductListProps {
  onSelectProduct: (id: string) => void;
}

interface ProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}


const FilterSidebar = () => {
  const [price, setPrice] = useState(500);

  return (
    <aside className="w-full lg:w-1/4 lg:pr-8">
      <div className="space-y-6 p-4 border border-neutral-200 rounded-xl">
        <div>
          <h3 className="font-semibold text-neutral-800 mb-3">Category</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 rounded border-neutral-300 text-primary-DEFAULT focus:ring-primary-DEFAULT" defaultChecked />
              <span className="ml-3 text-sm text-neutral-600">Electronics</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 rounded border-neutral-300 text-primary-DEFAULT focus:ring-primary-DEFAULT" />
              <span className="ml-3 text-sm text-neutral-600">Car Accessories</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 rounded border-neutral-300 text-primary-DEFAULT focus:ring-primary-DEFAULT" />
              <span className="ml-3 text-sm text-neutral-600">Home Appliances</span>
            </label>
          </div>
        </div>
        <div className="border-t border-neutral-200 pt-6">
          <h3 className="font-semibold text-neutral-800 mb-4">Price</h3>
          <input
            type="range"
            min="10"
            max="1000"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-neutral-500 mt-2">
            <span>$10</span>
            <span>${price}</span>
          </div>
        </div>
        <div className="border-t border-neutral-200 pt-6">
          <h3 className="font-semibold text-neutral-800 mb-3">Brand</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 rounded border-neutral-300 text-primary-DEFAULT focus:ring-primary-DEFAULT" defaultChecked />
              <span className="ml-3 text-sm text-neutral-600">TechPro</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 rounded border-neutral-300 text-primary-DEFAULT focus:ring-primary-DEFAULT" defaultChecked />
              <span className="ml-3 text-sm text-neutral-600">AutoGear</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 rounded border-neutral-300 text-primary-DEFAULT focus:ring-primary-DEFAULT" defaultChecked />
              <span className="ml-3 text-sm text-neutral-600">HomeTech</span>
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
};

const ProductCard = ({ product, onSelectProduct }: { product: Product; onSelectProduct: (id: string) => void; }) => (
  <div
    key={product._id}
    onClick={() => onSelectProduct(product._id)}
    className="bg-white border border-neutral-200 rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
  >
    <div className="relative h-56 bg-neutral-100">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-4">
      <h3 className="text-base font-semibold text-neutral-800 truncate group-hover:text-primary-DEFAULT">{product.name}</h3>
      <p className="text-sm text-neutral-500 mt-1 line-clamp-2">{product.description}</p>
      <div className="flex items-center justify-between mt-4">
        <p className="text-lg font-bold text-neutral-900">${product.price.toFixed(2)}</p>
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-xs text-neutral-500 ml-1">(121)</span>
        </div>
      </div>
    </div>
  </div>
);

export function ProductList({ onSelectProduct }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      setError(null);
      const response: ProductsResponse = await api.get('/products');
      setProducts(response.products);
      setPagination(response.pagination);
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="text-center py-20">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={loadProducts}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">Products</h1>
        <div className="flex flex-col lg:flex-row">
          <FilterSidebar />
          <main className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} onSelectProduct={onSelectProduct} />
              ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center items-center mt-12 space-x-2">
              <button className="p-2 rounded-md hover:bg-neutral-100"><ChevronLeft className="w-5 h-5" /></button>
              <button className="w-8 h-8 rounded-md bg-primary-DEFAULT text-white text-sm font-medium">1</button>
              <button className="w-8 h-8 rounded-md hover:bg-neutral-100 text-sm font-medium">2</button>
              <button className="w-8 h-8 rounded-md hover:bg-neutral-100 text-sm font-medium">3</button>
              <button className="p-2 rounded-md hover:bg-neutral-100"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
