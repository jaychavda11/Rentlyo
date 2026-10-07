import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { Product } from '../types';
import {
  Compass,
  Calendar,
  Clock,
  ShieldCheck,
  Heart,
  KeyRound,
  Coins,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface RenterDashboardProps {
  onOpenBooking: (product: Product) => void;
}

export const RenterDashboard: React.FC<RenterDashboardProps> = ({ onOpenBooking }) => {
  const {
    bookings,
    wishlistIds,
    products,
    setSelectedProduct,
    setActiveView,
    rentalRequests,
    currentUser,
    setOpenEmailInboxModal,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'rentals' | 'wishlist' | 'requests'>('rentals');

  const renterName = currentUser?.name || 'Rohan Mehra';
  const renterEmail = currentUser?.email || 'rohan.mehra@gmail.com';
  const renterArea = currentUser?.ahmedabadArea || 'Vastrapur';

  const activeRentals = bookings.filter((b) => b.status === 'active_rental');
  const upcomingRentals = bookings.filter((b) => b.status === 'confirmed');
  const completedRentals = bookings.filter((b) => b.status === 'completed');
  const savedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Consumer Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200 bg-blue-800/60 px-2.5 py-0.5 rounded-full">
              Renter Account · {renterArea}, Ahmedabad
            </span>
            <span className="text-xs text-blue-200">({renterEmail})</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Welcome back, {renterName}! 🎒
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
            Track your ongoing rentals, access your secure handover OTPs, and review your refundable security deposit status. All booking details are sent directly to your email.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setOpenEmailInboxModal(true)}
            className="py-3 px-5 rounded-xl bg-blue-800/80 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer border border-blue-500/40"
          >
            Email Receipts
          </button>
          <button
            onClick={() => setActiveView('browse')}
            className="py-3 px-6 rounded-xl bg-white text-blue-900 font-bold text-xs shadow-md hover:bg-blue-50 transition-colors cursor-pointer flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-blue-600" />
            <span>Browse More Rentals</span>
          </button>
        </div>
      </div>

      {/* Metric Highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Active Rentals</span>
          <div className="text-2xl font-black text-slate-900">{activeRentals.length}</div>
          <span className="text-[11px] text-blue-600 font-bold">In Possession</span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Upcoming Bookings</span>
          <div className="text-2xl font-black text-slate-900">{upcomingRentals.length}</div>
          <span className="text-[11px] text-emerald-600 font-bold">Confirmed</span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Saved to Wishlist</span>
          <div className="text-2xl font-black text-slate-900">{wishlistIds.length}</div>
          <span className="text-[11px] text-rose-600 font-bold">Favorite Gear</span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Completed Rentals</span>
          <div className="text-2xl font-black text-slate-900">{completedRentals.length}</div>
          <span className="text-[11px] text-slate-400">100% Deposits Refunded</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4 text-sm font-bold">
        <button
          onClick={() => setActiveTab('rentals')}
          className={`pb-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'rentals'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          My Rentals & Bookings ({bookings.length})
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'wishlist'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Saved Wishlist ({savedProducts.length})
        </button>

        <button
          onClick={() => setActiveTab('requests')}
          className={`pb-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'requests'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          My Posted Requests ({rentalRequests.length})
        </button>
      </div>

      {/* TAB 1: BOOKINGS & ACTIVE RENTALS */}
      {activeTab === 'rentals' && (
        <div className="space-y-6">
          {bookings.map((bkg) => (
            <div
              key={bkg.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={bkg.productImage}
                    alt={bkg.productTitle}
                    className="w-16 h-16 rounded-2xl object-cover shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                      Booking #{bkg.id}
                    </span>
                    <h3 className="font-bold text-base text-slate-900">{bkg.productTitle}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span>{bkg.ahmedabadArea}, Ahmedabad</span>
                      <span>·</span>
                      <span>Supplier: <strong>{bkg.supplierName}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="text-right self-start sm:self-auto">
                  <div className="text-lg font-black text-slate-900">₹{bkg.totalPaid}</div>
                  <span className="text-[11px] text-slate-500 block">
                    Rental ₹{bkg.rentalFee} + Deposit ₹{bkg.securityDeposit}
                  </span>
                </div>
              </div>

              {/* OTP Security Verification Pod */}
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block">
                      Secure Verification Passcodes
                    </span>
                    <span className="text-slate-600">
                      Share Handover OTP when collecting item; share Return OTP when handing item back.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <div className="bg-white px-3 py-1.5 rounded-xl border border-blue-200 text-center">
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">
                      Handover OTP
                    </span>
                    <span className="text-base font-black text-blue-700 tracking-wider">
                      {bkg.handoverOtp}
                    </span>
                  </div>

                  <div className="bg-white px-3 py-1.5 rounded-xl border border-blue-200 text-center">
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">
                      Return OTP
                    </span>
                    <span className="text-base font-black text-emerald-700 tracking-wider">
                      {bkg.returnOtp}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status and deposit protection breakdown */}
              <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-600 gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Current Status:</span>
                  <span className="font-bold uppercase text-[10px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md">
                    {bkg.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>
                    Deposit: {bkg.depositStatus === 'refunded' ? '100% Refunded' : 'Held safely in Escrow'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: WISHLIST */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          {savedProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <Heart className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">Your wishlist is empty</h4>
              <p className="text-xs text-slate-500">
                Browse rentals across Ahmedabad and click the heart icon to save items.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onSelect={(item) => setSelectedProduct(item)}
                  onRentNow={(item) => onOpenBooking(item)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: POSTED REQUESTS */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">Your Active Broadcasted Requests</h3>
            <button
              onClick={() => setActiveView('requests')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Open Requests Center →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rentalRequests.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    {r.categoryName}
                  </span>
                  <span className="text-xs font-bold text-slate-900">Budget: ₹{r.budgetInr}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{r.title}</h4>
                <div className="text-xs text-slate-500">
                  📍 {r.ahmedabadArea} · {r.neededDate} ({r.neededTime})
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-700">{r.offersCount} bids received</span>
                  <button
                    onClick={() => setActiveView('requests')}
                    className="font-bold text-blue-600 hover:underline"
                  >
                    Compare Supplier Bids →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
