import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomePage } from './views/HomePage';
import { BrowseRentalsPage } from './views/BrowseRentalsPage';
import { CategoriesPage } from './views/CategoriesPage';
import { OffersPage } from './views/OffersPage';
import { RentalRequestsPage } from './views/RentalRequestsPage';
import { SupplierDashboard } from './views/SupplierDashboard';
import { RenterDashboard } from './views/RenterDashboard';
import { AdminDashboard } from './views/AdminDashboard';
import { AboutPage } from './views/AboutPage';
import { ContactPage } from './views/ContactPage';
import { BecomeSupplierPage } from './views/BecomeSupplierPage';
import { LegalPages } from './views/LegalPages';
import { LoginPage } from './views/LoginPage';
import { LocationModal } from './components/modals/LocationModal';
import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { BookingModal } from './components/modals/BookingModal';
import { PostRequestModal } from './components/modals/PostRequestModal';
import { AuthModal } from './components/modals/AuthModal';
import { EmailInboxModal } from './components/modals/EmailInboxModal';
import { Product } from './types';
import { Home, Compass, Layers, PlusCircle, User, Store, Mail, ArrowRight, Sparkles, SwitchCamera } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activeView,
    setActiveView,
    selectedProduct,
    setSelectedProduct,
    currentRole,
    setCurrentRole,
    currentUser,
    login,
    emails,
    setOpenEmailInboxModal,
    setOpenAuthModal,
    setAuthModalMode,
  } = useApp();

  const [bookingProduct, setBookingProduct] = useState<Product | null>(null);
  const [isPostRequestOpen, setIsPostRequestOpen] = useState<boolean>(false);

  const handleOpenBooking = (prod: Product) => {
    setBookingProduct(prod);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return (
          <HomePage
            onOpenBooking={handleOpenBooking}
            onOpenPostRequest={() => setIsPostRequestOpen(true)}
          />
        );
      case 'browse':
        return (
          <BrowseRentalsPage
            onOpenBooking={handleOpenBooking}
            onOpenPostRequest={() => setIsPostRequestOpen(true)}
          />
        );
      case 'categories':
        return <CategoriesPage />;
      case 'offers':
        return <OffersPage />;
      case 'requests':
        return (
          <RentalRequestsPage
            onOpenPostRequest={() => setIsPostRequestOpen(true)}
          />
        );
      case 'become-supplier':
        return <BecomeSupplierPage />;
      case 'supplier-dashboard':
        return <SupplierDashboard />;
      case 'renter-dashboard':
        return <RenterDashboard onOpenBooking={handleOpenBooking} />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'login':
        return <LoginPage initialMode="signin" />;
      case 'signup':
        return <LoginPage initialMode="signup" />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'how-it-works':
        return <LegalPages pageType="how-it-works" />;
      case 'privacy-policy':
        return <LegalPages pageType="privacy" />;
      case 'terms':
        return <LegalPages pageType="terms" />;
      case 'refund-policy':
        return <LegalPages pageType="refund" />;
      case 'cancellation-policy':
        return <LegalPages pageType="cancellation" />;
      case 'supplier-policy':
        return <LegalPages pageType="supplier-policy" />;
      case 'rental-policy':
        return <LegalPages pageType="rental-policy" />;
      case 'prohibited-items':
        return <LegalPages pageType="prohibited" />;
      default:
        return (
          <HomePage
            onOpenBooking={handleOpenBooking}
            onOpenPostRequest={() => setIsPostRequestOpen(true)}
          />
        );
    }
  };

  const isSupplierDashboard = activeView === 'supplier-dashboard';
  const unreadEmails = emails.filter((e) => !e.read).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white pb-14 md:pb-0">
      {/* Global Interactive Simulation Bar: Highlights logged-in role and enables testing renter/supplier rental exchange */}
      <div className="bg-slate-950 text-white border-b border-slate-800 text-[11px] py-2 px-4 shadow-sm z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-400">Active Account:</span>
            {currentUser ? (
              <div className="flex items-center gap-1.5 font-bold">
                <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-black tracking-wide ${
                  currentUser.role === 'supplier'
                    ? 'bg-blue-600 text-white'
                    : 'bg-emerald-600 text-white'
                }`}>
                  {currentUser.role}
                </span>
                <span className="text-white truncate max-w-[150px] sm:max-w-none">{currentUser.name}</span>
                <span className="text-slate-400 hidden sm:inline">({currentUser.email})</span>
              </div>
            ) : (
              <span className="text-amber-400 font-bold">Guest (Not signed in)</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Switch to Supplier */}
            <button
              onClick={() => {
                login('ghanshymchavda3@gmail.com');
                setActiveView('supplier-dashboard');
              }}
              className="px-2.5 py-1 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-blue-200 border border-blue-700/60 font-semibold cursor-pointer transition-colors flex items-center gap-1"
              title="Test listing an item as Supplier"
            >
              <Store className="w-3 h-3 text-blue-400" />
              <span>Host / Supplier Mode</span>
            </button>

            {/* Quick Switch to Renter */}
            <button
              onClick={() => {
                login('rohan.mehra@gmail.com');
                setActiveView('renter-dashboard');
              }}
              className="px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-200 border border-emerald-800/60 font-semibold cursor-pointer transition-colors flex items-center gap-1"
              title="Test renting an item as Renter"
            >
              <Compass className="w-3 h-3 text-emerald-400" />
              <span>Renter Mode</span>
            </button>

            {/* Email Inbox Button */}
            <button
              onClick={() => setOpenEmailInboxModal(true)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3 h-3 text-amber-400" />
              <span>Email Inbox</span>
              {unreadEmails > 0 && (
                <span className="bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded-full text-[9px]">
                  {unreadEmails}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Global Header */}
      <Header />

      {/* Main Viewport */}
      <div className="flex-1">{renderActiveView()}</div>

      {/* Footer (Rendered across consumer views, omitted in full-height supplier dash) */}
      {!isSupplierDashboard && <Footer />}

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around text-[10px] font-bold text-slate-500 shadow-lg">
        <button
          onClick={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 cursor-pointer ${
            activeView === 'home' ? 'text-blue-600 font-extrabold' : 'hover:text-slate-900'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => {
            setActiveView('browse');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 cursor-pointer ${
            activeView === 'browse' ? 'text-blue-600 font-extrabold' : 'hover:text-slate-900'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Browse</span>
        </button>

        <button
          onClick={() => {
            setActiveView('requests');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 cursor-pointer ${
            activeView === 'requests' ? 'text-blue-600 font-extrabold' : 'hover:text-slate-900'
          }`}
        >
          <PlusCircle className="w-4 h-4 text-blue-600" />
          <span>Requests</span>
        </button>

        <button
          onClick={() => {
            setActiveView('categories');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 cursor-pointer ${
            activeView === 'categories' ? 'text-blue-600 font-extrabold' : 'hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Categories</span>
        </button>

        <button
          onClick={() => {
            setActiveView(currentRole === 'supplier' ? 'supplier-dashboard' : 'renter-dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 cursor-pointer ${
            activeView === 'renter-dashboard' || activeView === 'supplier-dashboard'
              ? 'text-blue-600 font-extrabold'
              : 'hover:text-slate-900'
          }`}
        >
          {currentRole === 'supplier' ? <Store className="w-4 h-4" /> : <User className="w-4 h-4" />}
          <span>{currentRole === 'supplier' ? 'Dashboard' : 'Rentals'}</span>
        </button>
      </div>

      {/* Global Modals */}
      <LocationModal />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onRentClick={(prod) => {
          setSelectedProduct(null);
          setBookingProduct(prod);
        }}
      />

      <BookingModal
        product={bookingProduct}
        onClose={() => setBookingProduct(null)}
      />

      <PostRequestModal
        isOpen={isPostRequestOpen}
        onClose={() => setIsPostRequestOpen(false)}
      />

      <AuthModal />

      <EmailInboxModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
