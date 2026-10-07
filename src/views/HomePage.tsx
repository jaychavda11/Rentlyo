import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { CATEGORIES, AHMEDABAD_AREAS } from '../data/constants';
import { Product } from '../types';
import {
  Search,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Coins,
  Repeat,
  Compass,
  CheckCircle2,
  Calendar,
  Smartphone,
  ChevronRight,
  HelpCircle,
  Building,
  Bell,
  Star,
  ChevronDown,
  Camera,
} from 'lucide-react';

interface HomePageProps {
  onOpenBooking: (product: Product) => void;
  onOpenPostRequest: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenBooking,
  onOpenPostRequest,
}) => {
  const {
    products,
    setSelectedProduct,
    setActiveView,
    setSelectedCategoryId,
    currentArea,
    setOpenLocationModal,
    searchQuery,
    setSearchQuery,
    offers,
    rentalRequests,
    joinWaitlist,
  } = useApp();

  const [localSearch, setLocalSearch] = useState('');
  const [appWaitlistEmail, setAppWaitlistEmail] = useState('');
  const [appWaitlistDone, setAppWaitlistDone] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  // Quick categories under search
  const quickCategories = [
    { name: 'Cameras', catId: 'photography' },
    { name: 'Projectors', catId: 'electronics' },
    { name: 'Speakers', catId: 'electronics' },
    { name: 'Tools', catId: 'tools' },
    { name: 'Camping', catId: 'travel' },
    { name: 'Laptops', catId: 'education' },
    { name: 'Party Equipment', catId: 'events' },
    { name: 'Luggage', catId: 'travel' },
  ];

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      setActiveView('browse');
    } else {
      setActiveView('browse');
    }
  };

  const handleQuickCatClick = (catId: string) => {
    setSelectedCategoryId(catId);
    setActiveView('browse');
  };

  const handleAppWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appWaitlistEmail) return;
    joinWaitlist({
      type: 'mobile_app',
      name: 'Early Mobile Renter',
      email: appWaitlistEmail,
    });
    setAppWaitlistDone(true);
    setTimeout(() => {
      setAppWaitlistDone(false);
      setAppWaitlistEmail('');
    }, 3000);
  };

  // Popular items
  const popularRentals = products.slice(0, 8);

  const faqs = [
    {
      q: 'What is Rentlyo?',
      a: 'Rentlyo is a peer-to-peer and local-business rental marketplace connecting people who need products temporarily with nearby owners and stores who have items available to rent. Rentlyo does not own the inventory, acting as the secure trusted platform.',
    },
    {
      q: 'Can I become both a renter and supplier?',
      a: 'Yes! Anyone in Ahmedabad can use one account to rent items they need for temporary occasions, and also list items they own (like cameras, tools, camping equipment) to generate passive rental income.',
    },
    {
      q: 'Where is Rentlyo available?',
      a: 'Ahmedabad is our initial active live launch marketplace, covering areas including Vastrapur, Satellite, Bodakdev, Navrangpura, Thaltej, Prahlad Nagar, Bopal, Gota, and Maninagar.',
    },
    {
      q: 'Can I rent for only a few hours?',
      a: 'Yes, wherever the supplier supports hourly rentals! Many items such as projectors, sound systems, DSLR cameras, and drill machines offer flexible hourly pricing with clear minimum-hour requirements.',
    },
    {
      q: 'Is there a security deposit?',
      a: 'Some products require a refundable security deposit to protect the equipment. Security deposits are tracked separately in escrow and are never treated as platform revenue. They are automatically released back to the renter upon return inspection.',
    },
    {
      q: 'How do I become a supplier?',
      a: 'Click "Become a Supplier" in the header or footer, complete your profile, add your Ahmedabad locality, list your product with photos, prices and deposit, and start accepting booking requests once verified.',
    },
    {
      q: 'What happens if a product is damaged?',
      a: 'The supplier conducts an inspection upon return. If damage or missing parts occur, the supplier can submit a report with photographic evidence. The applicable deduction is resolved from the escrow security deposit according to platform policies.',
    },
    {
      q: 'Is Rentlyo available in Mumbai or Pune?',
      a: 'Mumbai, Pune, Delhi NCR, Bengaluru, and Hyderabad are our planned future expansion markets. We do not show fake active inventory there. You can join our priority waitlist to be notified when rentals launch in those cities.',
    },
  ];

  return (
    <div className="space-y-16 pb-16 bg-white">
      {/* Front Top Hero UI matching exact reference design */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (Content & Search) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            {/* 1. Deposit-protected rentals Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ecfdf5] border border-emerald-200/60 text-[#047857] text-xs sm:text-sm font-semibold tracking-wide shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#059669] shrink-0" />
              <span>Deposit-protected rentals</span>
            </div>

            {/* 2. Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[64px] xl:text-[72px] font-black text-slate-900 tracking-tight leading-[1.05]">
              Rent what you<br />
              need.<br />
              <span className="text-[#1d4ed8]">
                Earn from what<br />
                you don't use.
              </span>
            </h1>

            {/* 3. Subtitle */}
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl font-normal">
              Cameras, tools, tents, speakers and more — from neighbours and local shops, by the hour, day or week.
            </p>

            {/* 4. Unified Pill Search Bar */}
            <form
              onSubmit={handleHeroSearch}
              className="bg-white rounded-full p-2 pl-4 sm:pl-5 border border-slate-200/90 shadow-lg shadow-slate-100/80 hover:shadow-xl hover:border-slate-300 transition-all flex items-center justify-between gap-2 max-w-xl"
            >
              {/* Search Query Input */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="What do you need? e.g. came"
                  className="w-full text-sm sm:text-base font-normal text-slate-800 placeholder-slate-400 focus:outline-hidden bg-transparent"
                />
              </div>

              {/* Location Selector Pill */}
              <button
                type="button"
                onClick={() => setOpenLocationModal(true)}
                className="bg-slate-100 hover:bg-slate-200/80 px-3.5 py-2 rounded-full flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 shrink-0 cursor-pointer transition-colors border border-slate-200/60"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{currentArea === 'All Ahmedabad' ? 'Ahmedabad' : currentArea}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {/* Royal Blue Search Button */}
              <button
                type="submit"
                className="bg-[#1d4ed8] hover:bg-blue-800 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3 rounded-full shadow-xs cursor-pointer shrink-0 transition-colors"
              >
                Search
              </button>
            </form>

            {/* Quick Popular Search Tags */}
            <div className="pt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-medium text-slate-400">Popular:</span>
              {quickCategories.slice(0, 5).map((qc) => (
                <button
                  key={qc.name}
                  type="button"
                  onClick={() => handleQuickCatClick(qc.catId)}
                  className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 transition-colors font-medium text-[11px]"
                >
                  {qc.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column (Hero Card with Lifestyle Photo & Floating Metric) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden shadow-2xl border border-slate-100 aspect-[4/3] sm:aspect-[1.14/1] bg-slate-100">
              {/* Balcony Lifestyle Image */}
              <img
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80"
                alt="Friends unpacking camera and camping gear on balcony"
                className="w-full h-full object-cover"
              />

              {/* Subtly darkened bottom gradient for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none"></div>

              {/* Camera Rental Box Cardboard Label */}
              <div className="absolute bottom-28 left-6 sm:bottom-32 sm:left-8 bg-[#fdf6e7]/95 border border-[#e8d5b5] text-[#4a3520] px-3.5 py-2 rounded-xl shadow-lg text-xs font-bold hidden sm:flex items-center gap-2 backdrop-blur-xs">
                <Camera className="w-4 h-4 text-[#8a5d2a]" />
                <div>
                  <span className="block leading-tight text-slate-900 font-extrabold">Camera Rental</span>
                  <span className="text-[10px] text-[#7c5e3f] font-medium">Shoot More. Worry Less.</span>
                </div>
              </div>

              {/* Camping Gear Rental Box Cardboard Label */}
              <div className="absolute top-8 right-6 sm:top-10 sm:right-8 bg-[#fdf6e7]/95 border border-[#e8d5b5] text-[#4a3520] px-3.5 py-2 rounded-xl shadow-lg text-xs font-bold hidden sm:flex items-center gap-2 backdrop-blur-xs">
                <Compass className="w-4 h-4 text-emerald-700" />
                <div>
                  <span className="block leading-tight text-slate-900 font-extrabold">Camping Gear Rental</span>
                  <span className="text-[10px] text-[#7c5e3f] font-medium">Explore. Camp. Repeat.</span>
                </div>
              </div>

              {/* Quechua Tent Roll Label */}
              <div className="absolute bottom-24 right-8 bg-emerald-950/85 text-emerald-100 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg hidden sm:flex items-center gap-1.5 backdrop-blur-xs border border-emerald-700/50">
                <span>⛺ Quechua Tent</span>
              </div>

              {/* Floating Metric Card (87% Average saving vs buying) */}
              <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-100/90 z-20 min-w-[160px] sm:min-w-[190px]">
                <span className="text-xs text-slate-500 font-medium block leading-tight">
                  Average saving vs buying
                </span>
                <span className="text-3xl sm:text-4xl font-black text-[#1d4ed8] tracking-tight block mt-1">
                  87%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Popular Rentals in Ahmedabad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <MapPin className="w-4 h-4" />
              <span>Cameras & Equipment Near You in Ahmedabad</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Popular Rentals Near You
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Popular items available across Vastrapur, Satellite, Navrangpura, and Ahmedabad
            </p>
          </div>

          <button
            onClick={() => setActiveView('browse')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>View All Ahmedabad Inventory ({products.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRentals.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelect={(p) => setSelectedProduct(p)}
              onRentNow={(p) => onOpenBooking(p)}
            />
          ))}
        </div>
      </section>

      {/* 6. Browse Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Explore by Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              From high-wattage event sound to power tools and camping gear
            </p>
          </div>
          <button
            onClick={() => setActiveView('categories')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            <span>All 12 Categories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.slice(0, 6).map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategoryId(cat.id);
                setActiveView('browse');
              }}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="aspect-4/3 overflow-hidden bg-slate-100">
                <img
                  src={cat.bannerImage}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 truncate">
                  {cat.name}
                </h4>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  {cat.itemCount} items in Ahmedabad
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Navratri Offer Featured Campaign */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-amber-700 via-rose-800 to-indigo-950 text-white p-8 sm:p-12 relative shadow-xl">
          <div className="relative max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-black uppercase tracking-wider">
              <span>Festival Special · Up to 20% OFF</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Navratri Rental Festival
            </h2>
            <p className="text-base font-semibold text-amber-200">Celebrate more. Spend less.</p>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
              Special Navratri festival rental rates on high-wattage DJ systems, JBL PartyBox speakers, wireless microphones, LED stage lights, DSLR cameras and Garba traditional attire across Ahmedabad.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setSelectedCategoryId('events');
                  setActiveView('browse');
                }}
                className="py-3 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Navratri Rentals</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveView('offers')}
                className="py-3 px-5 rounded-xl border border-white/40 text-white hover:bg-white/10 font-bold text-xs transition-colors"
              >
                View Campaign Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Rental Requests ("Can't Find What You Need?") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Community Rental Requests
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Can't find what you need?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Post a request. Verified suppliers within your Ahmedabad radius respond with offers.
            </p>
          </div>

          <button
            onClick={onOpenPostRequest}
            className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <span>+ Post a Rental Request</span>
          </button>
        </div>

        {/* Requests Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rentalRequests.slice(0, 3).map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                    {req.categoryName}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 mt-0.5 leading-snug">{req.title}</h4>
                </div>
                <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-1 rounded-md shrink-0">
                  ₹{req.budgetInr}
                </span>
              </div>

              <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded-xl">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-semibold text-slate-900">{req.ahmedabadArea}, Ahmedabad</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {req.neededDate} · {req.neededTime}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 line-clamp-2">{req.notes}</p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-500">
                  {req.offersCount} supplier {req.offersCount === 1 ? 'offer' : 'offers'} received
                </span>
                <button
                  onClick={() => setActiveView('requests')}
                  className="font-bold text-blue-600 hover:text-blue-800"
                >
                  View Offers →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. How Rentlyo Works */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Simple 5-Step Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              How Rentlyo Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Transparent local rentals without buying items you only need for a few hours or days.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                step: '01',
                title: 'SEARCH',
                desc: 'Find items nearby in your Ahmedabad neighborhood by category, distance, or price.',
                icon: Search,
              },
              {
                step: '02',
                title: 'BOOK',
                desc: 'Select hourly or daily rental duration. Transparent pricing with clear deposit rules.',
                icon: Calendar,
              },
              {
                step: '03',
                title: 'PAY',
                desc: 'Confirm with secure UPI/Card escrow. Security deposit held safely and tracked separately.',
                icon: Coins,
              },
              {
                step: '04',
                title: 'USE',
                desc: 'Pick up or get doorstep delivery with 4-digit OTP verification for guaranteed safety.',
                icon: ShieldCheck,
              },
              {
                step: '05',
                title: 'RETURN',
                desc: 'Hand back the product. Quick supplier check and prompt refund of your security deposit.',
                icon: Repeat,
              },
            ].map((s) => (
              <div
                key={s.step}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3 relative overflow-hidden"
              >
                <span className="text-3xl font-black text-blue-100 block leading-none">{s.step}</span>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <s.icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">{s.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Become a Supplier CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              For Equipment Owners & Local Businesses
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Turn your unused equipment into continuous income
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Have a DSLR camera sitting in a shelf? A heavy power drill used once a year? Or a rental store in Vastrapur? List on Rentlyo and earn ₹15,000–₹45,000 per month with secure verified deposit protection.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => setActiveView('become-supplier')}
              className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all text-center cursor-pointer"
            >
              Start Listing on Rentlyo
            </button>
            <button
              onClick={() => setActiveView('supplier-dashboard')}
              className="py-3 px-5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold transition-colors text-center"
            >
              Supplier Dashboard Demo
            </button>
          </div>
        </div>
      </section>

      {/* 11. Diwali Coming Soon Campaign */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/50 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="bg-amber-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                Coming Soon
              </span>
              <span className="text-xs font-bold text-amber-800">Festive Season 2026</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900">Diwali Rental Celebration</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Get ready for special Diwali rental offers across Ahmedabad! High-lumen cinema projectors, deep cleaning machines, fairy lights, sound systems, and extra guest furniture.
            </p>
          </div>

          <button
            onClick={() => setActiveView('offers')}
            className="py-2.5 px-6 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-colors shrink-0"
          >
            Notify Me When Diwali Offers Launch
          </button>
        </div>
      </section>

      {/* 12. Mobile App Launch Coming Soon Campaign */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-blue-900 text-white p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-lg">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="bg-sky-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                Coming Soon
              </span>
              <span className="text-xs font-semibold text-blue-200">Android & iOS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Rentlyo Mobile App Launch
            </h3>
            <p className="text-xs sm:text-sm text-blue-100">
              The Rentlyo mobile application is launching soon. Join the early waitlist to get zero platform fees on your first three rentals and instant neighborhood alerts.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {appWaitlistDone ? (
              <div className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 p-3.5 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>You're on the early mobile app waitlist!</span>
              </div>
            ) : (
              <form onSubmit={handleAppWaitlistSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={appWaitlistEmail}
                  onChange={(e) => setAppWaitlistEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-3.5 py-2.5 rounded-xl bg-blue-950/80 border border-blue-700 text-xs text-white placeholder:text-blue-300/60 focus:outline-hidden focus:ring-2 focus:ring-blue-400 w-full sm:w-64"
                  required
                />
                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-xl bg-white text-blue-900 font-bold text-xs hover:bg-blue-50 transition-colors shrink-0 shadow-md"
                >
                  Join App Waitlist
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 13. Why Rentlyo (4 Feature Cards from Section 55) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Core Benefits</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Why Choose Rentlyo</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-2.5 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Coins className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900">Save Money</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rent products instead of buying them for temporary needs. Access premium gear for a tiny fraction of retail price.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-2.5 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900">Find Nearby</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Discover rental products right across Ahmedabad neighborhoods within minutes of your home or office.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-2.5 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900">Earn From Unused Items</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Suppliers can turn unused products into recurring passive income with fully managed security deposit escrow.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-2.5 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900">Flexible Rentals</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hourly, daily and weekly rental options tailored to your exact requirement without rigid contracts.
            </p>
          </div>
        </div>
      </section>

      {/* 14. Ahmedabad Locality Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border border-slate-200 rounded-3xl p-8 bg-white space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Ahmedabad-First Presence
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                Neighborhood Rental Hubs in Ahmedabad
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              40+ Active Verified Areas
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-50">
              <span className="font-bold text-slate-900 block">West Ahmedabad</span>
              <p className="text-slate-600 leading-relaxed">
                Vastrapur, Bodakdev, Satellite, Thaltej, Prahlad Nagar, Anandnagar, Jodhpur, Shyamal, Bopal, Ambli
              </p>
            </div>

            <div className="space-y-1.5 p-3 rounded-xl bg-slate-50">
              <span className="font-bold text-slate-900 block">Central Ahmedabad</span>
              <p className="text-slate-600 leading-relaxed">
                Navrangpura, C.G. Road, Ashram Road, Paldi, Ellis Bridge, Usmanpura, Naranpura
              </p>
            </div>

            <div className="space-y-1.5 p-3 rounded-xl bg-slate-50">
              <span className="font-bold text-slate-900 block">North Ahmedabad</span>
              <p className="text-slate-600 leading-relaxed">
                Chandkheda, Motera, Sabarmati, Gota, New Ranip, Ranip, Sola, Vaishnodevi
              </p>
            </div>

            <div className="space-y-1.5 p-3 rounded-xl bg-slate-50">
              <span className="font-bold text-slate-900 block">East Ahmedabad</span>
              <p className="text-slate-600 leading-relaxed">
                Maninagar, Vastral, Nikol, Bapunagar, Odhav, Hatkeshwar, Ramol, CTM, Isanpur
              </p>
            </div>

            <div className="space-y-1.5 p-3 rounded-xl bg-slate-50">
              <span className="font-bold text-slate-900 block">South Ahmedabad</span>
              <p className="text-slate-600 leading-relaxed">
                Vatva, Narol, Lambha, Juhapura, Sarkhej
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 15. Future Cities Section (Section 35) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Expansion Roadmap</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Rentlyo is Expanding</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Ahmedabad is just the beginning. Rentlyo plans to expand to more major Indian cities.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="border-2 border-blue-600 rounded-2xl p-4 bg-blue-50/50 text-center space-y-1 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-200/80 px-2 py-0.5 rounded-full inline-block">
              Active Now
            </span>
            <h4 className="font-bold text-base text-slate-900">Ahmedabad</h4>
            <span className="text-[11px] text-slate-500 block">Gujarat</span>
          </div>

          {['Mumbai', 'Pune', 'Delhi NCR', 'Bengaluru', 'Hyderabad'].map((city) => (
            <div
              key={city}
              className="border border-slate-200 rounded-2xl p-4 bg-white text-center space-y-2 hover:border-slate-300 transition-colors"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full inline-block">
                Coming Soon
              </span>
              <h4 className="font-bold text-sm text-slate-900">{city}</h4>
              <button
                onClick={() => setOpenLocationModal(true)}
                className="text-[11px] font-semibold text-blue-600 hover:underline block mx-auto"
              >
                Join Waitlist →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 16. Customer Reviews */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Community Testimonials
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Loved by Ahmedabad Renters
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Kavita Dave',
                area: 'Vastrapur, Ahmedabad',
                comment: 'Saved me ₹35,000! Rented the Canon 1500D for my sister’s engagement in Vastrapur for just 2 days. The supplier handed over extra memory cards and a spare battery. Deposit was refunded within 40 minutes of return.',
                item: 'Canon EOS 1500D DSLR',
              },
              {
                name: 'Hardik Desai',
                area: 'Satellite, Ahmedabad',
                comment: 'The JBL PartyBox 310 had incredible punch at our club society garba rehearsal. Pickup was super smooth near Satellite. Seamless OTP verification and clean equipment.',
                item: 'JBL PartyBox 310 (240W)',
              },
              {
                name: 'Manish Trivedi',
                area: 'Bopal, Ahmedabad',
                comment: 'Took the Quechua tent to Polo Forest. It poured rain but not a single drop entered. Outdoor Hub in Bopal gave us a demonstration before handover. Excellent platform for Ahmedabad!',
                item: 'Quechua 4-Person Tent',
              },
            ].map((rev, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-2xs"
              >
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{rev.comment}"
                </p>
                <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{rev.name}</span>
                    <span className="text-slate-400 text-[11px]">{rev.area}</span>
                  </div>
                  <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-md">
                    {rev.item}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 17. FAQ (Section 56) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Questions?</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = faqOpenIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-white transition-colors"
              >
                <button
                  onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm text-slate-900 cursor-pointer hover:bg-slate-50"
                >
                  <span>{faq.q}</span>
                  <span className="text-slate-400 text-lg font-light shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
