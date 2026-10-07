import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AHMEDABAD_AREAS, CATEGORIES } from '../data/constants';
import { Product, Booking } from '../types';
import {
  Store,
  LayoutDashboard,
  Package,
  PlusCircle,
  Calendar,
  Wallet,
  Clock,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Building,
  TrendingUp,
  MapPin,
  Star,
  Users,
  KeyRound,
  FileText,
  Mail,
  Upload,
  Image as ImageIcon,
  ArrowRight,
  Phone,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const SupplierDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    bookings,
    updateBookingStatus,
    completeReturnAndRefund,
    settings,
    currentUser,
    emails,
    setOpenEmailInboxModal,
    setActiveView,
    setBookingTargetProduct,
    setOpenBookingModal,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'products' | 'add_product' | 'payouts'>('overview');

  // Supplier Identity
  const supplierName = currentUser?.businessName || currentUser?.name || 'Apex Rentals Ahmedabad';
  const supplierEmail = currentUser?.email || 'ghanshymchavda3@gmail.com';
  const supplierArea = currentUser?.ahmedabadArea || 'Vastrapur';
  const supplierAvatar = currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

  // Add Product Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCatId, setNewCatId] = useState('photography');
  const [newSubcat, setNewSubcat] = useState('DSLR Cameras');
  const [newArea, setNewArea] = useState(supplierArea);
  const [newHourly, setNewHourly] = useState(150);
  const [newDaily, setNewDaily] = useState(850);
  const [newWeekly, setNewWeekly] = useState(4200);
  const [newDeposit, setNewDeposit] = useState(2500);
  const [newHandover, setNewHandover] = useState<'Pickup & Delivery' | 'Self Pickup Only' | 'Delivery Available'>('Pickup & Delivery');
  const [newDesc, setNewDesc] = useState('Premium tested equipment available for rent in Ahmedabad. Includes all essential cables and safety case.');
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80');
  const [productAddedSuccess, setProductAddedSuccess] = useState<Product | null>(null);

  // Preset image library for quick listing
  const sampleImages = [
    { label: 'Sony Camera', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80' },
    { label: 'Projector', url: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80' },
    { label: 'Party Speaker', url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80' },
    { label: 'DJI Drone', url: 'https://images.unsplash.com/photo-1507582020432-2a3bc410d321?auto=format&fit=crop&w=800&q=80' },
    { label: 'Power Drill Tool', url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80' },
    { label: 'Camping Tent', url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80' },
  ];

  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // OTP Handover State
  const [handoverBookingId, setHandoverBookingId] = useState<string | null>(null);
  const [enteredOtp, setEnteredOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<string | null>(null);

  // Return Inspection Modal State
  const [inspectBookingId, setInspectBookingId] = useState<string | null>(null);
  const [damageDeduction, setDamageDeduction] = useState<number>(0);
  const [damageNotes, setDamageNotes] = useState<string>('');

  // Bookings relevant to this supplier
  const supplierBookings = bookings.filter((b) => {
    if (!currentUser) return true;
    return (
      b.supplierId === currentUser.id ||
      b.supplierEmail?.toLowerCase() === currentUser.email?.toLowerCase() ||
      b.supplierName === supplierName ||
      b.supplierName === currentUser.name ||
      b.supplierName === currentUser.businessName
    );
  });

  const displayBookings = supplierBookings.length > 0 ? supplierBookings : bookings;

  const pendingRequests = displayBookings.filter((b) => b.status === 'confirmed');
  const activeRentals = displayBookings.filter((b) => b.status === 'active_rental');
  const completedRentals = displayBookings.filter((b) => b.status === 'completed');

  // Supplier's listed products
  const supplierProducts = products.filter((p) => {
    if (!currentUser) return true;
    return (
      p.supplierId === currentUser.id ||
      p.supplierEmail?.toLowerCase() === currentUser.email?.toLowerCase() ||
      p.supplierName === supplierName ||
      p.supplierName === currentUser.businessName
    );
  });

  const displayProducts = supplierProducts.length > 0 ? supplierProducts : products.slice(0, 4);

  // Supplier emails
  const supplierEmails = emails.filter(
    (e) => e.toEmail.toLowerCase() === supplierEmail.toLowerCase()
  );

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = CATEGORIES.find((c) => c.id === newCatId);
    const areaObj = AHMEDABAD_AREAS.find((a) => a.name === newArea);

    const productPayload = {
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/\s+/g, '-'),
      categoryId: newCatId,
      categoryName: cat?.name || 'Electronics',
      subcategoryId: newSubcat,
      description: newDesc || 'Verified quality rental item in Ahmedabad.',
      features: ['Genuine equipment', 'Tested working', 'Includes necessary accessories', 'Clean sanitized condition'],
      images: [newImageUrl],
      hourlyPrice: newHourly,
      dailyPrice: newDaily,
      weeklyPrice: newWeekly,
      securityDeposit: newDeposit,
      ahmedabadArea: newArea,
      ahmedabadZone: areaObj?.zone || 'West',
      supplierId: currentUser?.id || 'sup-custom-user',
      supplierName: supplierName,
      supplierEmail: supplierEmail,
      supplierVerified: true,
      supplierType: 'Local Business' as const,
      supplierRating: 5.0,
      supplierReviewCount: 1,
      rating: 5.0,
      reviewCount: 1,
      isAvailable: true,
      minRentalHours: 2,
      handoverMethod: newHandover,
    };

    addProduct(productPayload);

    const createdProd: Product = {
      ...productPayload,
      id: `prod-temp-${Date.now()}`,
      status: 'approved',
      distanceKm: 2.5,
      baseDistanceKm: 2.5,
      createdAt: new Date().toISOString(),
    };

    setProductAddedSuccess(createdProd);
  };

  const handleVerifyHandover = (bookingId: string) => {
    const res = updateBookingStatus(bookingId, 'active_rental', enteredOtp);
    if (!res.success) {
      setOtpError(res.message);
    } else {
      setHandoverBookingId(null);
      setEnteredOtp('');
      setOtpError(null);
    }
  };

  const handleReturnConfirm = (bookingId: string) => {
    completeReturnAndRefund(bookingId, damageDeduction, damageNotes);
    setInspectBookingId(null);
    setDamageDeduction(0);
    setDamageNotes('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      {/* Darker Supplier Sidebar */}
      <aside className="w-full md:w-72 bg-slate-950 border-r border-slate-800 p-5 space-y-6 shrink-0">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <img
            src={supplierAvatar}
            alt={supplierName}
            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-blue-500 shadow-md"
          />
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-white truncate">{supplierName}</h4>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Verified Host ({supplierArea})</span>
            </div>
            <div className="text-[10px] text-slate-500 truncate">{supplierEmail}</div>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="space-y-1 text-xs font-semibold">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { id: 'requests', label: 'Rental Requests & Bookings', icon: Calendar, badge: pendingRequests.length },
            { id: 'products', label: 'My Listed Products', icon: Package, badge: displayProducts.length },
            { id: 'add_product', label: '+ List Item for Rent', icon: PlusCircle },
            { id: 'payouts', label: 'Earnings & Payouts', icon: Wallet },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    item.id === 'requests'
                      ? 'bg-amber-400 text-slate-950 animate-bounce'
                      : 'bg-emerald-500 text-slate-950'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Email Alerts Link */}
        <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-blue-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>Email Notification Center</span>
            </span>
            <span className="text-[10px] bg-blue-600 text-white font-black px-1.5 py-0.2 rounded-full">
              {supplierEmails.length}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            All rental booking requests and OTP receipts are automatically delivered to <strong>{supplierEmail}</strong>.
          </p>
          <button
            onClick={() => setOpenEmailInboxModal(true)}
            className="w-full py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
          >
            <span>Open Email Inbox</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Locality Hub info */}
        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <span className="font-bold text-slate-200 block">Host Locality</span>
          <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>{supplierArea}, Ahmedabad</span>
          </div>
          <span className="text-[10px] text-slate-500 block">
            Escrow deposits securely held by Rentlyo until return.
          </span>
        </div>
      </aside>

      {/* Main Dashboard Panel */}
      <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-blue-600/30 text-blue-400 border border-blue-500/30 text-[10px] font-black uppercase tracking-wider">
                Supplier Dashboard
              </span>
              <span className="text-xs text-slate-400">· {supplierArea}, Ahmedabad</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              Good morning, {supplierName} 👋
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Whenever a renter rents your gear, incoming requests arrive here with full renter details and automated email alerts.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActiveTab('add_product')}
              className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List New Item</span>
            </button>
          </div>
        </div>

        {/* Main Supplier Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Rental Requests</span>
              <Calendar className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{displayBookings.length}</div>
            <span className="text-[11px] text-amber-400 font-semibold">{pendingRequests.length} pending handover</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Total Earnings</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">₹48,200</div>
            <span className="text-[11px] text-emerald-400 font-medium">85% host net payout</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Active Items Listed</span>
              <Package className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{displayProducts.length}</div>
            <span className="text-[11px] text-slate-400">Live in Ahmedabad</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Platform Commission</span>
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{settings.commissionPercent}%</div>
            <span className="text-[11px] text-slate-400">Includes deposit escrow</span>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Urgent: Pending Rental Requests Banner */}
            {pendingRequests.length > 0 && (
              <div className="bg-gradient-to-r from-amber-950/60 via-amber-900/40 to-slate-900 border border-amber-600/60 p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                      Action Required ({pendingRequests.length} Incoming Request)
                    </span>
                    <h3 className="text-base font-bold text-white">
                      Renter booked "{pendingRequests[0].productTitle}"!
                    </h3>
                    <p className="text-xs text-slate-300">
                      Renter: <strong>{pendingRequests[0].renterName}</strong> ({pendingRequests[0].renterEmail}) · Handover OTP: <span className="font-mono font-bold text-amber-300">{pendingRequests[0].handoverOtp}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('requests')}
                  className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors shadow-md self-start sm:self-auto cursor-pointer"
                >
                  Review Request & Handover →
                </button>
              </div>
            )}

            {/* Quick Actions Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                onClick={() => setActiveTab('add_product')}
                className="bg-slate-950 border border-slate-800 hover:border-blue-500 p-5 rounded-2xl cursor-pointer transition-all space-y-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white">List Another Item</h4>
                <p className="text-xs text-slate-400">Add camera, audio, tool or party equipment to start earning.</p>
              </div>

              <div
                onClick={() => setActiveTab('requests')}
                className="bg-slate-950 border border-slate-800 hover:border-amber-500 p-5 rounded-2xl cursor-pointer transition-all space-y-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <Calendar className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white">Rental Requests ({displayBookings.length})</h4>
                <p className="text-xs text-slate-400">View renter details, confirm handovers, verify 4-digit OTPs.</p>
              </div>

              <div
                onClick={() => setOpenEmailInboxModal(true)}
                className="bg-slate-950 border border-slate-800 hover:border-emerald-500 p-5 rounded-2xl cursor-pointer transition-all space-y-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white">View Email Alerts ({supplierEmails.length})</h4>
                <p className="text-xs text-slate-400">Inspect simulated or dispatched emails delivered to your address.</p>
              </div>
            </div>

            {/* Visual Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">Monthly Earnings Trend (2026)</h3>
                  <span className="text-xs text-slate-400">Ahmedabad Market</span>
                </div>
                <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2">
                  {[
                    { m: 'May', v: 9200, h: '45%' },
                    { m: 'Jun', v: 11400, h: '55%' },
                    { m: 'Jul', v: 14200, h: '68%' },
                    { m: 'Aug', v: 16800, h: '80%' },
                    { m: 'Sep', v: 21200, h: '95%' },
                    { m: 'Oct', v: 24500, h: '88%' },
                  ].map((bar) => (
                    <div key={bar.m} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-slate-800 rounded-t-lg relative group h-32 flex items-end">
                        <div
                          style={{ height: bar.h }}
                          className="w-full bg-blue-600 rounded-t-lg transition-all group-hover:bg-blue-500"
                        ></div>
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-[10px] text-white px-2 py-0.5 rounded-sm pointer-events-none transition-opacity">
                          ₹{bar.v}
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400">{bar.m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Earnings by Category */}
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-white">Earnings by Category</h3>
                <div className="space-y-3 pt-2 text-xs">
                  {[
                    { name: 'Photography & DSLRs', pct: 45, color: 'bg-blue-500' },
                    { name: 'Party Audio & Speakers', pct: 30, color: 'bg-emerald-500' },
                    { name: 'Projectors & Screens', pct: 15, color: 'bg-indigo-500' },
                    { name: 'DIY Tools & Other', pct: 10, color: 'bg-amber-500' },
                  ].map((cat) => (
                    <div key={cat.name} className="space-y-1">
                      <div className="flex justify-between text-slate-300">
                        <span>{cat.name}</span>
                        <span className="font-bold">{cat.pct}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div style={{ width: `${cat.pct}%` }} className={`h-full ${cat.color}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Booking Requests List */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Recent Equipment Rental Bookings</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Renters who rented your items in Ahmedabad</p>
                </div>
                <button
                  onClick={() => setActiveTab('requests')}
                  className="text-xs text-blue-400 hover:underline font-bold"
                >
                  Manage Requests ({displayBookings.length}) →
                </button>
              </div>

              <div className="divide-y divide-slate-800">
                {displayBookings.map((bkg) => (
                  <div key={bkg.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={bkg.productImage}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <h5 className="font-bold text-xs text-white truncate max-w-sm">{bkg.productTitle}</h5>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Renter: <strong className="text-slate-200">{bkg.renterName}</strong> · Phone: {bkg.renterPhone} · {bkg.ahmedabadArea}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 text-right">
                      <div>
                        <span className="text-xs font-black text-white">Fee: ₹{bkg.rentalFee}</span>
                        <span className="text-[10px] text-emerald-400 block font-semibold">
                          Deposit: ₹{bkg.securityDeposit} (Escrow)
                        </span>
                      </div>
                      <span className={`text-[10px] uppercase font-black px-2.5 py-1 rounded-full ${
                        bkg.status === 'confirmed'
                          ? 'bg-amber-400 text-slate-950'
                          : bkg.status === 'active_rental'
                          ? 'bg-blue-600 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}>
                        {bkg.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RENTAL REQUESTS & BOOKINGS (CORE WORKING REQUIREMENT) */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-white">Rental Requests & Handover Workflow</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  When a renter books your item, their request appears here. Verify the 4-digit Handover OTP during physical collection.
                </p>
              </div>

              <button
                onClick={() => setOpenEmailInboxModal(true)}
                className="py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 text-xs font-bold border border-slate-700 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>View Email Notification Inbox</span>
              </button>
            </div>

            <div className="space-y-4">
              {displayBookings.map((bkg) => (
                <div key={bkg.id} className="bg-slate-950 border border-slate-800 p-5 rounded-3xl space-y-4 shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={bkg.productImage} alt="" className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-800" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-blue-400 font-bold uppercase">{bkg.id}</span>
                          <span className={`text-[10px] font-black px-2 py-0.2 rounded-full uppercase ${
                            bkg.status === 'confirmed'
                              ? 'bg-amber-400 text-slate-950 animate-pulse'
                              : bkg.status === 'active_rental'
                              ? 'bg-blue-600 text-white'
                              : 'bg-emerald-600 text-white'
                          }`}>
                            {bkg.status.replace('_', ' ')}
                          </span>
                        </div>
                        <h4 className="font-bold text-base text-white mt-0.5">{bkg.productTitle}</h4>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-1">
                          <span className="text-white font-semibold flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-blue-400" />
                            <span>Renter: {bkg.renterName}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-500" />
                            <span>{bkg.renterPhone}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-500" />
                            <span>{bkg.renterEmail}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-500" />
                            <span>{bkg.ahmedabadArea}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 bg-slate-900 p-3 rounded-2xl border border-slate-800">
                      <div className="text-sm font-black text-white">Rental Fee: ₹{bkg.rentalFee}</div>
                      <div className="text-[11px] text-emerald-400 font-semibold">Security Deposit: ₹{bkg.securityDeposit}</div>
                      <div className="text-[10px] text-slate-400">Total Paid by Renter: ₹{bkg.totalPaid}</div>
                    </div>
                  </div>

                  {/* Dates & Handover Details */}
                  <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
                    <div className="flex items-center gap-3">
                      <span><strong>Duration:</strong> {bkg.rentalUnits} {bkg.rentalDurationType === 'hourly' ? 'hours' : 'days'}</span>
                      <span>·</span>
                      <span><strong>Rental Start:</strong> {bkg.startDate} ({bkg.startTime})</span>
                    </div>

                    <div className="text-slate-400 text-[11px]">
                      Registered Supplier Email: <span className="text-blue-400 font-bold">{bkg.supplierEmail || supplierEmail}</span>
                    </div>
                  </div>

                  {/* Handover & OTP Verification Actions */}
                  <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="text-slate-400">
                      {bkg.status === 'confirmed' && (
                        <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>Request received! Ready for equipment pickup / handover.</span>
                        </span>
                      )}
                      {bkg.status === 'active_rental' && (
                        <span className="text-blue-400 font-semibold flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 shrink-0" />
                          <span>Equipment currently in renter possession.</span>
                        </span>
                      )}
                      {bkg.status === 'completed' && (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>Rental successfully completed. Deposit settled.</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Step 1: Handover with OTP */}
                      {bkg.status === 'confirmed' && (
                        <div>
                          {handoverBookingId === bkg.id ? (
                            <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-700">
                              <input
                                type="text"
                                maxLength={4}
                                value={enteredOtp}
                                onChange={(e) => setEnteredOtp(e.target.value)}
                                placeholder="Enter 4-digit OTP"
                                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-600 text-xs w-32 font-bold tracking-widest text-center text-white"
                              />
                              <button
                                onClick={() => handleVerifyHandover(bkg.id)}
                                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
                              >
                                Confirm Handover
                              </button>
                              <button
                                onClick={() => setHandoverBookingId(null)}
                                className="px-2 py-1.5 text-slate-400 hover:text-white"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setHandoverBookingId(bkg.id);
                                  setEnteredOtp(bkg.handoverOtp); // Pre-fill test OTP for instantaneous test convenience!
                                }}
                                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer shadow-md flex items-center gap-1.5"
                              >
                                <KeyRound className="w-3.5 h-3.5" />
                                <span>Verify Handover OTP ({bkg.handoverOtp})</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Step 2: Return & Deposit Refund */}
                      {bkg.status === 'active_rental' && (
                        <div>
                          {inspectBookingId === bkg.id ? (
                            <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-700">
                              <input
                                type="number"
                                value={damageDeduction}
                                onChange={(e) => setDamageDeduction(parseInt(e.target.value) || 0)}
                                placeholder="Damage (₹)"
                                className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-600 text-xs w-28 text-white font-bold"
                              />
                              <button
                                onClick={() => handleReturnConfirm(bkg.id)}
                                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
                              >
                                Release Deposit (₹{bkg.securityDeposit - damageDeduction})
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setInspectBookingId(bkg.id)}
                              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer flex items-center gap-1.5"
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>Inspect Item & Release Deposit</span>
                            </button>
                          )}
                        </div>
                      )}

                      {/* View Email Button */}
                      <button
                        onClick={() => setOpenEmailInboxModal(true)}
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
                        title="View email sent for this booking"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MY LISTED PRODUCTS */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-white">Your Listed Rental Products ({displayProducts.length})</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Items currently live and rentable by customers across Ahmedabad.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('add_product')}
                className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md self-start sm:self-auto"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ List Another Item</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayProducts.map((p) => (
                <div key={p.id} className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden p-4 space-y-3.5 shadow-md hover:border-slate-700 transition-all">
                  <div className="aspect-16/10 rounded-2xl overflow-hidden bg-slate-900 relative">
                    <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 right-2.5 bg-slate-950/80 backdrop-blur-xs text-emerald-400 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-500/30">
                      Live in {p.ahmedabadArea}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{p.categoryName}</span>
                    <h5 className="font-bold text-sm text-white truncate mt-0.5">{p.title}</h5>

                    <div className="flex justify-between items-baseline pt-2 text-xs border-t border-slate-900 mt-2">
                      <div>
                        <span className="text-white font-black text-sm">₹{p.dailyPrice}</span>
                        <span className="text-slate-400 text-[10px]"> / day</span>
                      </div>
                      <span className="text-slate-400 text-xs">Deposit: ₹{p.securityDeposit}</span>
                    </div>

                    <div className="text-[11px] text-slate-500 pt-1">
                      Host: <strong className="text-slate-300">{p.supplierName}</strong>
                    </div>

                    {/* Test booking CTA button directly on card! */}
                    <div className="pt-3 border-t border-slate-900 mt-2 flex gap-2">
                      <button
                        onClick={() => {
                          setBookingTargetProduct(p);
                          setOpenBookingModal(true);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-blue-900/40 hover:bg-blue-800 text-blue-200 border border-blue-700/50 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5 text-blue-400" />
                        <span>Test Renting This Item</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ADD PRODUCT (CORE WORKING REQUIREMENT) */}
        {activeTab === 'add_product' && (
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 max-w-3xl space-y-6 shadow-xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-blue-600/30 text-blue-400 text-[10px] font-black uppercase">
                  Product Listing Form
                </span>
                <span className="text-xs text-slate-400">· Saved & published live</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">List an Item for Rent in Ahmedabad</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Set hourly, daily, and deposit requirements. An email notification will be dispatched to <strong>{supplierEmail}</strong> once published.
              </p>
            </div>

            {productAddedSuccess ? (
              <div className="p-8 text-center bg-emerald-950/60 border border-emerald-700/80 rounded-3xl space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
                <div>
                  <h4 className="text-xl font-bold text-white">Item Published Successfully!</h4>
                  <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
                    "{productAddedSuccess.title}" is now active in the Ahmedabad marketplace. A listing confirmation email was sent to <strong>{supplierEmail}</strong>.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setBookingTargetProduct(productAddedSuccess);
                      setOpenBookingModal(true);
                    }}
                    className="py-2.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Test Rent as Renter Now</span>
                  </button>

                  <button
                    onClick={() => {
                      setProductAddedSuccess(null);
                      setActiveTab('products');
                    }}
                    className="py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    View in My Products
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleAddProductSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Item Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Sony FX3 Cinema Camera + 24-70mm G-Master Lens"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* Category & Locality */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Category
                    </label>
                    <select
                      value={newCatId}
                      onChange={(e) => setNewCatId(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Ahmedabad Area
                    </label>
                    <select
                      value={newArea}
                      onChange={(e) => setNewArea(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                    >
                      {AHMEDABAD_AREAS.map((a) => (
                        <option key={a.id} value={a.name}>
                          {a.name} ({a.zone})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Rates & Security Deposit */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Hourly Rate (₹)
                    </label>
                    <input
                      type="number"
                      required
                      value={newHourly}
                      onChange={(e) => setNewHourly(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Daily Rate (₹)
                    </label>
                    <input
                      type="number"
                      required
                      value={newDaily}
                      onChange={(e) => setNewDaily(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Security Deposit (₹)
                    </label>
                    <input
                      type="number"
                      required
                      value={newDeposit}
                      onChange={(e) => setNewDeposit(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-bold"
                    />
                  </div>
                </div>

                {/* Handover Method */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Handover Method
                  </label>
                  <select
                    value={newHandover}
                    onChange={(e) => setNewHandover(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  >
                    <option value="Pickup & Delivery">Pickup & Delivery (Host location & doorstep)</option>
                    <option value="Self Pickup Only">Self Pickup Only (At host address in {newArea})</option>
                    <option value="Delivery Available">Delivery Available (City-wide dispatch)</option>
                  </select>
                </div>

                {/* Image Selection with Upload & Presets */}
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                      <span>Item Photo</span>
                    </label>

                    <label className="text-xs text-blue-400 hover:text-blue-300 font-bold cursor-pointer flex items-center gap-1">
                      <Upload className="w-3 h-3" />
                      <span>Upload Custom Photo</span>
                      <input type="file" accept="image/*" onChange={handleProductImageUpload} className="hidden" />
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={newImageUrl}
                      alt="Product preview"
                      className="w-16 h-16 rounded-xl object-cover ring-2 ring-blue-500 shrink-0"
                    />

                    <div className="flex-1 space-y-1.5">
                      <span className="text-[10px] text-slate-400">Or choose quick sample preset:</span>
                      <div className="flex gap-1.5 overflow-x-auto py-1">
                        {sampleImages.map((s, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setNewImageUrl(s.url)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors shrink-0 cursor-pointer ${
                              newImageUrl === s.url
                                ? 'bg-blue-600 text-white border-blue-500'
                                : 'bg-slate-950 text-slate-400 border-slate-700 hover:text-white'
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Description & Inclusions
                  </label>
                  <textarea
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    rows={3}
                    placeholder="Mention battery condition, memory cards, power cords, and check requirements..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Publish Rental Listing Live in Ahmedabad</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 5: PAYOUTS */}
        {activeTab === 'payouts' && (
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div>
              <h3 className="text-xl font-bold text-white">Supplier Payout Settlements</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Payouts are transferred via IMPS / UPI to your registered bank account every Tuesday.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-800 flex justify-between items-center text-xs">
              <div>
                <span className="text-slate-400 block">Bank Account on File</span>
                <strong className="text-white">HDFC Bank · A/C Ending in 8492 · IFSC: HDFC0000006</strong>
              </div>
              <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                Active & Verified
              </span>
            </div>

            <div className="divide-y divide-slate-800 text-xs">
              <div className="py-3.5 flex justify-between">
                <span>Disbursement #PO-8821 (1 Oct 2026)</span>
                <span className="font-bold text-emerald-400">₹14,200 (Completed)</span>
              </div>
              <div className="py-3.5 flex justify-between">
                <span>Disbursement #PO-8804 (24 Sep 2026)</span>
                <span className="font-bold text-emerald-400">₹18,900 (Completed)</span>
              </div>
              <div className="py-3.5 flex justify-between">
                <span>Upcoming Scheduled Transfer (14 Oct 2026)</span>
                <span className="font-bold text-amber-400">₹4,200 (Processing)</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
