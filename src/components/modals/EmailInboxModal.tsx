import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EmailNotification } from '../../types';
import {
  Mail,
  X,
  Clock,
  CheckCircle2,
  Calendar,
  KeyRound,
  ShieldCheck,
  User,
  ArrowRight,
  Inbox,
  Send,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';

export const EmailInboxModal: React.FC = () => {
  const {
    openEmailInboxModal,
    setOpenEmailInboxModal,
    emails,
    markEmailRead,
    currentUser,
    setActiveView,
    sendEmail,
  } = useApp();

  const [selectedEmail, setSelectedEmail] = useState<EmailNotification | null>(emails[0] || null);
  const [filterAccountOnly, setFilterAccountOnly] = useState<boolean>(false);
  const [customTestEmail, setCustomTestEmail] = useState<string>(currentUser?.email || 'ghanshymchavda3@gmail.com');
  const [sendSuccessMessage, setSendSuccessMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  if (!openEmailInboxModal) return null;

  const displayedEmails = filterAccountOnly && currentUser
    ? emails.filter((e) => e.toEmail.toLowerCase() === currentUser.email.toLowerCase())
    : emails;

  const handleSelectEmail = (email: EmailNotification) => {
    setSelectedEmail(email);
    markEmailRead(email.id);
  };

  const handleCopyEmail = () => {
    if (!selectedEmail) return;
    navigator.clipboard.writeText(
      `Subject: ${selectedEmail.subject}\nTo: ${selectedEmail.toEmail}\nFrom: Rentlyo Ahmedabad\n\n${selectedEmail.content}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDispatchTestEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTestEmail) return;

    sendEmail({
      toEmail: customTestEmail,
      toName: currentUser?.name || 'Verified User',
      subject: `[Rentlyo Test Alert] Dispatched to ${customTestEmail}`,
      preview: `Test email notification logged and saved in Rentlyo Ahmedabad records.`,
      content: `Hello ${currentUser?.name || 'User'},\n\nThis is a verified test email dispatch from the Rentlyo Ahmedabad Rental Marketplace.\n\nAll booking requests, item listings, and 4-digit handover OTP notifications are automatically recorded and sent to your email address (${customTestEmail}).\n\nHelpline: +91 9824884860\nEmail: jay.bizconnect@gmail.com\nLocation: Ahmedabad, Gujarat`,
      type: 'welcome',
    });

    setSendSuccessMessage(`✅ Notification dispatched to ${customTestEmail}!`);
    setTimeout(() => setSendSuccessMessage(null), 3000);
  };

  const getBadgeColor = (type: EmailNotification['type']) => {
    switch (type) {
      case 'booking_request':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'booking_confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'handover_otp':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'deposit_refund':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">Rentlyo Email Notification Center</h3>
                <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Saved & Logged ({emails.length} Emails)
                </span>
              </div>
              <p className="text-xs text-slate-500">
                All account data, product listings, and rental booking requests saved to email
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser && (
              <button
                onClick={() => setFilterAccountOnly(!filterAccountOnly)}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                  filterAccountOnly
                    ? 'bg-blue-600 text-white border-blue-600 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {filterAccountOnly ? `Showing: ${currentUser.email}` : 'Filter my email'}
              </button>
            )}

            <button
              onClick={() => setOpenEmailInboxModal(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dispatch Test Alert Banner */}
        <div className="bg-blue-50/70 border-b border-blue-100 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-blue-900 font-medium">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Send copy to custom email address:</span>
          </div>

          <form onSubmit={handleDispatchTestEmail} className="flex items-center gap-2">
            <input
              type="email"
              value={customTestEmail}
              onChange={(e) => setCustomTestEmail(e.target.value)}
              placeholder="e.g. ghanshymchavda3@gmail.com"
              className="px-2.5 py-1 rounded-lg border border-blue-200 bg-white text-xs w-52 text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="py-1 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-2xs flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              <span>Send Test</span>
            </button>
          </form>

          {sendSuccessMessage && (
            <span className="text-emerald-700 font-bold animate-in fade-in">
              {sendSuccessMessage}
            </span>
          )}
        </div>

        {/* Content Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {/* Left Email Feed */}
          <div className="md:col-span-5 overflow-y-auto max-h-[65vh] divide-y divide-slate-100 p-2 space-y-1">
            {displayedEmails.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No email notifications found.
              </div>
            ) : (
              displayedEmails.map((e) => {
                const isSelected = selectedEmail?.id === e.id;
                return (
                  <div
                    key={e.id}
                    onClick={() => handleSelectEmail(e)}
                    className={`p-3 rounded-2xl transition-all cursor-pointer space-y-1 ${
                      isSelected
                        ? 'bg-blue-50 border border-blue-200 shadow-2xs'
                        : e.read
                        ? 'hover:bg-slate-50'
                        : 'bg-blue-50/40 hover:bg-blue-50/70 font-semibold'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-blue-900 truncate max-w-[170px]">
                        To: {e.toEmail}
                      </span>
                      <span className="text-slate-400 text-[10px] shrink-0">{e.date}</span>
                    </div>

                    <div className="flex items-center gap-1.5 pt-0.5">
                      <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded-md border ${getBadgeColor(e.type)}`}>
                        {e.type.replace('_', ' ')}
                      </span>
                      <h5 className="text-xs font-bold text-slate-900 line-clamp-1">{e.subject}</h5>
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-snug">
                      {e.preview}
                    </p>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Selected Email Message View */}
          <div className="md:col-span-7 p-6 overflow-y-auto max-h-[65vh] space-y-4">
            {selectedEmail ? (
              <div className="space-y-4">
                {/* Meta details */}
                <div className="space-y-2 pb-4 border-b border-slate-100">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-base font-bold text-slate-900 leading-snug">
                      {selectedEmail.subject}
                    </h4>
                    <button
                      onClick={handleCopyEmail}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 cursor-pointer flex items-center gap-1 text-[11px] shrink-0"
                      title="Copy email content"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl space-y-1 border border-slate-100">
                    <div className="flex justify-between">
                      <div>
                        <span className="text-slate-400">From: </span>
                        <strong>Rentlyo Ahmedabad Marketplace &lt;no-reply@rentlyo.in&gt;</strong>
                      </div>
                      <span className="text-[10px] text-slate-400">{selectedEmail.date}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">To: </span>
                      <strong>{selectedEmail.toName} &lt;{selectedEmail.toEmail}&gt;</strong>
                    </div>
                  </div>
                </div>

                {/* Email Body formatted */}
                <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 rounded-2xl border border-slate-100 font-sans">
                  {selectedEmail.content}
                </div>

                {/* Action CTA if booking request */}
                {selectedEmail.type === 'booking_request' && (
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-500">
                      View this request in your Supplier Dashboard:
                    </span>
                    <button
                      onClick={() => {
                        setOpenEmailInboxModal(false);
                        setActiveView('supplier-dashboard');
                      }}
                      className="py-2 px-4 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Open Supplier Dashboard</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-12 text-center text-xs text-slate-400">
                Select an email from the left to view the notification details.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
