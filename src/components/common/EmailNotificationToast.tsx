import React from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, ArrowRight, X } from 'lucide-react';

export const EmailNotificationToast: React.FC = () => {
  const { latestEmailAlert, dismissEmailAlert, setOpenEmailInboxModal } = useApp();

  if (!latestEmailAlert) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-blue-500/50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow-md">
          <Mail className="w-5 h-5 text-white" />
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">
              Email Sent To Supplier
            </span>
          </div>

          <h5 className="text-xs font-bold text-white leading-tight">
            {latestEmailAlert.subject}
          </h5>

          <p className="text-[11px] text-slate-300 truncate">
            Delivered to: <strong>{latestEmailAlert.toEmail}</strong>
          </p>

          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => {
                dismissEmailAlert();
                setOpenEmailInboxModal(true);
              }}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <span>View Email Message</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <button
          onClick={dismissEmailAlert}
          className="text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
