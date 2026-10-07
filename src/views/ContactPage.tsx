import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFullName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Support & Inquiries
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Contact Rentlyo
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Have a question, partnership idea or need help with a rental? Get in touch with us.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
        {/* Contact Info Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-2xs">
            <h3 className="font-bold text-base text-slate-900">Direct Contact Details</h3>

            <div className="space-y-4 text-xs">
              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px] block">
                    Phone / WhatsApp
                  </span>
                  <a
                    href="tel:9824884860"
                    className="font-bold text-base text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    9824884860
                  </a>
                  <span className="text-slate-500 text-[11px] block mt-0.5">
                    Available Mon–Sat, 9:00 AM – 9:00 PM IST
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px] block">
                    Official Email
                  </span>
                  <a
                    href="mailto:jay.bizconnect@gmail.com"
                    className="font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    jay.bizconnect@gmail.com
                  </a>
                  <span className="text-slate-500 text-[11px] block mt-0.5">
                    For partnerships, supplier queries & support
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px] block">
                    Headquarters
                  </span>
                  <strong className="text-slate-900 text-sm">Ahmedabad, Gujarat, India</strong>
                  <span className="text-slate-500 text-[11px] block mt-0.5">
                    Central Operations serving all Ahmedabad hubs
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>
              <h3 className="text-xl font-bold text-slate-900">Message Sent!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you for contacting Rentlyo. Our team in Ahmedabad will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-bold text-base text-slate-900">Send Us a Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Priyank Shah"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. priyank@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10 digit phone number"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subject *</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Rental query / Partnership"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message *</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="How can we help you today?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
