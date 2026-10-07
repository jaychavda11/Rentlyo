import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Store,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Coins,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';

export const BecomeSupplierPage: React.FC = () => {
  const { setCurrentRole, setActiveView } = useApp();
  const [selectedAsset, setSelectedAsset] = useState('camera');

  const assetEarnings: Record<string, { title: string; rate: number; days: number; total: number }> = {
    camera: { title: 'DSLR / Mirrorless Camera Kit', rate: 550, days: 10, total: 5500 },
    speaker: { title: 'JBL / Sony Party Sound System', rate: 750, days: 8, total: 6000 },
    projector: { title: 'High-Lumen Projector', rate: 600, days: 6, total: 3600 },
    tool: { title: 'Bosch Power Drill Kit', rate: 250, days: 8, total: 2000 },
    tent: { title: '4-Person Camping Tent Bundle', rate: 350, days: 8, total: 2800 },
  };

  const handleStartListing = () => {
    setCurrentRole('supplier');
    setActiveView('supplier-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-950 text-white rounded-3xl p-8 sm:p-14 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="space-y-5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Monetize Idle Equipment in Ahmedabad</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Turn what you own into monthly income.
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Join hundreds of verified individuals and local rental businesses across Vastrapur, Satellite, Navrangpura, and Ahmedabad renting out cameras, party sound, projectors, tools, and outdoor gear.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={handleStartListing}
              className="py-3.5 px-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>List Your First Item</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleStartListing}
              className="py-3.5 px-6 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold transition-colors"
            >
              Open Supplier Dashboard
            </button>
          </div>
        </div>

        {/* Dynamic Earnings Calculator */}
        <div className="w-full lg:w-96 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
              Earnings Estimator
            </span>
            <h4 className="font-bold text-base text-white">How much can you earn?</h4>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-400 block font-medium">Select Item Category:</label>
            <select
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
            >
              <option value="camera">DSLR Camera Kit</option>
              <option value="speaker">Party Speaker System</option>
              <option value="projector">HD Cinema Projector</option>
              <option value="tool">Power Tool / Drill</option>
              <option value="tent">Camping Tent Bundle</option>
            </select>
          </div>

          <div className="p-4 rounded-2xl bg-blue-950/60 border border-blue-800/80 space-y-2">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Avg Daily Rate</span>
              <strong className="text-white">₹{assetEarnings[selectedAsset].rate}/day</strong>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span>Rented Days / Month</span>
              <strong className="text-white">{assetEarnings[selectedAsset].days} days</strong>
            </div>
            <div className="border-t border-blue-900 pt-2 flex justify-between items-baseline">
              <span className="text-xs font-bold text-slate-200">Estimated Earnings</span>
              <span className="text-2xl font-black text-emerald-400">
                ₹{assetEarnings[selectedAsset].total.toLocaleString()}
                <span className="text-[10px] text-slate-400 font-normal">/mo</span>
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            *Based on typical Ahmedabad demand patterns during weekends and festivals.
          </p>
        </div>
      </div>

      {/* Supplier Protections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base text-slate-900">Separate Escrow Deposits</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            You set the refundable security deposit. Rentlyo holds it safely in escrow until you inspect and verify the returned equipment.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Coins className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base text-slate-900">Weekly Direct Payouts</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Earnings from completed rentals are deposited straight into your bank account with a transparent 15% platform fee.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base text-slate-900">Ahmedabad Locality Privacy</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            We show only your general neighborhood (e.g. Vastrapur) to the public. Exact pickup details are shared only after payment is confirmed.
          </p>
        </div>
      </div>
    </div>
  );
};
