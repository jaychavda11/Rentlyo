import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AHMEDABAD_AREAS } from '../data/constants';
import {
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  Bell,
  CheckCircle2,
  Tag,
  Filter,
} from 'lucide-react';

export const OffersPage: React.FC = () => {
  const { setSelectedCategoryId, setActiveView, joinWaitlist } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'upcoming' | 'festival'>('all');
  const [selectedAreaFilter, setSelectedAreaFilter] = useState<string>('All');
  const [notifySuccess, setNotifySuccess] = useState<string | null>(null);
  const [notifyEmail, setNotifyEmail] = useState<string>('');

  const handleNotifyMe = (campaignName: string) => {
    if (!notifyEmail) return;
    joinWaitlist({
      type: 'mobile_app',
      name: 'Festival Alert User',
      email: notifyEmail,
    });
    setNotifySuccess(campaignName);
    setTimeout(() => {
      setNotifySuccess(null);
      setNotifyEmail('');
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider border border-rose-200">
          <Tag className="w-3.5 h-3.5" />
          <span>Exclusive Ahmedabad Discounts</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Offers & Promotional Campaigns
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Celebrate Gujarat’s vibrant festivals and save more on sound, photography, tools, and event equipment across Ahmedabad.
        </p>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {[
            { id: 'all', label: 'All Campaigns' },
            { id: 'live', label: '🔥 Live Active' },
            { id: 'festival', label: '🪔 Festival Specials' },
            { id: 'upcoming', label: '⏳ Coming Soon' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Campaign 1: Navratri Rental Festival (LIVE) */}
      {(activeTab === 'all' || activeTab === 'live' || activeTab === 'festival') && (
        <section className="rounded-3xl overflow-hidden border border-amber-300/80 bg-gradient-to-r from-amber-700 via-rose-800 to-indigo-950 text-white shadow-xl">
          <div className="p-8 sm:p-12 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                  Active Live Now · Up to 20% OFF
                </span>
                <span className="text-xs text-amber-200 font-medium">Valid until 24 October 2026</span>
              </div>
              <div className="text-xs text-amber-100 bg-white/10 px-3 py-1 rounded-full">
                📍 Valid in Vastrapur, Satellite & All Ahmedabad Areas
              </div>
            </div>

            <div className="max-w-2xl space-y-2">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Navratri Rental Festival
              </h2>
              <p className="text-xl font-semibold text-amber-200">
                Celebrate more. Spend less.
              </p>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pt-1">
                Navratri is Gujarat’s biggest celebration! Why buy expensive speakers, stage lights, and camera kits that get used for only 9 nights? Rent high-output equipment from verified suppliers across Ahmedabad at exclusive festive discounts.
              </p>
            </div>

            {/* Discounted Categories Pill Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <span className="text-amber-300 font-bold text-xs uppercase block">Event Equipment</span>
                <h4 className="font-extrabold text-lg text-white mt-0.5">Up to 20% OFF</h4>
                <p className="text-[11px] text-slate-200 mt-1">Party Speakers, DJ Systems & Microphones</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <span className="text-amber-300 font-bold text-xs uppercase block">Photography</span>
                <h4 className="font-extrabold text-lg text-white mt-0.5">Special Festival Rates</h4>
                <p className="text-[11px] text-slate-200 mt-1">Canon, Sony Cameras & Portrait 50mm Lenses</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <span className="text-amber-300 font-bold text-xs uppercase block">Stage & Lighting</span>
                <h4 className="font-extrabold text-lg text-white mt-0.5">Flat 20% OFF</h4>
                <p className="text-[11px] text-slate-200 mt-1">RGBW Par Cans, Laser Lights & T-Bar Stands</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <span className="text-amber-300 font-bold text-xs uppercase block">Traditional Wear</span>
                <h4 className="font-extrabold text-lg text-white mt-0.5">Daily Sanitized Sets</h4>
                <p className="text-[11px] text-slate-200 mt-1">Authentic Kutchi Chaniya Choli & Kurta Pajamas</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setSelectedCategoryId('events');
                  setActiveView('browse');
                }}
                className="py-3 px-8 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Navratri Rentals</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Featured Campaign 2: Diwali Rental Celebration (UPCOMING) */}
      {(activeTab === 'all' || activeTab === 'upcoming' || activeTab === 'festival') && (
        <section className="rounded-3xl border border-amber-300 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/60 p-8 sm:p-12 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="bg-amber-600 text-white text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
                Coming Soon
              </span>
              <span className="text-xs font-bold text-amber-800">Launches November 2026</span>
            </div>

            {/* Countdown Component */}
            <div className="flex items-center gap-2 text-xs font-bold text-amber-950 bg-amber-200/60 px-3 py-1.5 rounded-xl">
              <Clock className="w-4 h-4 text-amber-700" />
              <span>Launching in: 24 Days</span>
            </div>
          </div>

          <div className="max-w-2xl space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Diwali Rental Celebration
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Get ready for special Diwali rental offers across Ahmedabad! Perfect for family get-togethers, corporate Diwali parties, and home deep cleaning.
            </p>
          </div>

          {/* Applicable categories */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
              Participating Rental Categories:
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                'Projectors & Giant Screens',
                'High-Bass Party Speakers',
                'Decoration Equipment',
                'LED Fairy Lights & Lasers',
                'Cameras for Family Shoots',
                'Cleaning & Pressure Washers',
                'Extra Event Chairs & Tables',
              ].map((item, i) => (
                <span
                  key={i}
                  className="bg-white/80 border border-amber-200 text-slate-800 px-3 py-1.5 rounded-lg font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Notify Me Box */}
          <div className="pt-2 max-w-md">
            {notifySuccess === 'diwali' ? (
              <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>You will be notified when Diwali Rental specials go live!</span>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  placeholder="Enter email for Diwali alert"
                  className="px-3.5 py-2.5 rounded-xl border border-amber-300 bg-white text-xs w-full focus:ring-2 focus:ring-amber-500"
                />
                <button
                  onClick={() => handleNotifyMe('diwali')}
                  className="py-2.5 px-5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Notify Me</span>
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Featured Campaign 3: Mobile App Launch Offer (UPCOMING) */}
      {(activeTab === 'all' || activeTab === 'upcoming') && (
        <section className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-8 sm:p-12 space-y-6 shadow-md">
          <div className="flex items-center gap-2">
            <span className="bg-sky-400 text-slate-950 text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
              Coming Soon
            </span>
            <span className="text-xs text-blue-200 font-semibold">Android & iOS Applications</span>
          </div>

          <div className="max-w-2xl space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Rentlyo Mobile App Launch
            </h2>
            <p className="text-sm text-blue-100 leading-relaxed">
              The Rentlyo mobile app is coming soon. Get special launch benefits when the Rentlyo app launches in Ahmedabad! Early registered users get zero platform service fee on their first three rentals and instant push alerts for nearby deals.
            </p>
          </div>

          <div className="pt-2 max-w-md">
            {notifySuccess === 'mobile' ? (
              <div className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>You're registered for the early Mobile App Launch benefits!</span>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  placeholder="Enter email for App launch invite"
                  className="px-3.5 py-2.5 rounded-xl border border-blue-700 bg-blue-950/80 text-xs w-full text-white placeholder:text-blue-300/60 focus:ring-2 focus:ring-sky-400"
                />
                <button
                  onClick={() => handleNotifyMe('mobile')}
                  className="py-2.5 px-5 rounded-xl bg-white text-blue-900 font-bold text-xs shrink-0 shadow-md hover:bg-blue-50 cursor-pointer"
                >
                  Join App Waitlist
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Category Specific Flash Offers */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Category Deals</span>
          <h3 className="text-2xl font-bold text-slate-900">Weekly Ahmedabad Rental Offers</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 hover:border-blue-400 transition-colors">
            <span className="text-xs font-bold text-blue-600 uppercase">Photography</span>
            <h4 className="font-bold text-base text-slate-900">Weekend Creator Combo</h4>
            <p className="text-xs text-slate-600">
              Rent any DSLR or mirrorless camera for Saturday & Sunday and get a fluid tripod or microphone at 50% off.
            </p>
            <button
              onClick={() => {
                setSelectedCategoryId('photography');
                setActiveView('browse');
              }}
              className="text-xs font-bold text-blue-600 hover:underline pt-2 block"
            >
              Browse Cameras →
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 hover:border-blue-400 transition-colors">
            <span className="text-xs font-bold text-emerald-600 uppercase">Travel & Outdoor</span>
            <h4 className="font-bold text-base text-slate-900">Polo Forest Weekend Trek</h4>
            <p className="text-xs text-slate-600">
              Complete 4-person tent package with 2 sleeping bags and flashlights for just ₹450/day.
            </p>
            <button
              onClick={() => {
                setSelectedCategoryId('travel');
                setActiveView('browse');
              }}
              className="text-xs font-bold text-blue-600 hover:underline pt-2 block"
            >
              Browse Camping Gear →
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 hover:border-blue-400 transition-colors">
            <span className="text-xs font-bold text-indigo-600 uppercase">Tools & DIY</span>
            <h4 className="font-bold text-base text-slate-900">Home Shift Power Kit</h4>
            <p className="text-xs text-slate-600">
              Bosch hammer drill + aluminum telescopic ladder combo for easy home shifting and curtain mounting.
            </p>
            <button
              onClick={() => {
                setSelectedCategoryId('tools');
                setActiveView('browse');
              }}
              className="text-xs font-bold text-blue-600 hover:underline pt-2 block"
            >
              Browse Tools →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
