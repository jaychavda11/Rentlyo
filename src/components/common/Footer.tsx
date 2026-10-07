import React from 'react';
import { useApp } from '../../context/AppContext';
import { RentlyoLogo } from './RentlyoLogo';
import { MapPin, Phone, Mail, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, setOpenLocationModal } = useApp();

  const handleNav = (view: string) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <RentlyoLogo variant="white" size="lg" showTagline={true} />
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Ahmedabad-first peer-to-peer and local-business rental marketplace. Rent what you need from nearby suppliers in Vastrapur, Satellite, Navrangpura, and across Ahmedabad. Or monetize items you don't use daily.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Ahmedabad, Gujarat, India</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="tel:9824884860" className="hover:text-white transition-colors">
                  +91 9824884860
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:jay.bizconnect@gmail.com" className="hover:text-white transition-colors">
                  jay.bizconnect@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Explore Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Explore</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('browse')} className="hover:text-blue-400 transition-colors">
                  Browse Rentals
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('categories')} className="hover:text-blue-400 transition-colors">
                  All Categories
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('requests')} className="hover:text-blue-400 transition-colors">
                  Rental Requests
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('offers')} className="hover:text-blue-400 transition-colors">
                  Offers & Campaigns
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('how-it-works')} className="hover:text-blue-400 transition-colors">
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Earn / Suppliers Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Earn With Us</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('become-supplier')} className="hover:text-blue-400 transition-colors">
                  Become a Supplier
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('supplier-dashboard')} className="hover:text-blue-400 transition-colors">
                  Supplier Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('supplier-policy')} className="hover:text-blue-400 transition-colors">
                  Supplier Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-blue-400 transition-colors">
                  Meet the Founders
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-blue-400 transition-colors">
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Legal & Policies</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('privacy-policy')} className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('terms')} className="hover:text-blue-400 transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('refund-policy')} className="hover:text-blue-400 transition-colors">
                  Refund Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('cancellation-policy')} className="hover:text-blue-400 transition-colors">
                  Cancellation Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('rental-policy')} className="hover:text-blue-400 transition-colors">
                  Rental & Deposit Rules
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('prohibited-items')} className="hover:text-blue-400 transition-colors">
                  Prohibited Products
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Ahmedabad Locality Footer Matrix */}
        <div className="border-t border-slate-900 pt-8 pb-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <span className="font-semibold text-slate-400">
              📍 Active Rental Hubs across Ahmedabad, Gujarat:
            </span>
            <button
              onClick={() => setOpenLocationModal(true)}
              className="text-blue-400 hover:underline text-left"
            >
              Change Area / Join Other Cities Waitlist →
            </button>
          </div>
          <p className="leading-relaxed">
            Vastrapur · Bodakdev · Satellite · Thaltej · Prahlad Nagar · Navrangpura · C.G. Road · Ashram Road · Paldi · Ellis Bridge · Usmanpura · Naranpura · Bopal · South Bopal · Ambli · Gota · Sola · Chandkheda · Motera · Sabarmati · Maninagar · Nikol · Vastral · Bapunagar · Juhapura · Sarkhej
          </p>
          <div className="mt-3 flex items-center gap-2 text-slate-400">
            <span className="font-semibold">Future Expansion Cities:</span>
            <span>Mumbai · Pune · Delhi NCR · Bengaluru · Hyderabad (Coming Soon)</span>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <div className="flex items-center gap-2">
            <span>© 2026 Rentlyo. All rights reserved.</span>
            <span>·</span>
            <span>Ahmedabad, Gujarat</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Founders: Jay Chavda & Dheeraj Kumar</span>
            <span>·</span>
            <div className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Escrow Deposit Protection</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
