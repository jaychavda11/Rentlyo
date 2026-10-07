import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AHMEDABAD_AREAS } from '../data/constants';
import { UserRole } from '../types';
import { RentlyoLogo } from '../components/common/RentlyoLogo';
import {
  Store,
  Compass,
  Upload,
  CheckCircle2,
  ShieldCheck,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
  Building2,
  Image as ImageIcon,
} from 'lucide-react';

interface LoginPageProps {
  initialMode?: 'signin' | 'signup';
}

export const LoginPage: React.FC<LoginPageProps> = ({ initialMode = 'signin' }) => {
  const {
    login,
    signup,
    setActiveView,
    authModalMode,
    setAuthModalMode,
  } = useApp();

  const [mode, setMode] = useState<'signin' | 'signup'>(authModalMode || initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('9824884860');
  const [selectedRole, setSelectedRole] = useState<UserRole>('supplier');
  const [selectedArea, setSelectedArea] = useState('Vastrapur');
  const [businessName, setBusinessName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  );
  const [customImageUploaded, setCustomImageUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const avatarOptions = [
    { label: 'Host 1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
    { label: 'Host 2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
    { label: 'Host 3', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
    { label: 'Host 4', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80' },
    { label: 'Host 5', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80' },
  ];

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatarUrl(reader.result);
          setCustomImageUploaded(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGoogleAuth = () => {
    const googleEmail = 'ghanshymchavda3@gmail.com';
    const googleName = 'Ghanshyam Chavda';

    if (mode === 'signin') {
      const res = login(googleEmail, 'google_secure');
      setSuccessMessage(`Signed in as ${googleName} via Google!`);
      setTimeout(() => {
        if (res.user?.role === 'supplier') {
          setActiveView('supplier-dashboard');
        } else {
          setActiveView('renter-dashboard');
        }
      }, 1000);
    } else {
      signup({
        name: googleName,
        email: googleEmail,
        role: selectedRole,
        ahmedabadArea: selectedArea,
        phone: '9824884860',
        businessName: selectedRole === 'supplier' ? 'Ghanshyam Pro Rentals Ahmedabad' : undefined,
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      });
      setSuccessMessage(`Account created for ${googleName} as ${selectedRole}!`);
      setTimeout(() => {
        if (selectedRole === 'supplier') {
          setActiveView('supplier-dashboard');
        } else {
          setActiveView('renter-dashboard');
        }
      }, 1000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email) {
      setErrorMessage('Please enter an email address.');
      return;
    }

    if (mode === 'signin') {
      const res = login(email, password);
      if (res.success && res.user) {
        setSuccessMessage(`Welcome back, ${res.user.name}! Redirecting to your dashboard...`);
        setTimeout(() => {
          if (res.user?.role === 'supplier') {
            setActiveView('supplier-dashboard');
          } else {
            setActiveView('renter-dashboard');
          }
        }, 1000);
      } else {
        setErrorMessage(res.message || 'Unable to sign in. Please check your credentials.');
      }
    } else {
      if (!fullName) {
        setErrorMessage('Please enter your full name.');
        return;
      }

      const res = signup({
        name: fullName,
        email,
        password,
        phone,
        role: selectedRole,
        ahmedabadArea: selectedArea,
        businessName: selectedRole === 'supplier' ? businessName || `${fullName} Rentals Ahmedabad` : undefined,
        avatarUrl,
      });

      setSuccessMessage(`Account created successfully! Welcome to Rentlyo Ahmedabad as a ${selectedRole.toUpperCase()}. Confirmation email sent to ${email}.`);
      setTimeout(() => {
        if (selectedRole === 'supplier') {
          setActiveView('supplier-dashboard');
        } else {
          setActiveView('renter-dashboard');
        }
      }, 1200);
    }
  };

  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
        {/* Left Side: Brand Story & Perks */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <RentlyoLogo size="lg" variant="white" showTagline={true} />

            <div className="space-y-3 pt-6 border-t border-blue-600/40">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200 bg-blue-600/50 px-2.5 py-1 rounded-full inline-block">
                Ahmedabad-First Marketplace
              </span>
              <h3 className="text-xl sm:text-2xl font-black leading-tight text-white">
                Rent what you need. <br />
                Earn from what you don't use.
              </h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                Connect with verified local peers and stores in Vastrapur, Satellite, Navrangpura, and Bodakdev.
              </p>
            </div>

            <div className="space-y-3 pt-4 text-xs text-blue-100">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant 4-digit Handover OTP security</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automated email alerts for every booking request</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Escrow protected refundable security deposits</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dedicated dashboards for Renters & Suppliers</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-blue-600/40 text-[11px] text-blue-200 flex items-center justify-between">
            <span>Verified in Ahmedabad</span>
            <span>Helpline: +91 9824884860</span>
          </div>

          {/* Decorative background glow */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          {/* Tabs for Mode Switch */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setAuthModalMode('signin');
                  setErrorMessage(null);
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  mode === 'signin'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setAuthModalMode('signup');
                  setErrorMessage(null);
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Create Account
              </button>
            </div>

            <span className="text-[11px] text-slate-400 font-medium">
              {mode === 'signin' ? 'Existing member' : 'New to Rentlyo'}
            </span>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {mode === 'signin' ? 'Welcome back to Rentlyo' : 'Create your Rentlyo Account'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {mode === 'signin'
                ? 'Sign in to manage your active rentals, incoming requests, or earnings.'
                : 'Join as a Renter or Supplier in Ahmedabad. Save all account data with instant email confirmation.'}
            </p>
          </div>

          {/* Alerts */}
          {successMessage && (
            <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold p-3.5 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold p-3.5 rounded-xl">
              {errorMessage}
            </div>
          )}

          {/* 1-Click Google Auth */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-3 cursor-pointer shadow-2xs mb-5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google (ghanshymchavda3@gmail.com)</span>
          </button>

          <div className="relative flex items-center justify-center mb-5">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-[11px] text-slate-400 font-medium absolute">or continue with email</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <>
                {/* 1. ROLE SELECTION (CRITICAL REQUIREMENT) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Choose Your Role <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedRole('supplier')}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedRole === 'supplier'
                          ? 'border-blue-600 bg-blue-50/80 text-blue-900 ring-2 ring-blue-600/20 shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-black text-slate-900 text-xs">
                        <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                          <Store className="w-4 h-4" />
                        </div>
                        <span>Supplier / Host</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1.5 leading-snug">
                        List gear, earn income, receive rental requests & verify handover OTPs.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedRole('renter')}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedRole === 'renter'
                          ? 'border-blue-600 bg-blue-50/80 text-blue-900 ring-2 ring-blue-600/20 shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-black text-slate-900 text-xs">
                        <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                          <Compass className="w-4 h-4" />
                        </div>
                        <span>Renter</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1.5 leading-snug">
                        Rent cameras, tools, tech & sound gear from verified local neighbors.
                      </p>
                    </button>
                  </div>
                </div>

                {/* 2. PROFILE IMAGE UPLOAD & PRESET SELECTION (BASIC DETAILS) */}
                <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                      <span>Profile Image</span>
                    </label>
                    <span className="text-[10px] text-slate-400">Upload or choose avatar</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      <img
                        src={avatarUrl}
                        alt="Profile Preview"
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-600 shadow-sm"
                      />
                      {customImageUploaded && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px]">
                          ✓
                        </span>
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer py-1.5 px-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-[11px] font-bold text-slate-700 shadow-2xs flex items-center gap-1.5 transition-colors">
                          <Upload className="w-3.5 h-3.5 text-blue-600" />
                          <span>Upload Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileUpload}
                            className="hidden"
                          />
                        </label>
                        <span className="text-[10px] text-slate-400">or pick avatar:</span>
                      </div>

                      {/* Avatar preset pills */}
                      <div className="flex gap-1.5 overflow-x-auto py-1">
                        {avatarOptions.map((opt, i) => (
                          <img
                            key={i}
                            src={opt.url}
                            alt={opt.label}
                            onClick={() => {
                              setAvatarUrl(opt.url);
                              setCustomImageUploaded(false);
                            }}
                            className={`w-7 h-7 rounded-full object-cover cursor-pointer border-2 transition-all shrink-0 ${
                              avatarUrl === opt.url
                                ? 'border-blue-600 ring-2 ring-blue-600/30 scale-105'
                                : 'border-slate-200 opacity-60 hover:opacity-100'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. FULL NAME */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ghanshyam Chavda"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-600 bg-white"
                      required
                    />
                  </div>
                </div>

                {/* 4. AHMEDABAD LOCALITY & PHONE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Ahmedabad Area <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                      <select
                        value={selectedArea}
                        onChange={(e) => setSelectedArea(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-800"
                      >
                        {AHMEDABAD_AREAS.map((a) => (
                          <option key={a.id} value={a.name}>
                            {a.name} ({a.zone})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="9824884860"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-600 bg-white"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 5. STORE NAME (IF SUPPLIER) */}
                {selectedRole === 'supplier' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Store / Business Name (Optional)
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Apex Audio & Camera Hub Ahmedabad"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-600 bg-white"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* EMAIL */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. ghanshymchavda3@gmail.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-600 bg-white"
                  required
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                All booking requests, OTPs, and rental receipts will be saved and delivered here.
              </span>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-600 bg-white"
                  required
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <span>
                {mode === 'signin'
                  ? 'Sign In to Dashboard'
                  : `Create Account & Open ${selectedRole === 'supplier' ? 'Supplier' : 'Renter'} Dashboard`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Switcher helper */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
            <span>Quick Demo Accounts:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  login('ghanshymchavda3@gmail.com');
                  setActiveView('supplier-dashboard');
                }}
                className="text-blue-600 hover:underline font-bold"
              >
                Log in as Supplier
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => {
                  login('rohan.mehra@gmail.com');
                  setActiveView('renter-dashboard');
                }}
                className="text-emerald-600 hover:underline font-bold"
              >
                Log in as Renter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
