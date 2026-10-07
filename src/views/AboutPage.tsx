import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, Award, ShieldCheck, MapPin, Phone, Mail, ArrowRight, Target } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Our Story & Vision
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          About Rentlyo
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Rentlyo is an Ahmedabad-first rental marketplace created to make temporary access to useful products easier and more affordable. Instead of buying products that may only be needed for a few hours or days, users can discover and rent products from nearby suppliers.
        </p>
      </div>

      {/* Core Philosophy Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
          Our Guiding Philosophy
        </span>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
          "Rent what you need. Earn from what you don't use."
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Rentlyo allows individuals and businesses across Ahmedabad to list their unused products and generate reliable income while saving renters up to 90% of ownership costs.
        </p>
      </div>

      {/* 28. Dedicated Founders Section */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Leadership</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Meet the Founders</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Passionate entrepreneurs driving Ahmedabad's circular shared economy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Jay Chavda */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xl hover:border-blue-300 transition-all p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center text-xl font-black shadow-md">
                JC
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Jay Chavda</h3>
                <div className="text-xs font-bold text-blue-600">Founder</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  MBA Marketing · <span className="font-semibold text-slate-700">Roll No.: 5102</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-600">
              <span className="font-bold text-slate-800 uppercase text-[11px] block">Key Focus Areas:</span>
              <p className="leading-relaxed">
                Digital marketing, business development, marketplace growth and customer acquisition across Ahmedabad.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-500">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>jay.bizconnect@gmail.com</span>
            </div>
          </div>

          {/* Dheeraj Kumar */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xl hover:border-blue-300 transition-all p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-slate-800 text-white flex items-center justify-center text-xl font-black shadow-md">
                DK
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Dheeraj Kumar</h3>
                <div className="text-xs font-bold text-blue-600">Co-Founder</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  MBA · <span className="font-semibold text-slate-700">Roll No.: 5111</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-600">
              <span className="font-bold text-slate-800 uppercase text-[11px] block">Key Focus Areas:</span>
              <p className="leading-relaxed">
                Business operations, supplier marketplace coordination and technical platform development.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-500">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Ahmedabad, Gujarat, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Why Ahmedabad First? */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-12 space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Strategic Choice</span>
        <h3 className="text-2xl font-black text-slate-900">Why Ahmedabad First?</h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          Ahmedabad is one of India's fastest-growing commercial and educational hubs with thriving student, creative, and startup communities in Navrangpura, Vastrapur, Satellite, and Prahlad Nagar. By deeply focusing on Ahmedabad's dense neighborhood fabric first, Rentlyo delivers hyper-local proximity and verified community trust before expanding to Mumbai, Pune, Delhi NCR, Bengaluru, and Hyderabad.
        </p>
      </div>
    </div>
  );
};
