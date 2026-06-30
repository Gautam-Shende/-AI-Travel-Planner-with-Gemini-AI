import { useState, useEffect } from 'react';
import { Compass, AlertCircle, History, Calendar, Users, IndianRupee, X } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import { TravelForm } from './components/TravelForm';
import { LoadingScreen } from './components/LoadingScreen';
import { ItineraryDashboard } from './components/ItineraryDashboard';
import { getTravelPlan } from './services/travelPlanner';
import type { TravelPlan } from './services/travelPlanner';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<TravelPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fallbackWarning, setFallbackWarning] = useState<string | null>(null);
  const [recentTrips, setRecentTrips] = useState<TravelPlan[]>([]);
  
  const [aiMode, setAiMode] = useState<'gemini' | 'offline'>(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    return savedKey && savedKey.trim().length > 0 ? 'gemini' : 'offline';
  });

  // Load recent trips on mount
  useEffect(() => {
    const saved = localStorage.getItem('recent_trips');
    if (saved) {
      try {
        setRecentTrips(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse recent trips", e);
      }
    }
  }, []);

  const handleFormSubmit = async (formData: {
    destination: string;
    days: number;
    budget: number;
    interests: string[];
    travelType: string;
    apiKey: string | null;
  }) => {
    setIsLoading(true);
    setError(null);
    setFallbackWarning(null);
    setAiMode(formData.apiKey ? 'gemini' : 'offline');
    try {
      const generatedPlan = await getTravelPlan(
        formData.destination,
        formData.days,
        formData.budget,
        formData.interests,
        formData.travelType,
        formData.apiKey
      );
      setPlan(generatedPlan);
      setAiMode(generatedPlan.generatedBy);

      // Handle Gemini fallback notification
      if (generatedPlan.fallbackHappened) {
        setFallbackWarning("Unable to contact Gemini. Switched to Offline Mode.");
      }

      // Add to recent trips list (limit to last 5, ensure uniqueness by destination + days)
      setRecentTrips((prev) => {
        const filtered = prev.filter(
          (t) => !(t.destination.toLowerCase() === generatedPlan.destination.toLowerCase() && t.days === generatedPlan.days)
        );
        const updated = [generatedPlan, ...filtered].slice(0, 5);
        localStorage.setItem('recent_trips', JSON.stringify(updated));
        return updated;
      });

    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Something went wrong while generating the plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPlan(null);
    setError(null);
    setFallbackWarning(null);
    const savedKey = localStorage.getItem('gemini_api_key');
    setAiMode(savedKey && savedKey.trim().length > 0 ? 'gemini' : 'offline');
  };

  const handleSelectRecent = (recentPlan: TravelPlan) => {
    setPlan(recentPlan);
    setAiMode(recentPlan.generatedBy);
    setError(null);
    setFallbackWarning(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 flex flex-col justify-between">
      <div>
        {/* 1. Global Header Bar */}
        <header className="max-w-6xl mx-auto px-4 py-6 md:py-8 flex items-center justify-between border-b border-slate-100 dark:border-slate-900 print:hidden animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-tr from-emerald-400 to-indigo-500 rounded-2xl text-white shadow-md shadow-emerald-500/10">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-850 dark:text-white m-0">
                AI Travel Planner
              </h1>
              <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 m-0 uppercase tracking-widest mt-0.5">
                Personalized Journeys
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* AI Mode Badge */}
            <div
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-300 ${
                aiMode === 'gemini'
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${aiMode === 'gemini' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400 dark:bg-slate-500'}`} />
              AI Mode: {aiMode === 'gemini' ? 'Gemini' : 'Offline Simulation'}
            </div>

            <ThemeToggle />
          </div>
        </header>

        {/* 2. Main Page Body */}
        <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          {/* Banner section: only visible when NOT displaying active results dashboard */}
          {!plan && !isLoading && (
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12 space-y-4 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Plan your perfect trip with <span className="bg-gradient-to-r from-emerald-500 to-indigo-500 bg-clip-text text-transparent">AI in seconds</span>.
              </h2>
              <p className="text-base md:text-lg font-medium text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                Get a personalized day-by-day itinerary complete with budget breakdowns, packing lists, and local safety rules.
              </p>
            </div>
          )}

          {/* Global Fallback Warning Banner */}
          {fallbackWarning && (
            <div className="max-w-3xl mx-auto mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 flex items-start justify-between gap-3 animate-slide-down print:hidden">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-500" />
                <div>
                  <h4 className="font-bold text-sm">Offline Mode Fallback</h4>
                  <p className="text-xs font-semibold mt-0.5 leading-relaxed">{fallbackWarning}</p>
                </div>
              </div>
              <button 
                onClick={() => setFallbackWarning(null)}
                className="p-1 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 text-amber-700 dark:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                aria-label="Dismiss message"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Global Error Banner */}
          {error && (
            <div className="max-w-3xl mx-auto mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-950/50 text-rose-800 dark:text-rose-300 flex items-start gap-3 animate-slide-down">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm">Failed to Generate Plan</h4>
                <p className="text-xs font-semibold mt-0.5 leading-relaxed">{error}</p>
              </div>
            </div>
          )}

          {/* Dynamic State Rendering */}
          <section className="relative">
            {isLoading ? (
              <LoadingScreen />
            ) : plan ? (
              <ItineraryDashboard plan={plan} onReset={handleReset} />
            ) : (
              <div className="space-y-12">
                <TravelForm onSubmit={handleFormSubmit} isLoading={isLoading} />
                
                {/* Empty State Illustration & Message (visible when no plan active) */}
                <div className="text-center py-10 max-w-md mx-auto border-t border-slate-100 dark:border-slate-900">
                  <div className="flex justify-center mb-4">
                    {/* Compact Travel Compass SVG Illustration */}
                    <svg className="w-20 h-20 text-slate-300 dark:text-slate-700 animate-pulse" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" strokeDasharray="6 6" />
                      <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="3" />
                      <path d="M50 28 L58 46 L72 50 L58 54 L50 72 L42 54 L28 50 L42 46 Z" fill="currentColor" opacity="0.3" />
                      <path d="M50 28 L50 72 M28 50 L72 50" stroke="currentColor" strokeWidth="2" />
                      <circle cx="50" cy="50" r="4" fill="currentColor" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">
                    Start planning your next adventure.
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-1 max-w-xs mx-auto">
                    Fill in the form above to generate a custom itinerary or reopen one of your recent trips below.
                  </p>
                </div>

                {/* Recent Trips Section */}
                {recentTrips.length > 0 && (
                  <div className="max-w-3xl mx-auto space-y-4 animate-fade-in">
                    <h3 className="text-md font-extrabold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <History className="w-5 h-5 text-indigo-500" />
                      Recent Travel Plans
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {recentTrips.map((recentPlan, index) => (
                        <button
                          key={`${recentPlan.destination}-${recentPlan.days}-${index}`}
                          onClick={() => handleSelectRecent(recentPlan)}
                          className="flex flex-col text-left p-4 rounded-2xl border border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-500/50 hover:bg-slate-50/20 dark:hover:bg-slate-800/40 transition-all cursor-pointer group shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <div className="flex-1 space-y-1.5">
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {recentPlan.destination}
                            </h4>
                            <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 dark:text-slate-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-emerald-500" />
                                {recentPlan.days} Days
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3 text-indigo-500" />
                                {recentPlan.travelType}
                              </span>
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                              <IndianRupee className="w-3 h-3 text-amber-500" />
                              ₹{recentPlan.budget.toLocaleString('en-IN')}
                            </div>
                          </div>
                          {recentPlan.createdAt && (
                            <div className="text-[9px] font-bold text-slate-350 dark:text-slate-600 border-t border-slate-50 dark:border-slate-800/60 pt-2 mt-2 w-full">
                              Generated: {recentPlan.createdAt.split(',')[0]}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </main>
      </div>

      {/* 3. Footer */}
      <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs font-bold text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-900 w-full mt-12 print:hidden">
        Made with ❤️ using React + Gemini AI
      </footer>
    </div>
  );
}

export default App;
