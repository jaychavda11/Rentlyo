import React from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { MapPin, Star, ShieldCheck, Heart, Clock, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onRentNow?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onRentNow,
}) => {
  const { wishlistIds, toggleWishlist, getProductDistance } = useApp();
  const isWishlisted = wishlistIds.includes(product.id);
  const distance = getProductDistance(product.ahmedabadArea);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Image & Badges */}
        <div className="relative aspect-4/3 overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onSelect(product)}>
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Campaign Offer Badge */}
          {product.campaignBadge && (
            <div className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md">
              {product.campaignBadge} {product.discountPercent ? `· ${product.discountPercent}% OFF` : ''}
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isWishlisted
                ? 'bg-rose-50 text-rose-600 shadow-md'
                : 'bg-white/90 text-slate-600 hover:text-rose-600 hover:bg-white shadow-xs'
            }`}
            title="Save item"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          {/* Supplier verification chip */}
          {product.supplierVerified && (
            <div className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Verified Supplier</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-2.5 cursor-pointer" onClick={() => onSelect(product)}>
          {/* Category & Availability */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span className="truncate max-w-[150px]">{product.categoryName}</span>
            <span className="flex items-center gap-1 text-emerald-600 font-semibold shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Available
            </span>
          </div>

          {/* Product Title */}
          <h4 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
            {product.title}
          </h4>

          {/* Rating & Distance */}
          <div className="flex items-center justify-between text-xs text-slate-600 pt-0.5">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-900">{product.rating}</span>
              <span className="text-slate-400">({product.reviewCount})</span>
            </div>

            <div className="flex items-center gap-1 text-blue-700 font-medium">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate max-w-[120px]">{product.ahmedabadArea}</span>
              <span className="text-slate-400">· {distance} km</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing & Footer Actions */}
      <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50/40">
        <div className="flex items-baseline justify-between mb-3">
          {/* Daily Price & Hourly */}
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-black text-slate-900">₹{product.dailyPrice}</span>
              <span className="text-[11px] text-slate-500">/day</span>
              {product.originalDailyPrice && (
                <span className="text-[11px] text-slate-400 line-through ml-1">
                  ₹{product.originalDailyPrice}
                </span>
              )}
            </div>
            <div className="text-[10px] text-slate-500 flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 text-blue-500" />
              <span>₹{product.hourlyPrice}/hr</span>
              <span>·</span>
              <span>Deposit ₹{product.securityDeposit}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onSelect(product)}
            className="w-full py-2 px-2.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
          >
            Details
          </button>
          <button
            onClick={() => {
              if (onRentNow) {
                onRentNow(product);
              } else {
                onSelect(product);
              }
            }}
            className="w-full py-2 px-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-2xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Rent Now</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
