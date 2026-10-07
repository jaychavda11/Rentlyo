import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import {
  X,
  MapPin,
  Star,
  ShieldCheck,
  Clock,
  Calendar,
  Heart,
  CheckCircle2,
  Share2,
  AlertCircle,
  Truck,
  Building2,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onRentClick: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRentClick,
}) => {
  const { wishlistIds, toggleWishlist, getProductDistance } = useApp();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) return null;

  const isFavorited = wishlistIds.includes(product.id);
  const distance = getProductDistance(product.ahmedabadArea);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>{product.categoryName}</span>
            <span>·</span>
            <span>{product.subcategoryId}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors text-xs flex items-center gap-1"
              title="Share rental link"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink && <span className="text-emerald-600 font-bold">Copied!</span>}
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-2 rounded-lg transition-colors ${
                isFavorited
                  ? 'text-rose-600 bg-rose-50'
                  : 'text-slate-500 hover:text-rose-600 hover:bg-slate-200/60'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Gallery */}
            <div className="space-y-3">
              <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-100 relative shadow-inner">
                <img
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {product.campaignBadge && (
                  <div className="absolute top-3 left-3 bg-rose-600 text-white text-[11px] font-black tracking-wider uppercase px-2.5 py-1 rounded-md shadow-md">
                    {product.campaignBadge} {product.discountPercent ? `· ${product.discountPercent}% OFF` : ''}
                  </div>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIdx === idx ? 'border-blue-600 shadow-xs' : 'border-slate-200 opacity-70'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Handover & Delivery info */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 text-xs text-slate-700 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Handover: {product.handoverMethod}</span>
                </div>
                <p className="text-slate-500">
                  Self-pickup available in {product.ahmedabadArea}. Optional doorstep delivery available across Ahmedabad radius.
                </p>
              </div>
            </div>

            {/* Product Details & Pricing */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  {product.title}
                </h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400 font-normal">({product.reviewCount} reviews)</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1 text-blue-700 font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{product.ahmedabadArea}, Ahmedabad</span>
                    <span className="text-slate-400 font-normal">({distance} km away)</span>
                  </div>
                </div>
              </div>

              {/* Pricing Cards */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/70">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Hourly Rental
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-blue-800">₹{product.hourlyPrice}</span>
                    <span className="text-xs text-slate-600">/hour</span>
                  </div>
                  <span className="text-[11px] text-slate-500 block">
                    Min {product.minRentalHours} hours
                  </span>
                </div>

                <div className="space-y-0.5 border-l border-blue-200 pl-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Daily Rental
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-slate-900">₹{product.dailyPrice}</span>
                    <span className="text-xs text-slate-600">/day</span>
                    {product.originalDailyPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{product.originalDailyPrice}
                      </span>
                    )}
                  </div>
                  {product.weeklyPrice && (
                    <span className="text-[11px] text-emerald-700 font-semibold block">
                      Weekly: ₹{product.weeklyPrice}/wk
                    </span>
                  )}
                </div>
              </div>

              {/* Deposit clarification */}
              <div className="flex items-center justify-between text-xs bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900">Refundable Security Deposit:</span>{' '}
                    <span className="font-black text-slate-900">₹{product.securityDeposit}</span>
                    <p className="text-[11px] text-slate-500">
                      Tracked separately in escrow. 100% refunded after safe return inspection.
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Supplier Profile (No private street address exposed!) */}
              <div className="border border-slate-200 rounded-xl p-3.5 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-slate-900">{product.supplierName}</span>
                        {product.supplierVerified && (
                          <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3 text-blue-600" />
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500">
                        {product.ahmedabadArea}, Ahmedabad · ★ {product.supplierRating} ({product.supplierReviewCount} rentals)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onRentClick(product);
                  }}
                  className="flex-1 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Rent Now</span>
                </button>
              </div>
            </div>
          </div>

          {/* Product Description & Features */}
          <div className="border-t border-slate-100 pt-6 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">About this Item</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{product.description}</p>
            </div>

            {product.features && product.features.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Key Inclusions & Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {product.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.specs && (
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Technical Specifications</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="p-2.5 rounded-lg border border-slate-200 bg-white">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase block">{k}</span>
                      <span className="font-bold text-slate-800">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
