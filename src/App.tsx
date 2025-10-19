import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './hooks/useCart';
import { Navbar } from './components/Navbar';
import { ProductList } from './pages/ProductList';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { AdminDashboard } from './pages/AdminDashboard';
import { Orders } from './pages/Orders';
import { Login } from './pages/Login';
import { Landing } from './pages/Landing';
import { Wishlist } from './pages/Wishlist';
import { MyAccount } from './pages/MyAccount';

type Page = 'landing' | 'shop' | 'product' | 'cart' | 'checkout' | 'admin' | 'orders' | 'login' | 'wishlist' | 'account';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  function handleNavigate(page: string) {
    setCurrentPage(page as Page);
    if (page !== 'product') {
      setSelectedProductId(null);
    }
  }

  function handleSelectProduct(id: string) {
    setSelectedProductId(id);
    setCurrentPage('product');
  }

  function handleCheckout() {
    setCurrentPage('checkout');
  }

  function handleCheckoutSuccess() {
    setCurrentPage('orders');
  }

  function handleLoginSuccess() {
    setCurrentPage('landing');
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing onNavigate={handleNavigate} onSelectProduct={handleSelectProduct} />;
      case 'shop':
        return <ProductList onSelectProduct={handleSelectProduct} />;
      case 'product':
        return selectedProductId && <ProductDetail productId={selectedProductId} onBack={() => setCurrentPage('shop')} />;
      case 'cart':
        return <Cart onCheckout={handleCheckout} />;
      case 'checkout':
        return <Checkout onSuccess={handleCheckoutSuccess} />;
      case 'admin':
        return <AdminDashboard />;
      case 'orders':
        return <Orders />;
      case 'login':
        return <Login onSuccess={handleLoginSuccess} />;
      case 'wishlist':
        return <Wishlist />;
      case 'account':
        return <MyAccount />;
      default:
        return <Landing onNavigate={handleNavigate} onSelectProduct={handleSelectProduct} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-white">
          {currentPage !== 'login' && (
            <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
          )}
          <main>{renderPage()}</main>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
