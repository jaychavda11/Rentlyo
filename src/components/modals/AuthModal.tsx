import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AHMEDABAD_AREAS } from '../../data/constants';
import { UserRole } from '../../types';
import { X, Check, ShieldCheck, Store, Compass, ArrowRight, Upload, Image as ImageIcon, Phone, Mail, User, Lock, Building2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    openAuthModal,
    setOpenAuthModal,
    authModalMode,
    setAuthModalMode,
    login,
    signup,
    setActiveView,
  } = useApp();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('9824884860');
  const [selectedRole, setSelectedRole] = useState<UserRole>('supplier');
  const [selectedArea, setSelectedArea] = useState('Vastrapur');
  const [businessName, setBusinessName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  );
  const [customImageUploaded, setCustomImageUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!openAuthModal) return null;

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
    if (authModalMode === 'signin') {
      const res = login(googleEmail, 'google_oauth_pass');
      setSuccessMessage(`Signed in as ${googleName} via Google!`);
      setTimeout(() => {
        setSuccessMessage(null);
        setOpenAuthModal(false);
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
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      });
      setSuccessMessage(`Account created for ${googleName} as ${selectedRole.toUpperCase()}! Email sent.`);
      setTimeout(() => {
        setSuccessMessage(null);
        setOpenAuthModal(false);
        if (selectedRole === 'supplier') {
          setActiveView('supplier-dashboard');
        } else {
          setActiveView('renter-dashboard');
        }
      }, 1200);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email) {
      setErrorMessage('Please enter an email address.');
      return;
    }

    if (authModalMode === 'signin') {
      const res = login(email, password);
      if (res.success && res.user) {
        setSuccessMessage(`Welcome back, ${res.user?.name || email}!`);
        setTimeout(() => {
          setSuccessMessage(null);
          setOpenAuthModal(false);
          if (res.user?.role === 'supplier') {
            setActiveView('supplier-dashboard');
          } else {
            setActiveView('renter-dashboard');
          }
        }, 1000);
      } else {
        setErrorMessage(res.message || 'Unable to sign in. Please try again.');
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

      setSuccessMessage(`Welcome to Rentlyo! Your ${selectedRole.toUpperCase()} account is ready. Redirecting...`);
      setTimeout(() => {
        setSuccessMessage(null);
        setOpenAuthModal(false);
        if (selectedRole === 'supplier') {
          setActiveView('supplier-dashboard');
        } else {
          setActiveView('renter-dashboard');
        }
      }, 1200);
    }
  };

  const avatarOptions = [
    { label: 'Host 1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
    { label: 'Host 2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
    { label: 'Host 3', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
    { label: 'Host 4', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={() => {
            setErrorMessage(null);
            setSuccessMessage(null);
            setOpenAuthModal(false);
          }}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Icon */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-700 to-blue-600 flex items-center justify-center text-white shadow-md mb-4">
          <svg
            width="28"
            height="28"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 22 16 C 22 16, 52 16, 66 16 C 78 16, 88 24, 88 38 C 88 50, 78 58, 68 60 L 84 88 L 68 88 L 54 62 L 36 62 L 36 88 L 22 88 Z"
              fill="white"
            />
            <path
              d="M 36 30 L 58 30 C 66 30, 72 34, 72 42 C 72 48, 66 52, 58 52 L 36 52 Z"
              fill="#2563EB"
            />
          </svg>
        </div>

        {/* Heading */}
        <div className="space-y-1 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {authModalMode === 'signin' ? 'Welcome back to Rentlyo' : 'Join Rentlyo Ahmedabad'}
          </h2>
          <p className="text-xs text-slate-500 font-normal">
            {authModalMode === 'signin'
              ? 'Sign in to access your dashboard and manage rentals.'
              : 'Sign up to rent gear or list your own items and earn.'}
          </p>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold p-3 rounded-xl flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold p-3 rounded-xl">
            {errorMessage}
          </div>
        )}

        {/* Continue with Google button */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-3 cursor-pointer shadow-2xs mb-4"
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
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="bg-white px-3 text-[10px] text-slate-400 font-medium absolute">or</span>
        </div>

        {/* Form fields */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Sign Up extra fields */}
          {authModalMode === 'signup' && (
            <>
              {/* Role Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  I want to join Rentlyo as: <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('supplier')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedRole === 'supplier'
                        ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-600/10'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <Store className="w-3.5 h-3.5 text-blue-600" />
                      <span>Supplier / Host</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      List products, earn, receive rental requests
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('renter')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedRole === 'renter'
                        ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-600/10'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <Compass className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Renter</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Rent useful items in Ahmedabad
                    </p>
                  </button>
                </div>
              </div>

              {/* Profile Image with upload + presets */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">Profile Image</label>
                  <label className="text-[10px] text-blue-600 hover:underline font-bold cursor-pointer flex items-center gap-1">
                    <Upload className="w-3 h-3" />
                    <span>Upload Image</span>
                    <input type="file" accept="image/*" onChange={handleImageFileUpload} className="hidden" />
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={avatarUrl}
                    alt="Preview"
                    className="w-11 h-11 rounded-full object-cover border-2 border-blue-600 shadow-xs shrink-0"
                  />
                  <div className="flex gap-1.5 overflow-x-auto">
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
                            : 'border-slate-200 opacity-60'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ghanshyam Chavda"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-600 bg-white"
                  required
                />
              </div>

              {/* Locality & Phone */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ahmedabad Area
                  </label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800"
                  >
                    {AHMEDABAD_AREAS.map((a) => (
                      <option key={a.id} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9824884860"
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-600 bg-white"
                  />
                </div>
              </div>

              {/* Business Name if Supplier */}
              {selectedRole === 'supplier' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Store / Brand Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Apex Equipment Rentals Ahmedabad"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              )}
            </>
          )}

          {/* Email input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. ghanshymchavda3@gmail.com"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-600 bg-white"
              required
            />
          </div>

          {/* Password input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password <span className="text-rose-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-600 bg-white"
              required
            />
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer mt-2 flex items-center justify-center gap-1.5"
          >
            <span>{authModalMode === 'signin' ? 'Sign in' : `Create Account as ${selectedRole === 'supplier' ? 'Supplier' : 'Renter'}`}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Footer switch links */}
        <div className="text-center pt-4 text-xs">
          {authModalMode === 'signin' ? (
            <p className="text-slate-600">
              New to Rentlyo?{' '}
              <button
                type="button"
                onClick={() => {
                  setErrorMessage(null);
                  setAuthModalMode('signup');
                }}
                className="font-bold text-blue-700 hover:underline cursor-pointer"
              >
                Create an account
              </button>
            </p>
          ) : (
            <p className="text-slate-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setErrorMessage(null);
                  setAuthModalMode('signin');
                }}
                className="font-bold text-blue-700 hover:underline cursor-pointer"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
