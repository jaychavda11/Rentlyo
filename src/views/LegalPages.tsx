import React from 'react';
import { ShieldCheck, AlertCircle, FileText, Scale, RefreshCw, XCircle } from 'lucide-react';

interface LegalPageProps {
  pageType:
    | 'privacy'
    | 'terms'
    | 'refund'
    | 'cancellation'
    | 'supplier-policy'
    | 'rental-policy'
    | 'prohibited'
    | 'how-it-works';
}

export const LegalPages: React.FC<LegalPageProps> = ({ pageType }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* 30. PRIVACY POLICY */}
      {pageType === 'privacy' && (
        <article className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-2xs space-y-6 text-xs text-slate-700 leading-relaxed">
          <div className="border-b border-slate-100 pb-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Legal Document</span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Rentlyo Privacy Policy</h1>
            <p className="text-slate-400 font-medium">Last Updated: October 2026 · Official Contact: jay.bizconnect@gmail.com</p>
          </div>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">1. Information We Collect</h3>
            <p>
              Rentlyo collects information to provide, maintain and improve our peer-to-peer and business rental marketplace in Ahmedabad. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Account & Profile Information:</strong> Name, email address, verified phone number.</li>
              <li><strong>Location Data:</strong> Ahmedabad area (e.g. Vastrapur, Satellite, Navrangpura) used to calculate nearby item distances and facilitate handovers. We never display your exact residential house number publicly.</li>
              <li><strong>Product & Listing Information:</strong> Photos, item specs, descriptions, availability, and pricing provided by suppliers.</li>
              <li><strong>Booking & Transaction Records:</strong> Rental dates, durations, handover OTP verification logs, and return confirmations.</li>
              <li><strong>Payment Information:</strong> Processed through secure external payment gateway providers. Rentlyo does not store raw credit card numbers or banking passwords.</li>
              <li><strong>Identity Verification:</strong> Basic government identity documents required solely to prevent fraud and protect high-value rental equipment.</li>
              <li><strong>Device & Cookies:</strong> Standard web analytics, browser type, and essential cookies for session authentication.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">2. How We Use Information</h3>
            <p>
              Information is utilized strictly to match nearby renters with suppliers in Ahmedabad, prevent unauthorized transactions, manage separate security deposit escrows, and provide customer support.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">3. Marketplace Communications & Privacy Protection</h3>
            <p>
              Direct contact details are only made accessible between the specific renter and supplier upon confirmation of a valid booking request to facilitate equipment handover.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">4. User Rights & Account Deletion</h3>
            <p>
              You have the right to inspect, update or request permanent deletion of your profile data by writing directly to our operations team at <strong>jay.bizconnect@gmail.com</strong>.
            </p>
          </section>
        </article>
      )}

      {/* 31. TERMS & CONDITIONS */}
      {pageType === 'terms' && (
        <article className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-2xs space-y-6 text-xs text-slate-700 leading-relaxed">
          <div className="border-b border-slate-100 pb-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">User Agreement</span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Terms & Conditions</h1>
            <p className="text-slate-400 font-medium">Last Updated: October 2026 · Ahmedabad, Gujarat</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl text-blue-900 font-medium">
            <strong>Important Notice:</strong> Rentlyo is an intermediary marketplace platform connecting independent equipment owners and businesses with renters. Generally, Rentlyo does not own or take title to the listed products.
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-xs">1. User Eligibility & Registration</h4>
              <p>Users must be at least 18 years old and provide accurate personal identification when renting or listing equipment across Ahmedabad.</p>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-xs">2. Buyer / Renter Responsibilities</h4>
              <p>Renters agree to inspect items upon handover, use items in accordance with operating guidelines, return equipment at the agreed date and time, and verify handovers via unique 4-digit OTP passcodes.</p>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-xs">3. Supplier Responsibilities & Product Listings</h4>
              <p>Suppliers warrant that all listed items are in safe working condition, legally owned, and accurately described.</p>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-xs">4. Security Deposits & Escrow Management</h4>
              <p>Security deposits are tracked separately and held safely in escrow. Deposits are not treated as platform revenue and are promptly refunded to the renter following safe return inspection.</p>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-xs">5. Product Damage, Late Returns & Disputes</h4>
              <p>In the event of accidental damage or unreturned accessories, suppliers must submit clear photo evidence within 2 hours of return. Deductions are determined strictly from the held security deposit pursuant to platform guidelines.</p>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-xs">6. Platform Role & Limitation of Liability</h4>
              <p>Rentlyo acts solely as an intermediary facilitating local peer and store rentals in Ahmedabad and disclaims liability for indirect damages to the maximum extent permitted by applicable law.</p>
            </div>
          </div>
        </article>
      )}

      {/* 32. REFUND POLICY */}
      {pageType === 'refund' && (
        <article className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-2xs space-y-6 text-xs text-slate-700 leading-relaxed">
          <div className="border-b border-slate-100 pb-4 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Security Deposit & Refund Policy</h1>
            <p className="text-slate-400 font-medium">Last Updated: October 2026</p>
          </div>

          <p>
            At Rentlyo, transparency regarding security deposits is fundamental to building trust in Ahmedabad's shared economy.
          </p>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs">Deposit Release Timeline</h4>
            <p>
              Once an item is returned to the supplier in Vastrapur, Satellite, or any Ahmedabad locality, the supplier verifies the physical condition and provides the Return OTP. The security deposit is automatically released back to the renter's original payment method within <strong>2 hours</strong> of completed inspection.
            </p>

            <h4 className="font-bold text-slate-900 text-xs">Full vs Partial Deductions</h4>
            <p>
              If an item is returned with missing accessories (e.g. charging cable, memory card), only the fair replacement cost of the specific accessory is deducted with mutual photo verification. The balance deposit is immediately refunded.
            </p>
          </div>
        </article>
      )}

      {/* CANCELLATION POLICY */}
      {pageType === 'cancellation' && (
        <article className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-2xs space-y-6 text-xs text-slate-700 leading-relaxed">
          <div className="border-b border-slate-100 pb-4 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Cancellation Policy</h1>
            <p className="text-slate-400 font-medium">Last Updated: October 2026</p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs">Renter Cancellations</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>More than 12 hours before rental start:</strong> 100% full refund of both rental fee and security deposit.</li>
              <li><strong>Within 12 hours of scheduled pickup:</strong> 100% refund of security deposit; nominal 15% cancellation fee deducted from rental charge to compensate supplier preparation.</li>
            </ul>

            <h4 className="font-bold text-slate-900 text-xs">Supplier Cancellations</h4>
            <p>
              If a supplier cancels a confirmed booking, the renter receives an immediate 100% refund plus priority assistance to find an alternative unit nearby in Ahmedabad.
            </p>
          </div>
        </article>
      )}

      {/* PROHIBITED ITEMS */}
      {pageType === 'prohibited' && (
        <article className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-2xs space-y-6 text-xs text-slate-700 leading-relaxed">
          <div className="border-b border-slate-100 pb-4 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Prohibited Items Policy</h1>
            <p className="text-slate-400 font-medium">Safety & Compliance Standards</p>
          </div>

          <p>The following categories are strictly forbidden from being listed on Rentlyo:</p>

          <ul className="list-disc pl-5 space-y-1">
            <li>Weapons, firearms, ammunition, or replica weapons.</li>
            <li>Hazardous materials, combustible chemicals, or explosive equipment.</li>
            <li>Stolen goods or equipment lacking verified proof of ownership.</li>
            <li>Surveillance devices designed for unauthorized eavesdropping or privacy invasion.</li>
            <li>Items that violate municipal, state (Gujarat), or federal Indian regulations.</li>
          </ul>
        </article>
      )}

      {/* HOW IT WORKS */}
      {pageType === 'how-it-works' && (
        <article className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-2xs space-y-8 text-xs text-slate-700 leading-relaxed">
          <div className="border-b border-slate-100 pb-4 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">How Rentlyo Works</h1>
            <p className="text-slate-400 font-medium">The Complete Ahmedabad Rental Guide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
              <h3 className="font-bold text-sm text-blue-950">For Renters</h3>
              <p>
                Browse electronics, DSLR cameras, party speakers, tools, and tents across Ahmedabad. Choose hourly or daily rental, pay securely with escrow deposit protection, pick up with your 4-digit OTP, use the item, and get your deposit refunded on return.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
              <h3 className="font-bold text-sm text-emerald-950">For Suppliers & Store Owners</h3>
              <p>
                List your equipment in minutes with photo uploads and price settings. Receive booking requests from nearby Ahmedabad residents, verify handovers with OTP, inspect equipment upon return, and receive automated payouts with transparent 15% platform commission.
              </p>
            </div>
          </div>
        </article>
      )}
    </div>
  );
};
