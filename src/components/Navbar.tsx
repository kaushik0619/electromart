import { useState, useEffect, useRef } from 'react';
import { Search, Heart, ShoppingBag, User, LogOut, LayoutDashboard, Package, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../hooks/useCart';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinkClasses = (page: string) =>
    `text-sm font-medium transition-colors ${
      currentPage === page
        ? 'text-primary-DEFAULT'
        : 'text-neutral-600 hover:text-primary-DEFAULT'
    }`;

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center gap-8">
            <button onClick={() => onNavigate('landing')} className="text-xl font-bold text-secondary">
              TechMart
            </button>
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => onNavigate('landing')} className={navLinkClasses('landing')}>Home</button>
              <button onClick={() => onNavigate('shop')} className={navLinkClasses('shop')}>Shop</button>
              <button onClick={() => onNavigate('deals')} className={navLinkClasses('deals')}>Deals</button>
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative w-64">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            </div>

            <button onClick={() => onNavigate('wishlist')} className="p-2 text-neutral-600 hover:text-primary-DEFAULT rounded-full hover:bg-neutral-100 transition-colors">
              <Heart className="w-6 h-6" />
            </button>

            <button onClick={() => onNavigate('cart')} className="relative p-2 text-neutral-600 hover:text-primary-DEFAULT rounded-full hover:bg-neutral-100 transition-colors">
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary-DEFAULT text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <div className="w-px h-6 bg-neutral-200"></div>

            {user ? (
              <div className="relative" ref={menuRef}>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center text-neutral-600 font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                </button>
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1"
                    >
                      <div className="px-4 py-3 border-b border-neutral-100">
                        <p className="text-sm font-semibold text-neutral-900 truncate">{user.username}</p>
                        <p className="text-xs text-neutral-500 capitalize">{user.role}</p>
                      </div>
                      <div className="py-1">
                        <button onClick={() => { onNavigate('account'); setIsMenuOpen(false); }} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                          <User className="w-5 h-5" /> My Account
                        </button>
                        <button onClick={() => { onNavigate('orders'); setIsMenuOpen(false); }} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                          <Package className="w-5 h-5" /> My Orders
                        </button>
                        {user.role === 'admin' && (
                          <button onClick={() => { onNavigate('admin'); setIsMenuOpen(false); }} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                            <LayoutDashboard className="w-5 h-5" /> Admin Dashboard
                          </button>
                        )}
                        <div className="border-t border-neutral-100 my-1"></div>
                        <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                          <LogOut className="w-5 h-5" /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button onClick={() => onNavigate('login')} className="text-sm font-medium text-neutral-600 hover:text-primary-DEFAULT">
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
