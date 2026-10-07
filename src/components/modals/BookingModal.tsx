import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { X, Calendar, Clock, ShieldCheck, MapPin, CheckCircle, CreditCard, ArrowRight, AlertCircle, Mail, Phone, User, Store } from 'lucide-react';

interface BookingModalProps {
  product: Product | null;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ product, onClose }) => {
  const { createBooking, setActiveView, currentUser, setOpenEmailInboxModal } = useApp();

  const [rentalType, setRentalType] = useState<'hourly' | 'daily'>('daily');
  const [durationUnits, setDurationUnits] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>('2026-10-10');
  const [startTime, setStartTime] = useState<string>('10:00 AM');
  const [handoverType, setHandoverType] = useState<'self_pickup' | 'delivery'>('self_pickup');
  const [renterName, setRenterName] = useState<string>(currentUser?.name || 'Rohan Mehra');
  const [renterPhone, setRenterPhone] = useState<string>(currentUser?.phone || '9825012345');
  const [renterEmail, setRenterEmail] = useState<string>(currentUser?.email || 'rohan.mehra@gmail.com');
  const [paymentMethod, setPaymentMethod] = useState<string>('UPI (GPay / PhonePe)');

  const [bookingSuccess, setBookingSuccess] = useState<any | null>(null);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.name) setRenterName(currentUser.name);
      if (currentUser.phone) setRenterPhone(currentUser.phone);
      if (currentUser.email) setRenterEmail(currentUser.email);
    }
  }, [currentUser]);

  if (!product) return null;

  // Rate calculations
  const unitRate = rentalType === 'hourly' ? product.hourlyPrice : product.dailyPrice;
  const rentalFee = unitRate * durationUnits;
  const deposit = product.securityDeposit;
  const totalPayable = rentalFee + deposit + (handoverType === 'delivery' ? 80 : 0);
  const platformFee = Math.round(rentalFee * 0.15); // Platform 15% commission (included in rental fee)

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const endDate =
      rentalType === 'daily'
        ? `2026-10-${Math.min(28, 10 + durationUnits)}`
        : startDate;

    const newBooking = createBooking({
      productId: product.id,
      productTitle: product.title,
      productImage: product.images[0],
      categoryId: product.categoryId,
      renterId: currentUser?.id || 'user-renter-demo',
      renterName,
      renterPhone,
      renterEmail,
      supplierId: product.supplierId,
      supplierName: product.supplierName,
      supplierEmail: product.supplierEmail || 'ghanshymchavda3@gmail.com',
      ahmedabadArea: product.ahmedabadArea,
      rentalDurationType: rentalType,
      rentalUnits: durationUnits,
      startDate,
      startTime,
      endDate,
      rentalFee,
      securityDeposit: deposit,
      platformFee,
      totalPaid: totalPayable,
      paymentMethod,
    });

    setBookingSuccess(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">
              Verified Rental Request
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate max-w-md">
              {product.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6">
          {bookingSuccess ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-9 h-9" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-900">Rental Request Sent!</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Reservation ID: <span className="font-bold text-slate-900">{bookingSuccess.id}</span>
                </p>
                <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold rounded-full">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>Email notification sent to supplier ({bookingSuccess.supplierEmail})</span>
                </div>
              </div>

              {/* Security Card with OTP */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 text-left max-w-md mx-auto space-y-3">
                <div className="flex items-center justify-between text-blue-900 font-bold text-xs">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>Rentlyo Secure Handover OTP</span>
                  </div>
                  <span className="text-[10px] bg-blue-200/70 text-blue-900 px-2 py-0.5 rounded-md">
                    Escrow Protected
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-white p-3 rounded-xl border border-blue-200 shadow-2xs">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                      Handover OTP
                    </span>
                    <span className="text-2xl font-black text-blue-700 tracking-widest font-mono">
                      {bookingSuccess.handoverOtp}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Share with host at item pickup</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-blue-200 shadow-2xs">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                      Return OTP
                    </span>
                    <span className="text-2xl font-black text-emerald-700 tracking-widest font-mono">
                      {bookingSuccess.returnOtp}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Share at return for deposit refund</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  📍 Handover location: <strong className="text-slate-800">{product.ahmedabadArea}, Ahmedabad</strong>.<br />
                  Host <strong className="text-slate-800">{product.supplierName}</strong> has received your rental request in their Supplier Dashboard!
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 justify-center pt-3">
                <button
                  onClick={() => {
                    onClose();
                    setActiveView('supplier-dashboard');
                  }}
                  className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Store className="w-3.5 h-3.5 text-blue-400" />
                  <span>Check Request in Supplier Dashboard</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    setOpenEmailInboxModal(true);
                  }}
                  className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>View Dispatched Emails</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    setActiveView('renter-dashboard');
                  }}
                  className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
                >
                  My Rentals Dashboard
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleConfirmBooking} className="space-y-4">
              {/* Product preview bar */}
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-slate-900 truncate">{product.title}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{product.ahmedabadArea}, Ahmedabad</span>
                    <span>·</span>
                    <span>Host: <strong className="text-slate-800">{product.supplierName}</strong></span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-black text-slate-900">₹{product.dailyPrice}/day</div>
                  <div className="text-[10px] text-slate-400">Deposit: ₹{product.securityDeposit}</div>
                </div>
              </div>

              {/* Rental Duration Mode Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Rental Duration Type
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setRentalType('hourly');
                      setDurationUnits(4);
                    }}
                    className={`py-2 px-3 rounded-xl border font-bold transition-all cursor-pointer ${
                      rentalType === 'hourly'
                        ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600/10'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Hourly (₹{product.hourlyPrice}/hr)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRentalType('daily');
                      setDurationUnits(1);
                    }}
                    className={`py-2 px-3 rounded-xl border font-bold transition-all cursor-pointer ${
                      rentalType === 'daily'
                        ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600/10'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Daily (₹{product.dailyPrice}/day)
                  </button>
                </div>
              </div>

              {/* Units & Start Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Duration ({rentalType === 'hourly' ? 'Hours' : 'Days'})
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={rentalType === 'hourly' ? 24 : 30}
                    value={durationUnits}
                    onChange={(e) => setDurationUnits(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Rental Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white"
                  />
                </div>
              </div>

              {/* Handover Preference */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Item Handover Preference
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setHandoverType('self_pickup')}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-colors ${
                      handoverType === 'self_pickup'
                        ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>Self Pickup</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Pickup in {product.ahmedabadArea} (Free)
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHandoverType('delivery')}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-colors ${
                      handoverType === 'delivery'
                        ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>Doorstep Delivery</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Ahmedabad delivery radius (+₹80)
                    </div>
                  </button>
                </div>
              </div>

              {/* Renter Contact Info & Email Notification target */}
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Renter Details (Saved in Email)</span>
                  <span className="text-[10px] text-slate-400">Supplier will receive these</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div>
                    <input
                      type="text"
                      value={renterName}
                      onChange={(e) => setRenterName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      value={renterPhone}
                      onChange={(e) => setRenterPhone(e.target.value)}
                      placeholder="Phone"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      value={renterEmail}
                      onChange={(e) => setRenterEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Transparent Price & Deposit Breakdown */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 space-y-2 text-xs">
                <div className="flex justify-between text-slate-700">
                  <span>
                    Rental Charge ({durationUnits} {rentalType === 'hourly' ? 'hours' : 'days'} @ ₹{unitRate}/
                    {rentalType === 'hourly' ? 'hr' : 'day'})
                  </span>
                  <span className="font-bold text-slate-900">₹{rentalFee}</span>
                </div>

                <div className="flex justify-between text-slate-700">
                  <div className="flex items-center gap-1">
                    <span>Refundable Security Deposit</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="font-bold text-slate-900">₹{deposit}</span>
                </div>

                {handoverType === 'delivery' && (
                  <div className="flex justify-between text-slate-700">
                    <span>Local Ahmedabad Delivery</span>
                    <span className="font-bold text-slate-900">₹80</span>
                  </div>
                )}

                <div className="border-t border-slate-200 pt-2 flex justify-between items-baseline text-sm font-bold text-slate-900">
                  <span>Total Payable</span>
                  <span className="text-lg text-blue-700 font-black">
                    ₹{totalPayable}
                  </span>
                </div>

                <div className="flex items-start gap-1.5 text-[11px] text-slate-500 pt-1">
                  <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    Deposit is held safely in escrow. Upon return & inspection, it is refunded immediately.
                  </span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Payment Method
                </label>
                <div className="flex gap-2">
                  {['UPI (GPay / PhonePe)', 'Credit / Debit Card', 'Net Banking'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`text-xs px-2.5 py-1.5 rounded-xl border font-semibold transition-colors cursor-pointer ${
                        paymentMethod === method
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm & Send Rental Request (₹{totalPayable})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
