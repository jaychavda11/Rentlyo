import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CITIES, AHMEDABAD_AREAS } from '../../data/constants';
import { MapPin, Check, Sparkles, Bell, X } from 'lucide-react';

export const LocationModal: React.FC = () => {
  const {
    openLocationModal,
    setOpenLocationModal,
    currentArea,
    setCurrentArea,
    joinWaitlist,
  } = useApp();

  const [selectedUpcomingCity, setSelectedUpcomingCity] = useState<string | null>(null);
  const [waitlistName, setWaitlistName] = useState('');
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [selectedZone, setSelectedZone] = useState<string>('All');

  if (!openLocationModal) return null;

  const handleSelectArea = (areaName: string) => {
    setCurrentArea(areaName);
    setOpenLocationModal(false);
  };

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUpcomingCity || !waitlistEmail) return;
    joinWaitlist({
      type: 'city',
      targetCity: selectedUpcomingCity,
      name: waitlistName || 'Interested User',
      email: waitlistEmail,
    });
    setWaitlistSubmitted(true);
    setTimeout(() => {
      setWaitlistSubmitted(false);
      setSelectedUpcomingCity(null);
      setOpenLocationModal(false);
    }, 2000);
  };

  const zones = ['All', 'West', 'Central', 'North', 'East', 'South'];
  const filteredAreas =
    selectedZone === 'All'
      ? AHMEDABAD_AREAS
      : AHMEDABAD_AREAS.filter((a) => a.zone === selectedZone);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Choose Your Rental Location</h3>
              <p className="text-xs text-slate-500">Ahmedabad is our active live launch market</p>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedUpcomingCity(null);
              setOpenLocationModal(false);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {selectedUpcomingCity ? (
            /* Future City Waitlist Form */
            <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold tracking-wider text-blue-700 uppercase">
                  Expanding Across India
                </span>
                <h4 className="text-xl font-bold text-slate-900">
                  Rentlyo is coming soon to {selectedUpcomingCity}
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Join the waitlist to get notified when rentals launch in your city, plus receive ₹500 in rental credits for early adopters.
                </p>
              </div>

              {waitlistSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center justify-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-sm">
                    Thank you! You're on the priority waitlist for {selectedUpcomingCity}.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleJoinWaitlist} className="max-w-md mx-auto space-y-3 pt-2 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={waitlistName}
                      onChange={(e) => setWaitlistName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 bg-white"
                      required
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedUpcomingCity(null)}
                      className="flex-1 py-2.5 px-4 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors"
                    >
                      Back to Ahmedabad
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md transition-colors flex items-center justify-center gap-2"
                    >
                      <Bell className="w-4 h-4" />
                      Join Waitlist
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <>
              {/* Active City Card */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Active Marketplace
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Instant Peer & Store Rentals</span>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xl font-bold text-slate-900">Ahmedabad</h4>
                        <span className="bg-blue-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                          Live Now
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Gujarat’s commercial heart. 40+ neighborhood hubs across West, Central, North & East Ahmedabad.
                      </p>
                    </div>
                    <button
                      onClick={() => handleSelectArea('All Ahmedabad')}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                        currentArea === 'All Ahmedabad'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-100'
                      }`}
                    >
                      All Ahmedabad
                    </button>
                  </div>

                  {/* Neighborhood Area Selector */}
                  <div className="mt-4 pt-4 border-t border-blue-200/60">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-700">
                        Select Your Ahmedabad Area for Precise Distances:
                      </span>
                    </div>

                    {/* Zone Tabs */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {zones.map((zone) => (
                        <button
                          key={zone}
                          onClick={() => setSelectedZone(zone)}
                          className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                            selectedZone === zone
                              ? 'bg-blue-600 text-white font-semibold'
                              : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200'
                          }`}
                        >
                          {zone} {zone !== 'All' ? 'Zone' : ''}
                        </button>
                      ))}
                    </div>

                    {/* Areas Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-48 overflow-y-auto pr-1">
                      {filteredAreas.map((area) => {
                        const isSelected = currentArea.toLowerCase() === area.name.toLowerCase();
                        return (
                          <button
                            key={area.id}
                            onClick={() => handleSelectArea(area.name)}
                            className={`flex items-center justify-between text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                              isSelected
                                ? 'bg-blue-600 text-white font-bold shadow-xs'
                                : 'bg-white text-slate-700 hover:bg-blue-100/70 border border-slate-200/80'
                            }`}
                          >
                            <span className="truncate">{area.name}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expansion Cities (Waitlist only - No fake active inventory) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      Coming Soon to Other Cities
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">Waitlist for launch perks</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CITIES.filter((c) => c.status === 'coming_soon').map((city) => (
                    <div
                      key={city.id}
                      onClick={() => setSelectedUpcomingCity(city.name)}
                      className="border border-slate-200 rounded-xl p-3 bg-slate-50/70 hover:bg-white hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-800">{city.name}</span>
                          <span className="text-[10px] font-semibold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-sm">
                            Coming Soon
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{city.description}</p>
                      </div>
                      <span className="text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2">
                        Waitlist →
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
