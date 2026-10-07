import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RentalRequest, SupplierOffer } from '../types';
import {
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Coins,
  Send,
  CheckCircle2,
  Building,
  Star,
  ShieldCheck,
  ChevronRight,
  Plus,
} from 'lucide-react';

interface RentalRequestsPageProps {
  onOpenPostRequest: () => void;
}

export const RentalRequestsPage: React.FC<RentalRequestsPageProps> = ({
  onOpenPostRequest,
}) => {
  const {
    rentalRequests,
    supplierOffers,
    submitSupplierOffer,
    acceptSupplierOffer,
    currentRole,
    currentArea,
    setActiveView,
  } = useApp();

  const [selectedRequestForOffers, setSelectedRequestForOffers] = useState<RentalRequest | null>(
    rentalRequests[0] || null
  );
  const [showOfferForm, setShowOfferForm] = useState<boolean>(false);

  // New Supplier Offer Form state
  const [offerPrice, setOfferPrice] = useState<number>(750);
  const [offerDeposit, setOfferDeposit] = useState<number>(1000);
  const [offerProduct, setOfferProduct] = useState<string>('Available in Stock');
  const [offerDelivery, setOfferDelivery] = useState<string>('Free Handover in Ahmedabad');
  const [offerNotes, setOfferNotes] = useState<string>('Ready for pickup or doorstep handover.');
  const [offerSubmitted, setOfferSubmitted] = useState<boolean>(false);

  const currentRequestOffers = selectedRequestForOffers
    ? supplierOffers.filter((o) => o.requestId === selectedRequestForOffers.id)
    : [];

  const handleSendSupplierOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequestForOffers) return;

    submitSupplierOffer({
      requestId: selectedRequestForOffers.id,
      supplierId: 'sup-current-user',
      supplierName: 'My Ahmedabad Rental Store',
      supplierRating: 4.9,
      productName: offerProduct,
      offeredPrice: offerPrice,
      securityDeposit: offerDeposit,
      deliveryOption: offerDelivery,
      notes: offerNotes,
    });

    setOfferSubmitted(true);
    setTimeout(() => {
      setOfferSubmitted(false);
      setShowOfferForm(false);
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Peer & Store Request Exchange</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Can't find what you need?
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Post an exact requirement with your dates, preferred Ahmedabad area and budget. Local equipment owners and rental stores in Navrangpura, Vastrapur, and across Ahmedabad will respond with competing offers.
          </p>
        </div>

        <button
          onClick={onOpenPostRequest}
          className="py-3 px-6 rounded-2xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Post a Rental Request</span>
        </button>
      </div>

      {/* Main Grid: Left requests feed, Right offers comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Requests list (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">
              Active Community Requests ({rentalRequests.length})
            </h3>
            <span className="text-xs text-slate-500">Click to view offers</span>
          </div>

          <div className="space-y-3">
            {rentalRequests.map((req) => {
              const isSelected = selectedRequestForOffers?.id === req.id;
              const offers = supplierOffers.filter((o) => o.requestId === req.id);

              return (
                <div
                  key={req.id}
                  onClick={() => setSelectedRequestForOffers(req)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-600/10'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                      {req.categoryName}
                    </span>
                    <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                      Budget: ₹{req.budgetInr}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 leading-snug">{req.title}</h4>

                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <div className="flex items-center gap-1 font-medium text-blue-700">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{req.ahmedabadArea}</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{req.neededDate}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px]">
                      By {req.userName}
                    </span>
                    <span className="font-bold text-blue-600 flex items-center gap-1">
                      <span>{offers.length} offers</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Request Details & Supplier Offers (7 cols) */}
        <div className="lg:col-span-7">
          {selectedRequestForOffers ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
              {/* Selected Request Header */}
              <div className="space-y-3 pb-6 border-b border-slate-100">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Request Details
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Status: {selectedRequestForOffers.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {selectedRequestForOffers.title}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Location</span>
                    <span className="font-bold text-slate-800">{selectedRequestForOffers.ahmedabadArea}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Date</span>
                    <span className="font-bold text-slate-800">{selectedRequestForOffers.neededDate}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Time Slot</span>
                    <span className="font-bold text-slate-800">{selectedRequestForOffers.neededTime}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Budget</span>
                    <span className="font-black text-blue-700 text-sm">₹{selectedRequestForOffers.budgetInr}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 pt-1">
                  <strong>Renter Notes:</strong> {selectedRequestForOffers.notes}
                </div>
              </div>

              {/* Action for Suppliers */}
              <div className="flex items-center justify-between bg-blue-50 p-4 rounded-2xl border border-blue-200/80">
                <div>
                  <h5 className="font-bold text-xs text-blue-950">Are you a supplier with this item?</h5>
                  <p className="text-[11px] text-blue-700">Submit a competitive rental offer directly to the renter.</p>
                </div>
                <button
                  onClick={() => setShowOfferForm(!showOfferForm)}
                  className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition-colors shrink-0 cursor-pointer"
                >
                  {showOfferForm ? 'Cancel Offer' : 'Submit an Offer'}
                </button>
              </div>

              {/* Supplier Offer Form Drawer */}
              {showOfferForm && (
                <form
                  onSubmit={handleSendSupplierOffer}
                  className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4 animate-in fade-in"
                >
                  <h4 className="font-bold text-sm text-slate-900">Your Supplier Proposal</h4>

                  {offerSubmitted ? (
                    <div className="p-4 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold text-center">
                      Offer submitted successfully! The renter has been notified.
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Product / Model Offered *
                        </label>
                        <input
                          type="text"
                          value={offerProduct}
                          onChange={(e) => setOfferProduct(e.target.value)}
                          placeholder="e.g. Epson EB-E01 3300 Lumens + Cables"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Your Rental Price (₹) *
                          </label>
                          <input
                            type="number"
                            value={offerPrice}
                            onChange={(e) => setOfferPrice(parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white font-bold"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Security Deposit (₹)
                          </label>
                          <input
                            type="number"
                            value={offerDeposit}
                            onChange={(e) => setOfferDeposit(parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white font-bold"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Handover / Delivery Terms
                        </label>
                        <input
                          type="text"
                          value={offerDelivery}
                          onChange={(e) => setOfferDelivery(e.target.value)}
                          placeholder="Self pickup near Vastrapur or Free delivery"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
                      >
                        Send Offer to Renter
                      </button>
                    </>
                  )}
                </form>
              )}

              {/* Offers Comparison List */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900">
                  Offers Received from Suppliers ({currentRequestOffers.length})
                </h4>

                {currentRequestOffers.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    No supplier offers submitted for this request yet. Be the first supplier to submit a quote!
                  </div>
                ) : (
                  currentRequestOffers.map((off) => (
                    <div
                      key={off.id}
                      className="border border-slate-200 rounded-2xl p-4 bg-white space-y-3 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm text-slate-900">{off.supplierName}</span>
                            <span className="text-xs text-amber-500 font-bold">★ {off.supplierRating}</span>
                          </div>
                          <h5 className="text-xs font-semibold text-slate-700 mt-0.5">{off.productName}</h5>
                        </div>

                        <div className="text-right">
                          <span className="text-lg font-black text-blue-700">₹{off.offeredPrice}</span>
                          <span className="text-[10px] text-slate-400 block">Deposit: ₹{off.securityDeposit}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                        {off.notes}
                      </p>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-slate-500 text-[11px]">{off.deliveryOption}</span>

                        {off.status === 'accepted' ? (
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">
                            ✓ Accepted & Booked
                          </span>
                        ) : (
                          <button
                            onClick={() => acceptSupplierOffer(off.id)}
                            className="py-1.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                          >
                            Accept & Rent
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">
              Select a request from the left list to review its details and supplier bids.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
