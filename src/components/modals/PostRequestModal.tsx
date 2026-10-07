import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AHMEDABAD_AREAS, CATEGORIES } from '../../data/constants';
import { X, Send, Sparkles, AlertCircle } from 'lucide-react';

interface PostRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostRequestModal: React.FC<PostRequestModalProps> = ({ isOpen, onClose }) => {
  const { postRentalRequest, currentArea } = useApp();

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('electronics');
  const [area, setArea] = useState(currentArea === 'All Ahmedabad' ? 'Navrangpura' : currentArea);
  const [neededDate, setNeededDate] = useState('2026-10-12');
  const [neededTime, setNeededTime] = useState('6:00 PM – 11:00 PM');
  const [durationText, setDurationText] = useState('5 Hours');
  const [budgetInr, setBudgetInr] = useState(800);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = CATEGORIES.find((c) => c.id === categoryId);

    postRentalRequest({
      userName: 'Rohan Mehra',
      title,
      categoryId,
      categoryName: cat?.name || 'Electronics',
      ahmedabadArea: area,
      neededDate,
      neededTime,
      durationText,
      budgetInr,
      notes,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rental Request Marketplace</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Can't Find What You Need?</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="overflow-y-auto p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>
              <h4 className="text-xl font-bold text-slate-900">Request Broadcasted!</h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Verified suppliers in and around <strong>{area}, Ahmedabad</strong> have been notified. You will receive customized offers soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  What item do you want to rent? *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Need a projector for a college presentation"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Ahmedabad Area</label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    {AHMEDABAD_AREAS.map((a) => (
                      <option key={a.id} value={a.name}>
                        {a.name} ({a.zone})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Required Date</label>
                  <input
                    type="date"
                    value={neededDate}
                    onChange={(e) => setNeededDate(e.target.value)}
                    className="w-full px-2.5 py-2 border border-slate-200 rounded-lg text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={neededTime}
                    onChange={(e) => setNeededTime(e.target.value)}
                    placeholder="6 PM – 11 PM"
                    className="w-full px-2.5 py-2 border border-slate-200 rounded-lg text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Budget (₹)</label>
                  <input
                    type="number"
                    value={budgetInr}
                    onChange={(e) => setBudgetInr(parseInt(e.target.value) || 0)}
                    placeholder="800"
                    className="w-full px-2.5 py-2 border border-slate-200 rounded-lg text-xs font-bold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specific Specifications / Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Mention any accessories, ports (HDMI, Type-C), or delivery requirements..."
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600"
                ></textarea>
              </div>

              <div className="bg-blue-50/70 p-3 rounded-lg flex items-start gap-2 text-xs text-blue-900 border border-blue-100">
                <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Nearby suppliers within your Ahmedabad radius will be alerted and can submit instant bids. You compare offers and choose the best one.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Post Request to Nearby Suppliers</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
