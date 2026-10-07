import React from 'react';

interface RentlyoLogoProps {
  variant?: 'light' | 'dark' | 'white';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const RentlyoLogo: React.FC<RentlyoLogoProps> = ({
  variant = 'dark',
  showTagline = false,
  size = 'md',
  className = '',
}) => {
  // Dimensions
  const iconSizes = {
    sm: { w: 32, h: 32, text: 'text-lg', subText: 'text-[9px]' },
    md: { w: 40, h: 40, text: 'text-2xl', subText: 'text-[11px]' },
    lg: { w: 52, h: 52, text: 'text-3xl', subText: 'text-[13px]' },
    xl: { w: 68, h: 68, text: 'text-4xl', subText: 'text-[15px]' },
  };

  const { w, h, text, subText } = iconSizes[size];

  const textColor =
    variant === 'white' ? 'text-white' : variant === 'light' ? 'text-white' : 'text-slate-900';
  const taglineColor =
    variant === 'white' ? 'text-blue-100/90' : variant === 'light' ? 'text-slate-300' : 'text-slate-600';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Vector SVG Logo Icon based on Rentlyo Branding Board */}
      <svg
        width={w}
        height={h}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform hover:scale-105 duration-200"
      >
        <defs>
          <linearGradient id="rentlyoBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#93C5FD" />
          </linearGradient>
        </defs>

        {/* Outer stylized 'R' body with circular curvature */}
        <path
          d="M 18 12 
             C 18 12, 54 12, 68 12 
             C 82 12, 92 22, 92 36 
             C 92 48, 83 56, 72 59 
             L 88 88 
             L 70 88 
             L 56 62 
             L 34 62 
             L 34 88 
             L 18 88 
             Z"
          fill="url(#rentlyoBlueGrad)"
        />

        {/* Counter loop cut / curved arrow circulation path */}
        <path
          d="M 34 26 
             L 58 26 
             C 68 26, 74 31, 74 38 
             C 74 45, 68 50, 58 50 
             L 34 50 
             Z"
          fill={variant === 'white' ? '#0F172A' : '#FFFFFF'}
        />

        {/* Flow arrow inside top arch */}
        <path
          d="M 40 38 
             C 42 32, 48 30, 54 30 
             L 54 26 
             L 64 34 
             L 54 42 
             L 54 38 
             C 50 38, 44 40, 42 44 
             Z"
          fill="#1D4ED8"
        />

        {/* Return flow arrow arc on bottom stem */}
        <path
          d="M 28 44 
             C 24 50, 24 58, 28 66 
             L 24 66 
             L 30 76 
             L 36 66 
             L 32 66 
             C 29 60, 29 52, 33 46 
             Z"
          fill="#3B82F6"
        />

        {/* Ahmedabad location marker pin inside the logo */}
        <g transform="translate(14, 52) scale(0.38)">
          <path
            d="M 25 0 
               C 11.2 0, 0 11.2, 0 25 
               C 0 42, 25 65, 25 65 
               C 25 65, 50 42, 50 25 
               C 50 11.2, 38.8 0, 25 0 
               Z"
            fill={variant === 'white' ? '#FFFFFF' : '#1D4ED8'}
          />
          <circle cx="25" cy="22" r="8" fill={variant === 'white' ? '#1D4ED8' : '#FFFFFF'} />
        </g>
      </svg>

      {/* Brand Name & Tagline */}
      <div className="flex flex-col leading-tight">
        <div className={`font-black tracking-tight ${text} ${textColor} flex items-baseline`}>
          <span>Rent</span>
          <span className="text-blue-600">lyo</span>
        </div>
        {showTagline && (
          <p className={`font-medium tracking-normal ${subText} ${taglineColor}`}>
            Rent what you need. Earn from what you don't use.
          </p>
        )}
      </div>
    </div>
  );
};
