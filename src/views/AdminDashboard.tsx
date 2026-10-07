import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CampaignOffer } from '../types';
import {
  ShieldAlert,
  Tag,
  CheckCircle2,
  XCircle,
  Settings,
  Users,
  Coins,
  Package,
  Plus,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    offers,
    createOffer,
    toggleOfferStatus,
    products,
    updateProductStatus,
    bookings,
    settings,
    updateSettings,
    waitlistEntries,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'offers' | 'products' | 'bookings' | 'waitlist' | 'settings'>('offers');

  // New Offer Form state
  const [offerTitle, setOfferTitle] = useState('');
  const [offerTagline, setOfferTagline] = useState('');
  const [offerDiscount, setOfferDiscount] = useState(20);
  const [offerType, setOfferType] = useState<CampaignOffer['type']>('festival');
  const [offerCategory, setOfferCategory] = useState('events');
  const [offerBanner, setOfferBanner] = useState('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80');

  // Platform Commission slider
  const [commissionVal, setCommissionVal] = useState(settings.commissionPercent);

  const totalRentalVolume = bookings.reduce((acc, b) => acc + b.rentalFee, 0);
  const totalPlatformRevenue = bookings.reduce((acc, b) => acc + b.platformFee, 0);
  const totalEscrowDeposits = bookings.filter((b) => b.depositStatus === 'held').reduce((acc, b) => acc + b.securityDeposit, 0);

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    createOffer({
      id: `offer-${Date.now()}`,
      title: offerTitle,
      tagline: offerTagline,
      badge: `${offerDiscount}% OFF · CAMPAIGN`,
      description: `${offerTitle} across Ahmedabad. Save up to ${offerDiscount}% on verified local gear.`,
      discountPercentage: offerDiscount,
      applicableCategories: [offerCategory],
      bannerImage: offerBanner,
      status: 'active',
      validUntil: '2026-11-15',
      type: offerType,
      ctaText: 'Explore Offer',
      ctaLink: '/offers',
    });
    setOfferTitle('');
    setOfferTagline('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              Operations & Admin Console
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Rentlyo Administrative Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit Ahmedabad marketplace bookings, campaigns, escrow deposits, and platform configurations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-indigo-50 border border-indigo-200 text-indigo-900 px-3 py-1.5 rounded-xl self-start sm:self-auto font-bold">
          <ShieldAlert className="w-4 h-4 text-indigo-600" />
          <span>Role: Super Administrator</span>
        </div>
      </div>

      {/* Financial Health & Escrow Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Rental Gross Volume</span>
          <div className="text-2xl font-black text-slate-900">₹{totalRentalVolume.toLocaleString()}</div>
          <span className="text-[11px] text-emerald-600 font-semibold">Ahmedabad market</span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Platform Fee Revenue (15%)</span>
          <div className="text-2xl font-black text-blue-700">₹{totalPlatformRevenue.toLocaleString()}</div>
          <span className="text-[11px] text-slate-400">Net marketplace revenue</span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Escrow Deposits Held</span>
          <div className="text-2xl font-black text-amber-700">₹{totalEscrowDeposits.toLocaleString()}</div>
          <span className="text-[11px] text-slate-400">Separate escrow (not revenue)</span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">City Waitlist Signups</span>
          <div className="text-2xl font-black text-indigo-700">{waitlistEntries.length + 86}</div>
          <span className="text-[11px] text-slate-400">Mumbai, Pune, Delhi & App</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4 text-sm font-bold">
        {[
          { id: 'offers', label: 'Campaigns & Offers' },
          { id: 'products', label: 'Product Moderation' },
          { id: 'bookings', label: 'Bookings & Escrow Audit' },
          { id: 'waitlist', label: 'City Waitlist Leads' },
          { id: 'settings', label: 'Platform Settings' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === t.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OFFERS & CAMPAIGNS MANAGEMENT */}
      {activeTab === 'offers' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Create Offer Form */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Tag className="w-4 h-4 text-blue-600" />
              <span>Launch New Campaign</span>
            </h3>

            <form onSubmit={handleCreateOffer} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Campaign Title *</label>
                <input
                  type="text"
                  value={offerTitle}
                  onChange={(e) => setOfferTitle(e.target.value)}
                  placeholder="e.g. Wedding Season Sound Spectacular"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={offerTagline}
                  onChange={(e) => setOfferTagline(e.target.value)}
                  placeholder="e.g. Premium DJ sets for sangeet celebrations"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Discount %</label>
                  <input
                    type="number"
                    value={offerDiscount}
                    onChange={(e) => setOfferDiscount(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Type</label>
                  <select
                    value={offerType}
                    onChange={(e: any) => setOfferType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="festival">Festival</option>
                    <option value="category">Category</option>
                    <option value="app_launch">App Launch</option>
                    <option value="product">Product</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors cursor-pointer"
              >
                Publish Campaign to Rentlyo Ahmedabad
              </button>
            </form>
          </div>

          {/* Active Campaigns List */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-bold text-base text-slate-900">
              Active & Scheduled Campaigns ({offers.length})
            </h3>

            <div className="space-y-3">
              {offers.map((off) => (
                <div
                  key={off.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-sm">
                        {off.type}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900">{off.title}</h4>
                    </div>
                    <p className="text-xs text-slate-500">{off.tagline}</p>
                    <span className="text-[11px] text-blue-700 font-bold">
                      Discount: {off.discountPercentage}% OFF
                    </span>
                  </div>

                  <button
                    onClick={() => toggleOfferStatus(off.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      off.status === 'active'
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                    }`}
                  >
                    {off.status === 'active' ? 'Active Live' : 'Upcoming'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT MODERATION */}
      {activeTab === 'products' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4">
          <h3 className="font-bold text-base text-slate-900">Inventory Moderation</h3>
          <div className="divide-y divide-slate-100">
            {products.slice(0, 8).map((p) => (
              <div key={p.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={p.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h5 className="font-bold text-xs text-slate-900 truncate max-w-sm">{p.title}</h5>
                    <div className="text-[11px] text-slate-500">
                      Supplier: <strong>{p.supplierName}</strong> · {p.ahmedabadArea}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-800">₹{p.dailyPrice}/day</span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Approved & Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BOOKINGS AUDIT */}
      {activeTab === 'bookings' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4">
          <h3 className="font-bold text-base text-slate-900">Bookings Escrow & Commission Audit</h3>
          <div className="divide-y divide-slate-100 text-xs">
            {bookings.map((b) => (
              <div key={b.id} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <span className="font-bold text-slate-900">#{b.id}</span>
                  <span className="text-slate-400 ml-2">{b.productTitle}</span>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Renter: {b.renterName} | Supplier: {b.supplierName} ({b.ahmedabadArea})
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-black text-slate-900">₹{b.totalPaid}</div>
                  <div className="text-[10px] text-slate-400">
                    Rental ₹{b.rentalFee} | Escrow Deposit ₹{b.securityDeposit}
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 uppercase">
                    Status: {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CITY WAITLIST LEADS */}
      {activeTab === 'waitlist' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4">
          <h3 className="font-bold text-base text-slate-900">
            Expansion Waitlist Subscribers ({waitlistEntries.length})
          </h3>
          <p className="text-xs text-slate-500">
            Prospective renters waiting for launch in Mumbai, Pune, Delhi, Bengaluru, and Hyderabad.
          </p>

          <div className="divide-y divide-slate-100 text-xs">
            {waitlistEntries.map((w) => (
              <div key={w.id} className="py-3 flex justify-between items-center">
                <div>
                  <strong className="text-slate-900">{w.name}</strong> ({w.email})
                  <div className="text-[11px] text-blue-700">
                    City requested: {w.targetCity || 'Mobile App Launch'}
                  </div>
                </div>
                <span className="text-slate-400 text-[11px]">{w.createdAt.split('T')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PLATFORM SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl space-y-6">
          <h3 className="font-bold text-base text-slate-900">Platform Global Parameters</h3>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1 text-slate-700">
                <span>Platform Commission Rate (10% - 20%)</span>
                <span className="text-blue-600">{commissionVal}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={20}
                value={commissionVal}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setCommissionVal(val);
                  updateSettings({ commissionPercent: val });
                }}
                className="w-full accent-blue-600"
              />
              <span className="text-[11px] text-slate-400">
                Configured revenue retained on successful rentals. Escrow security deposits are exempt.
              </span>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <span className="font-bold text-slate-700 block mb-1">Primary Launch Market</span>
              <input
                type="text"
                disabled
                value={settings.primaryLocation}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-600"
              />
            </div>

            <div className="border-t border-slate-100 pt-3">
              <span className="font-bold text-slate-700 block mb-1">Official Founder Contact Phone</span>
              <input
                type="text"
                disabled
                value={settings.supportPhone}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-600"
              />
            </div>

            <div className="border-t border-slate-100 pt-3">
              <span className="font-bold text-slate-700 block mb-1">Official Founder Email</span>
              <input
                type="text"
                disabled
                value={settings.supportEmail}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-600"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
