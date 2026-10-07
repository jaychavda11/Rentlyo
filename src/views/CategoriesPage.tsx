import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/constants';
import {
  Sparkles,
  ArrowRight,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { setSelectedCategoryId, setSearchQuery, setActiveView, products } = useApp();

  const handleSelectCategory = (catId: string) => {
    setSelectedCategoryId(catId);
    setSearchQuery('');
    setActiveView('browse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubcategoryClick = (catId: string, subName: string) => {
    setSelectedCategoryId(catId);
    setSearchQuery(subName);
    setActiveView('browse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200">
          <Layers className="w-3.5 h-3.5" />
          <span>Complete Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Explore Rental Categories
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          From professional cinematography rigs and party sound systems to DIY power tools and camping gear across Ahmedabad.
        </p>
      </div>

      {/* 12 Categories Rich Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES.map((cat) => {
          const availableCount = products.filter((p) => p.categoryId === cat.id).length;

          return (
            <div
              key={cat.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Category Banner Image */}
                <div
                  className="aspect-16/9 overflow-hidden bg-slate-100 relative cursor-pointer"
                  onClick={() => handleSelectCategory(cat.id)}
                >
                  <img
                    src={cat.bannerImage}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent flex items-end p-5">
                    <div>
                      <h3 className="text-xl font-bold text-white leading-tight">
                        {cat.name}
                      </h3>
                      <span className="text-xs text-blue-200 font-medium">
                        {availableCount} verified listings in Ahmedabad
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="p-5 space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Subcategories Tags */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Popular Items in this Category:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.subcategories.map((sub, i) => (
                        <button
                          key={i}
                          onClick={() => handleSubcategoryClick(cat.id, sub)}
                          className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 px-2.5 py-1 rounded-md transition-colors border border-slate-200/60"
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => handleSelectCategory(cat.id)}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50 text-slate-800 hover:text-blue-700 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Browse {cat.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
