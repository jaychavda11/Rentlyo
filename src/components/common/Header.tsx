import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RentlyoLogo } from './RentlyoLogo';
import {
  MapPin,
  Bell,
  Heart,
  User,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  ShieldAlert,
  Store,
  Compass,
  CheckCircle,
  Mail,
  LogOut,
  LogIn,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    currentArea,
    setOpenLocationModal,
    currentRole,
    setCurrentRole,
    wishlistIds,
    notifications,
    markNotificationRead,
    clearNotifications,
    currentUser,
    logout,
    setOpenAuthModal,
    setAuthModalMode,
    emails,
    setOpenEmailInboxModal,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const unreadEmailsCount = emails.filter((e) => !e.read).length;

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'browse', label: 'Browse Rentals' },
    { id: 'categories', label: 'Categories' },
    { id: 'requests', label: 'Rental Requests' },
    { id: 'offers', label: 'Offers' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'become-supplier', label: 'Become a Supplier' },
  ];

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      {/* Top Announcement Bar for Ahmedabad launch */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-slate-300">
              Ahmedabad-First Rental Marketplace · Rent from verified local peers & stores in Vastrapur, Satellite & Navrangpura
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-slate-300 text-[11px]">
            <button
              onClick={() => handleNavClick('offers')}
              className="hover:text-blue-400 transition-colors flex items-center gap-1 text-amber-300 font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Navratri Special Offers Live!</span>
            </button>
            <span>·</span>
            <span>Support: +91 9824884860</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="shrink-0 cursor-pointer" onClick={() => handleNavClick('home')}>
          <RentlyoLogo size="md" showTagline={false} />
        </div>

        {/* Center: Main Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold text-slate-700">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-lg transition-colors cursor-pointer relative ${
                  isActive
                    ? 'text-blue-600 bg-blue-50/70 font-bold'
                    : 'hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
                {item.id === 'offers' && (
                  <span className="ml-1.5 text-[9px] font-black uppercase tracking-wider bg-rose-500 text-white px-1.5 py-0.5 rounded-full">
                    20%
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Location Selector, Email Inbox, Notifications, Wishlist, Profile/Auth */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Location Selector Button */}
          <button
            onClick={() => setOpenLocationModal(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-400 text-xs font-semibold text-slate-800 transition-all cursor-pointer shadow-2xs"
            title="Change Ahmedabad Location"
          >
            <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
            <div className="text-left hidden xs:block">
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block leading-none">
                City
              </span>
              <span className="font-bold text-slate-900 truncate max-w-[80px] sm:max-w-none">
                {currentArea === 'All Ahmedabad' ? 'Ahmedabad' : `${currentArea}`}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </button>

          {/* Email Inbox Trigger Button (Shows live emails delivered to suppliers/renters) */}
          <button
            onClick={() => setOpenEmailInboxModal(true)}
            className="relative p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Email Notification Inbox"
          >
            <Mail className="w-5 h-5" />
            {unreadEmailsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadEmailsCount}
              </span>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => handleNavClick('browse')}
            className="relative p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistIds.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistIds.length}
              </span>
            )}
          </button>

          {/* Notifications Button & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95">
                <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <span className="font-bold text-sm text-slate-900">Notifications</span>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearNotifications}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 p-1">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-500">
                      No notifications right now
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-3 rounded-xl transition-colors cursor-pointer ${
                          n.read ? 'bg-white hover:bg-slate-50' : 'bg-blue-50/50 hover:bg-blue-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h6 className="text-xs font-bold text-slate-900">{n.title}</h6>
                          <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5 leading-snug">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Auth State */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 pl-2 rounded-xl border border-slate-200 bg-white hover:border-blue-400 transition-all cursor-pointer shadow-2xs"
              >
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-blue-500"
                />
                <div className="text-left hidden sm:block leading-none">
                  <div className="font-bold text-xs text-slate-900 truncate max-w-[90px]">
                    {currentUser.name}
                  </div>
                  <span className="text-[9px] font-semibold text-blue-600 uppercase">
                    {currentUser.role === 'supplier' ? '💼 Supplier' : '🎒 Renter'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="p-3 bg-slate-50 rounded-xl mb-2 space-y-0.5">
                    <div className="font-bold text-xs text-slate-900">{currentUser.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{currentUser.email}</div>
                    <div className="text-[10px] text-blue-700 font-semibold pt-1">
                      📍 {currentUser.ahmedabadArea}, Ahmedabad · Role: {currentUser.role.toUpperCase()}
                    </div>
                  </div>

                  {currentUser.role === 'supplier' ? (
                    <button
                      onClick={() => {
                        setActiveView('supplier-dashboard');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-blue-50 text-slate-800 hover:text-blue-700 transition-colors"
                    >
                      <Store className="w-4 h-4 text-emerald-600" />
                      <span>My Supplier Dashboard</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setActiveView('renter-dashboard');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-blue-50 text-slate-800 hover:text-blue-700 transition-colors"
                    >
                      <Compass className="w-4 h-4 text-blue-600" />
                      <span>My Renter Dashboard</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setOpenEmailInboxModal(true);
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-blue-50 text-slate-800 hover:text-blue-700 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>Email Notifications ({emails.length})</span>
                  </button>

                  <div className="border-t border-slate-100 my-1 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 block">
                      Switch Role Mode:
                    </span>
                    <button
                      onClick={() => {
                        setCurrentRole(currentUser.role === 'supplier' ? 'renter' : 'supplier');
                        setActiveView(currentUser.role === 'supplier' ? 'renter-dashboard' : 'supplier-dashboard');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100"
                    >
                      <span>Switch to {currentUser.role === 'supplier' ? 'Renter' : 'Supplier'} mode</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 my-1 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthModalMode('signin');
                  setOpenAuthModal(true);
                }}
                className="py-1.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Sign in
              </button>
              <button
                onClick={() => {
                  setAuthModalMode('signup');
                  setOpenAuthModal(true);
                }}
                className="py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
              >
                Sign up
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                  activeView === item.id
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {item.id === 'offers' && (
                  <span className="text-[10px] bg-rose-500 text-white font-bold px-2 py-0.5 rounded-full">
                    20% OFF
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setOpenLocationModal(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800"
            >
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Location: {currentArea}, Ahmedabad</span>
            </button>

            <button
              onClick={() => {
                setOpenEmailInboxModal(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-2.5 rounded-xl border border-blue-100 bg-blue-50/50 text-xs font-semibold text-blue-800"
            >
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Email Notifications Center</span>
              </div>
              <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                {emails.length}
              </span>
            </button>

            {!currentUser ? (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setActiveView('login');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 text-center"
                >
                  Sign in
                </button>
                <button
                  onClick={() => {
                    setActiveView('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-blue-600 text-white text-xs font-bold text-center"
                >
                  Sign up
                </button>
              </div>
            ) : (
              <div className="pt-1 flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl">
                <div>
                  <div className="font-bold text-slate-900">{currentUser.name}</div>
                  <div className="text-[10px] text-slate-500 uppercase">{currentUser.role} · {currentUser.email}</div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-rose-600 font-bold hover:underline"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

