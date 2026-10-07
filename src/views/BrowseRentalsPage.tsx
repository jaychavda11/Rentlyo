import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { CATEGORIES, AHMEDABAD_AREAS } from '../data/constants';
import { Product } from '../types';
import {
  Search,
  Filter,
  MapPin,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

interface BrowseRentalsPageProps {
  onOpenBooking: (product: Product) => void;
  onOpenPostRequest: () => void;
}

export const BrowseRentalsPage: React.FC<BrowseRentalsPageProps> = ({
  onOpenBooking,
  onOpenPostRequest,
}) => {
  const {
    products,
    selectedCategoryId,
    setSelectedCategoryId,
    searchQuery,
    setSearchQuery,
    currentArea,
    setCurrentArea,
    setSelectedProduct,
    getProductDistance,
  } = useApp();

  const [selectedAreaFilter, setSelectedAreaFilter] = useState<string>('All');
  const [selectedZoneFilter, setSelectedZoneFilter] = useState<string>('All');
  const [maxDailyPrice, setMaxDailyPrice] = useState<number>(2000);
  const [onlyOffers, setOnlyOffers] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'distance' | 'price_low' | 'price_high' | 'rating'>('distance');
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false);

  // Filtered products logic
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // 1. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = prod.title.toLowerCase().includes(q);
        const matchesCategory = prod.categoryName.toLowerCase().includes(q);
        const matchesArea = prod.ahmedabadArea.toLowerCase().includes(q);
        const matchesSubcat = prod.subcategoryId.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCategory && !matchesArea && !matchesSubcat) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategoryId && prod.categoryId !== selectedCategoryId) {
        return false;
      }

      // 3. Ahmedabad Area filter
      if (selectedAreaFilter !== 'All' && prod.ahmedabadArea.toLowerCase() !== selectedAreaFilter.toLowerCase()) {
        return false;
      }

      // 4. Ahmedabad Zone filter
      if (selectedZoneFilter !== 'All' && prod.ahmedabadZone !== selectedZoneFilter) {
        return false;
      }

      // 5. Price filter
      if (prod.dailyPrice > maxDailyPrice) {
        return false;
      }

      // 6. Only offers
      if (onlyOffers && !prod.campaignBadge) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'distance') {
        return getProductDistance(a.ahmedabadArea) - getProductDistance(b.ahmedabadArea);
      }
      if (sortBy === 'price_low') {
        return a.dailyPrice - b.dailyPrice;
      }
      if (sortBy === 'price_high') {
        return b.dailyPrice - a.dailyPrice;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });
  }, [
    products,
    searchQuery,
    selectedCategoryId,
    selectedAreaFilter,
    selectedZoneFilter,
    maxDailyPrice,
    onlyOffers,
    sortBy,
    currentArea,
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategoryId(null);
    setSelectedAreaFilter('All');
    setSelectedZoneFilter('All');
    setMaxDailyPrice(2000);
    setOnlyOffers(false);
    setSortBy('distance');
  };

  const zones = ['All', 'West', 'Central', 'North', 'East', 'South'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Search & Header Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
              <MapPin className="w-3.5 h-3.5" />
              <span>Ahmedabad Rental Inventory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
              Browse Rentals in Ahmedabad
            </h1>
          </div>

          {/* Quick Active Locality Indicator */}
          <div className="flex items-center gap-2 text-xs bg-blue-50 px-3.5 py-2 rounded-xl text-blue-900 border border-blue-200/60 self-start md:self-auto">
            <span>Your reference location:</span>
            <strong className="text-blue-700">{currentArea}</strong>
            <span className="text-slate-400">· Distances computed automatically</span>
          </div>
        </div>

        {/* Global Search Input & Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name, category, or Ahmedabad area..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 bg-slate-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:ring-2 focus:ring-blue-600"
            >
              <option value="distance">Nearest to {currentArea} First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="lg:hidden px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar Filters */}
        <div className={`space-y-6 ${showFiltersMobile ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-blue-600" />
                <span>Filters</span>
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Navratri & Special Offers Toggle */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer bg-rose-50/70 p-3 rounded-xl border border-rose-200/80">
                <input
                  type="checkbox"
                  checked={onlyOffers}
                  onChange={(e) => setOnlyOffers(e.target.checked)}
                  className="w-4 h-4 text-rose-600 rounded-sm focus:ring-rose-500"
                />
                <div>
                  <span className="text-xs font-bold text-rose-900 block flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                    Special Festival Offers Only
                  </span>
                  <span className="text-[10px] text-rose-700">Navratri & 20% OFF items</span>
                </div>
              </label>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Category
              </span>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1 text-xs">
                <button
                  onClick={() => setSelectedCategoryId(null)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    selectedCategoryId === null
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>All Categories</span>
                  <span>{products.length}</span>
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategoryId === cat.id
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="text-slate-400 text-[11px] shrink-0 ml-1">
                      {products.filter((p) => p.categoryId === cat.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ahmedabad Zone Filter */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Ahmedabad Zone
              </span>
              <div className="flex flex-wrap gap-1">
                {zones.map((zone) => (
                  <button
                    key={zone}
                    onClick={() => setSelectedZoneFilter(zone)}
                    className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                      selectedZoneFilter === zone
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {zone}
                  </button>
                ))}
              </div>
            </div>

            {/* Ahmedabad Locality Filter */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Ahmedabad Locality
              </span>
              <select
                value={selectedAreaFilter}
                onChange={(e) => setSelectedAreaFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 bg-white"
              >
                <option value="All">All Ahmedabad Areas</option>
                {AHMEDABAD_AREAS.map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name} ({a.zone})
                  </option>
                ))}
              </select>
            </div>

            {/* Daily Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="font-bold text-slate-700">Max Daily Rate</span>
                <span className="font-black text-blue-600">₹{maxDailyPrice}/day</span>
              </div>
              <input
                type="range"
                min={150}
                max={2000}
                step={50}
                value={maxDailyPrice}
                onChange={(e) => setMaxDailyPrice(parseInt(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>₹150</span>
                <span>₹2,000+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Products Feed */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>
              Showing <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong> rental items available in Ahmedabad
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-900">No items found matching your filters</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try adjusting your search criteria, selecting a different Ahmedabad area, or post a rental request so nearby suppliers can find it for you!
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Reset Filters
                </button>
                <button
                  onClick={onOpenPostRequest}
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-md"
                >
                  Post a Rental Request
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onSelect={(p) => setSelectedProduct(p)}
                  onRentNow={(p) => onOpenBooking(p)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
