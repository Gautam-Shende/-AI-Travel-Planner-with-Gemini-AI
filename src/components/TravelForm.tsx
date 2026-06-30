import React, { useState } from 'react';
import { 
  MapPin, Calendar, IndianRupee, Compass, User, Users, Heart, UsersRound, Settings, Key 
} from 'lucide-react';

interface TravelFormProps {
  onSubmit: (data: {
    destination: string;
    days: number;
    budget: number;
    interests: string[];
    travelType: string;
    apiKey: string | null;
  }) => void;
  isLoading: boolean;
}

const INTERESTS = [
  { id: 'Adventure', label: 'Adventure', icon: Compass, desc: 'Trekking, sports, nature trails' },
  { id: 'Food', label: 'Food & Culinary', icon: Compass, desc: 'Street food, fine dining, masterclasses' }, // We'll map icons later
  { id: 'Nature', label: 'Nature & Wildlife', icon: Compass, desc: 'Parks, gardens, scenic peaks' },
  { id: 'Shopping', label: 'Shopping', icon: Compass, desc: 'Local bazaars, boutiques, malls' },
  { id: 'Historical', label: 'Historical & Heritage', icon: Compass, desc: 'Citadels, museums, old town walk' },
  { id: 'Beaches', label: 'Beaches & Coasts', icon: Compass, desc: 'Snorkeling, beach fires, cycling' }
];

// Let's customize icons specifically
import { Activity, Utensils, Trees, ShoppingBag, Landmark, Palmtree } from 'lucide-react';
const INTEREST_CONFIGS: Record<string, { icon: any; color: string; bg: string }> = {
  Adventure: { icon: Activity, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/20" },
  Food: { icon: Utensils, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/20" },
  Nature: { icon: Trees, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20" },
  Shopping: { icon: ShoppingBag, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-950/20" },
  Historical: { icon: Landmark, color: "text-cyan-500", bg: "bg-cyan-50 dark:bg-cyan-950/20" },
  Beaches: { icon: Palmtree, color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-950/20" }
};

const TRAVEL_TYPES = [
  { id: 'Solo', label: 'Solo Traveler', icon: User, desc: 'Explore on your own terms' },
  { id: 'Couple', label: 'Couple', icon: Heart, desc: 'Romantic spots & shared sights' },
  { id: 'Family', label: 'Family', icon: UsersRound, desc: 'Kid-friendly, safe & relaxed' },
  { id: 'Friends', label: 'Friends Group', icon: Users, desc: 'Vibrant, active & budget conscious' }
];

const SUGGESTED_DESTINATIONS = [
  { name: 'Tokyo', desc: 'Japan' },
  { name: 'Paris', desc: 'France' },
  { name: 'Goa', desc: 'India' }
];

export const TravelForm: React.FC<TravelFormProps> = ({ onSubmit, isLoading }) => {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState<number | ''>('');
  const [budget, setBudget] = useState<number | ''>('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [travelType, setTravelType] = useState('Solo');

  // API Key management
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');

  // Validation States
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInterestToggle = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleApiKeyChange = (val: string) => {
    setApiKey(val);
    if (val.trim()) {
      localStorage.setItem('gemini_api_key', val);
    } else {
      localStorage.removeItem('gemini_api_key');
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!destination.trim()) {
      newErrors.destination = "Destination is required";
    }
    if (days === '' || days <= 0) {
      newErrors.days = "Please enter a valid number of days (1-30)";
    } else if (days > 30) {
      newErrors.days = "Planning is limited to a maximum of 30 days";
    }
    if (budget === '' || budget <= 0) {
      newErrors.budget = "Please enter a valid budget in ₹";
    } else if (budget < 1000) {
      newErrors.budget = "Minimum recommended budget is ₹1,000";
    }
    if (selectedInterests.length === 0) {
      newErrors.interests = "Select at least one travel interest";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    onSubmit({
      destination: destination.trim(),
      days: Number(days),
      budget: Number(budget),
      interests: selectedInterests,
      travelType,
      apiKey: apiKey.trim() ? apiKey.trim() : null
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl max-w-3xl mx-auto transition-all duration-300">
      
      {/* Header with settings trigger */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            Tell us about your trip
          </h3>
          <p className="text-sm font-medium text-slate-400 dark:text-slate-500">
            Configure your preferences to build your custom itinerary.
          </p>
        </div>
        
        <button
          type="button"
          onClick={() => setShowSettings(!showSettings)}
          className={`p-2.5 rounded-xl border transition-all duration-300 hover:scale-105 cursor-pointer ${
            showSettings 
              ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-emerald-500' 
              : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 text-slate-500 dark:text-slate-400'
          }`}
          title="Gemini API Key Settings"
        >
          <Settings className={`w-5 h-5 ${showSettings ? 'rotate-45' : ''} transition-transform duration-300`} />
        </button>
      </div>

      {/* Gemini Settings Box */}
      {showSettings && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-50/40 to-teal-50/30 dark:from-slate-800/40 dark:to-slate-800/20 border border-emerald-100/50 dark:border-slate-800 animate-slide-down">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Key className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1 flex items-center gap-1.5">
                Google Gemini API Key (Optional)
              </h4>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                Enter your Gemini API key to enable live travel planning content. If left empty, a fast, highly realistic offline simulation is used.
              </p>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination Field */}
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-500" />
            Where are you going?
          </label>
          <div className="relative">
            <input
              type="text"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                if (errors.destination) setErrors(prev => ({ ...prev, destination: '' }));
              }}
              placeholder="Enter destination (e.g. Tokyo, Goa, Paris, Srinagar...)"
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 dark:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 font-medium ${
                errors.destination 
                  ? 'border-rose-400 dark:border-rose-900/60 focus:ring-rose-500' 
                  : 'border-slate-200 dark:border-slate-700/80 focus:border-emerald-500'
              }`}
            />
          </div>
          {errors.destination && (
            <p className="text-xs text-rose-500 font-bold mt-1.5">{errors.destination}</p>
          )}

          {/* Quick Suggestions */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500">Popular:</span>
            {SUGGESTED_DESTINATIONS.map((dest) => (
              <button
                key={dest.name}
                type="button"
                onClick={() => {
                  setDestination(dest.name);
                  if (errors.destination) setErrors(prev => ({ ...prev, destination: '' }));
                }}
                className="text-xs font-bold px-3 py-1 rounded-full border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-emerald-500 dark:hover:border-emerald-500/50 hover:bg-emerald-50/20 transition-all cursor-pointer"
              >
                {dest.name}, {dest.desc}
              </button>
            ))}
          </div>
        </div>

        {/* Days and Budget Fields Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Days */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-500" />
              Number of Days
            </label>
            <input
              type="number"
              value={days}
              onChange={(e) => {
                const val = e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value));
                setDays(val);
                if (errors.days) setErrors(prev => ({ ...prev, days: '' }));
              }}
              placeholder="e.g. 5"
              min="1"
              max="30"
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 dark:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 font-medium ${
                errors.days 
                  ? 'border-rose-400 dark:border-rose-900/60 focus:ring-rose-500' 
                  : 'border-slate-200 dark:border-slate-700/80 focus:border-emerald-500'
              }`}
            />
            {errors.days && (
              <p className="text-xs text-rose-500 font-bold mt-1.5">{errors.days}</p>
            )}
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-emerald-500" />
              Budget (₹)
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => {
                const val = e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value));
                setBudget(val);
                if (errors.budget) setErrors(prev => ({ ...prev, budget: '' }));
              }}
              placeholder="e.g. 25000"
              min="1000"
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 dark:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 font-medium ${
                errors.budget 
                  ? 'border-rose-400 dark:border-rose-900/60 focus:ring-rose-500' 
                  : 'border-slate-200 dark:border-slate-700/80 focus:border-emerald-500'
              }`}
            />
            {errors.budget && (
              <p className="text-xs text-rose-500 font-bold mt-1.5">{errors.budget}</p>
            )}
          </div>
        </div>

        {/* Travel Interests Field */}
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            Travel Interests
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {INTERESTS.map((item) => {
              const selected = selectedInterests.includes(item.id);
              const config = INTEREST_CONFIGS[item.id] || { icon: Compass, color: "text-slate-500", bg: "bg-slate-50" };
              const Icon = config.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    handleInterestToggle(item.id);
                    if (errors.interests) setErrors(prev => ({ ...prev, interests: '' }));
                  }}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-200 group cursor-pointer ${
                    selected
                      ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20 ring-1 ring-emerald-500'
                      : 'border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900 hover:border-slate-200 dark:hover:border-slate-700'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg mb-2 ${config.bg} ${config.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.interests && (
            <p className="text-xs text-rose-500 font-bold mt-2">{errors.interests}</p>
          )}
        </div>

        {/* Travel Type Field */}
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            Who are you traveling with?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TRAVEL_TYPES.map((type) => {
              const selected = travelType === type.id;
              const Icon = type.icon;

              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setTravelType(type.id)}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                    selected
                      ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20 ring-1 ring-indigo-500'
                      : 'border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900 hover:border-slate-200 dark:hover:border-slate-700'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-2 ${selected ? 'text-indigo-500' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-0.5">
                    {type.label}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                    {type.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-bold text-base shadow-lg hover:shadow-emerald-500/10 dark:hover:shadow-indigo-500/10 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Compass className="w-5 h-5 animate-spin-slow" />
          )}
          Generate Travel Plan
        </button>
      </form>
    </div>
  );
};
