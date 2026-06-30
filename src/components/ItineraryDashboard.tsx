import React, { useState, useEffect } from 'react';
import { 
  Copy, Check, Printer, RefreshCw, Calendar, MapPin, IndianRupee, Compass, Sunrise, Sun, Sunset, Users, FileDown 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { TravelPlan } from '../services/travelPlanner';
import { BudgetVisualizer } from './BudgetVisualizer';
import { PackingChecklist } from './PackingChecklist';
import { GuideSection } from './GuideSection';
import { TopPlaces } from './TopPlaces';
import { LocalFoods } from './LocalFoods';
import { HiddenGems } from './HiddenGems';
import { MoneySavingTips } from './MoneySavingTips';
import { exportToPDF } from '../utils/pdfExporter';

interface ItineraryDashboardProps {
  plan: TravelPlan;
  onReset: () => void;
}

const TIME_ICONS = {
  Morning: { icon: Sunrise, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/20" },
  Afternoon: { icon: Sun, color: "text-sky-500 bg-sky-50 dark:bg-sky-950/20" },
  Evening: { icon: Sunset, color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20" }
};

export const ItineraryDashboard: React.FC<ItineraryDashboardProps> = ({ plan, onReset }) => {
  const [activeDay, setActiveDay] = useState(1);
  const [copied, setCopied] = useState(false);

  // Trigger celebration on mount
  useEffect(() => {
    const duration = 1.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#10b981', '#6366f1', '#f59e0b']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#10b981', '#6366f1', '#f59e0b']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, [plan]);

  const handleCopy = async () => {
    let t = `✈️ AI TRAVEL PLANNER ITINERARY: ${plan.destination.toUpperCase()} ✈️\n`;
    t += `${'─'.repeat(50)}\n`;
    t += `📅 Duration: ${plan.days} Days | 👥 Style: ${plan.travelType} | 💰 Budget: ₹${plan.budget.toLocaleString('en-IN')}\n\n`;

    // Summary
    t += `# 🌍 Trip Summary\n${plan.summary}\n\n`;

    // Day-wise Itinerary
    t += `# 📅 Day-wise Itinerary\n`;
    plan.itinerary.forEach((dayPlan) => {
      t += `\n## Day ${dayPlan.day} — ${dayPlan.theme}\n`;
      dayPlan.activities.forEach((act) => {
        t += `  ☀️ [${act.time}] ${act.title} (${act.location})\n`;
        t += `     ${act.description}\n`;
        t += `     Cost: ₹${act.cost.toLocaleString('en-IN')}\n`;
      });
    });

    // Budget Breakdown
    t += `\n# 💰 Budget Breakdown\n`;
    plan.budgetBreakdown.forEach(b => {
      t += `- ${b.category}: ₹${b.amount.toLocaleString('en-IN')} (${b.percentage}%)\n`;
    });
    const total = plan.budgetBreakdown.reduce((s, b) => s + b.amount, 0);
    t += `Total Estimated Cost: ₹${total.toLocaleString('en-IN')}\n`;

    // Top Places
    t += `\n# 📍 Top Places to Visit\n`;
    plan.topPlaces.forEach((p, i) => {
      t += `${i + 1}. ${p.name} — ${p.description}\n`;
    });

    // Local Foods
    t += `\n# 🍜 Local Food Recommendations\n`;
    plan.localFoods.forEach(f => {
      t += `- ${f.dish}: ${f.description}\n`;
    });

    // Packing Checklist
    t += `\n# 🎒 Packing Checklist\n`;
    plan.packingList.forEach(item => { t += `- [ ] ${item}\n`; });

    // Safety Tips
    t += `\n# ⚠️ Safety Tips\n`;
    plan.safetyTips.forEach(tip => { t += `- ${tip}\n`; });

    // Money Saving Tips
    t += `\n# 💡 Money Saving Tips\n`;
    plan.moneySavingTips.forEach(tip => { t += `- ${tip}\n`; });

    // Hidden Gems
    t += `\n# ⭐ Hidden Gems\n`;
    plan.hiddenGems.forEach(g => {
      t += `- ${g.name}: ${g.description}\n`;
    });

    // Local Tips
    t += `\n# 💡 Local Tips\n`;
    plan.localTips.forEach(tip => { t += `- ${tip}\n`; });

    try {
      await navigator.clipboard.writeText(t);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy itinerary text", err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const currentDayData = plan.itinerary.find(d => d.day === activeDay) || plan.itinerary[0];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto print:p-0">
      
      {/* ── 1. Trip Header Panel ─────────────────────────────────────── */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden print:border-none print:shadow-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 dark:bg-emerald-500/5" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20 dark:bg-indigo-500/5" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                <Compass className="w-3.5 h-3.5 animate-spin-slow" />
                Perfect Trip Generated!
              </div>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                plan.generatedBy === 'gemini'
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
                  : 'bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400'
              }`}>
                <span className={`w-2 h-2 rounded-full ${plan.generatedBy === 'gemini' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400 dark:bg-slate-500'}`} />
                {plan.generatedBy === 'gemini' ? 'AI Mode: Gemini' : 'AI Mode: Offline Simulation'}
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
              🌍 Exploring {plan.destination}
            </h2>
            {plan.createdAt && (
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-0.5">
                Generated on: {plan.createdAt.replace(',', '')}
              </p>
            )}
            
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
              {plan.summary}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-350 text-sm font-bold pt-1.5">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-500" />
                {plan.days} Days
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-500" />
                {plan.travelType}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span className="flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-amber-500" />
                ₹{plan.budget.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center flex-wrap gap-3 flex-shrink-0 print:hidden">
            <button
              id="copy-plan-btn"
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-50/10 text-slate-700 dark:text-slate-300 font-bold text-sm transition-all duration-200 cursor-pointer shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Plan
                </>
              )}
            </button>

            <button
              onClick={() => exportToPDF(plan)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 hover:bg-sky-50/10 text-slate-700 dark:text-slate-300 font-bold text-sm transition-all duration-200 cursor-pointer shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <FileDown className="w-4 h-4 text-sky-500" />
              Export as PDF
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-50/10 text-slate-700 dark:text-slate-300 font-bold text-sm transition-all duration-200 cursor-pointer shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Printer className="w-4 h-4" />
              Print Itinerary
            </button>

            <button
              id="generate-again-btn"
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold text-sm transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <RefreshCw className="w-4 h-4" />
              Generate Again
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. Day-wise Itinerary + Budget / Packing sidebar ─────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Daily Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl print:border-none print:shadow-none">
            
            {/* Day tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin border-b border-slate-100 dark:border-slate-800 print:hidden">
              {plan.itinerary.map((dayPlan) => (
                <button
                  key={dayPlan.day}
                  onClick={() => setActiveDay(dayPlan.day)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    activeDay === dayPlan.day
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md'
                      : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Day {dayPlan.day}
                </button>
              ))}
            </div>

            <div className="hidden print:block mb-4">
              <h3 className="text-xl font-bold text-slate-800">📅 Day-by-Day Schedule</h3>
            </div>

            {/* Active Day Header */}
            <div className="mb-6">
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">
                Day {activeDay}: {currentDayData.theme}
              </h3>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
                Suggested activities carefully budgeted for your travel preferences
              </p>
            </div>

            {/* Activity Cards */}
            <div className="space-y-6">
              {currentDayData.activities.map((act, index) => {
                const timeCfg = TIME_ICONS[act.time] || { icon: Compass, color: "text-slate-500 bg-slate-50" };
                const Icon = timeCfg.icon;

                return (
                  <div 
                    key={`${act.time}-${index}`} 
                    className="flex gap-4 p-5 rounded-2xl border border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/50 hover:border-slate-100 dark:hover:border-slate-700 transition-all group"
                  >
                    <div className={`p-3 rounded-xl h-12 w-12 flex items-center justify-center flex-shrink-0 ${timeCfg.color} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="text-base font-bold text-slate-800 dark:text-slate-100">
                          {act.title}
                        </h4>
                        
                        <div className="flex items-center gap-3 text-xs font-semibold text-slate-400 dark:text-slate-500">
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {act.time}
                          </span>
                          <span>•</span>
                          <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-bold">
                            ₹{act.cost.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                        {act.description}
                      </p>

                      <div className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                        Location: {act.location}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right sidebar: Budget + Packing */}
        <div className="space-y-6">
          <BudgetVisualizer 
            breakdown={plan.budgetBreakdown} 
            totalBudget={plan.budget} 
          />
          <PackingChecklist 
            items={plan.packingList} 
          />
        </div>
      </div>

      {/* ── 3. Top Places to Visit ───────────────────────────────────── */}
      <TopPlaces places={plan.topPlaces} />

      {/* ── 4. Local Food Recommendations ────────────────────────────── */}
      <LocalFoods foods={plan.localFoods} />

      {/* ── 5. Hidden Gems + Money Saving Tips — 2 column ────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <HiddenGems gems={plan.hiddenGems} />
        <MoneySavingTips tips={plan.moneySavingTips} />
      </div>

      {/* ── 6. Weather, Local Tips, Safety Tips ──────────────────────── */}
      <GuideSection 
        weather={plan.weatherAdvisory} 
        tips={plan.localTips}
        safetyTips={plan.safetyTips}
      />
    </div>
  );
};
