import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
}

interface LandingProps {
  onNavigate: (page: string) => void;
  onSelectProduct: (id: string) => void;
}

const categories = [
  { name: 'Electronics', image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg' },
  { name: 'Car Accessories', image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg' },
  { name: 'Gadgets', image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg' },
  { name: 'Special Offers', image: 'https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg' },
];

const mockFeaturedProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise-Cancelling Headphones',
    price: 249.99,
    images: ['https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
  },
  {
    id: '2',
    name: 'Smartwatch with Fitness Tracker',
    price: 199.00,
    images: ['https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
  },
  {
    id: '3',
    name: 'Portable Bluetooth Speaker',
    price: 89.50,
    images: ['https://images.pexels.com/photos/1279813/pexels-photo-1279813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
  },
  {
    id: '4',
    name: '4K Action Camera',
    price: 150.00,
    images: ['https://images.pexels.com/photos/3062946/pexels-photo-3062946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
  },
];

export function Landing({ onNavigate, onSelectProduct }: LandingProps) {
  const [featuredProducts] = useState<Product[]>(mockFeaturedProducts);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-neutral-800 text-white flex items-center justify-center">
        <img
          src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
          alt="Tech store background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover the Latest in Tech and Auto</h1>
          <p className="text-lg md:text-xl text-neutral-200 mb-8">
            Explore our curated selection of electronics, car accessories, and innovative gadgets. Find the perfect blend of quality and value.
          </p>
          <button
            onClick={() => onNavigate('shop')}
            className="bg-primary-DEFAULT text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-hover transition-transform transform hover:scale-105"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="py-16 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-10">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <div key={category.name} className="relative rounded-xl overflow-hidden group cursor-pointer" onClick={() => onNavigate('shop')}>
                <img src={category.image} alt={category.name} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
                  <h3 className="text-white text-xl font-bold">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-10">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product.id)}
                className="bg-white border border-neutral-200 rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              >
                <div className="relative h-56 bg-neutral-100">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-base font-semibold text-neutral-800 truncate">{product.name}</h3>
                  <p className="text-lg font-bold text-neutral-900 mt-2">${product.price.toFixed(2)}</p>
                  <button className="mt-4 w-full bg-primary-DEFAULT text-white font-semibold py-2 rounded-lg hover:bg-primary-hover transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('shop')}
              className="text-primary-DEFAULT font-semibold hover:underline flex items-center gap-2 justify-center"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
