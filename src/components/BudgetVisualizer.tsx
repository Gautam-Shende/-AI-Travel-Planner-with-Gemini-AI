import React from 'react';
import { Car, Home, Utensils, Compass, ShoppingBag, IndianRupee } from 'lucide-react';
import type { BudgetAllocation } from '../services/travelPlanner';

interface BudgetVisualizerProps {
  breakdown: BudgetAllocation[];
  totalBudget: number;
}

const CATEGORY_STYLES: Record<string, { icon: any; color: string; bg: string; barColor: string }> = {
  "Transport": {
    icon: Car,
    color: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-50 dark:bg-sky-950/30",
    barColor: "bg-sky-500"
  },
  "Hotel": {
    icon: Home,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    barColor: "bg-emerald-500"
  },
  "Food": {
    icon: Utensils,
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    barColor: "bg-rose-500"
  },
  "Attractions": {
    icon: Compass,
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    barColor: "bg-indigo-500"
  },
  "Shopping": {
    icon: ShoppingBag,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    barColor: "bg-amber-500"
  }
};

export const BudgetVisualizer: React.FC<BudgetVisualizerProps> = ({ breakdown, totalBudget }) => {
  const actualTotal = breakdown.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-emerald-500" />
          💰 Budget Breakdown
        </h4>
      </div>

      <div className="space-y-5">
        {breakdown.map((item) => {
          const style = CATEGORY_STYLES[item.category] || {
            icon: Compass,
            color: "text-slate-600 dark:text-slate-400",
            bg: "bg-slate-50 dark:bg-slate-800",
            barColor: "bg-slate-500"
          };
          const Icon = style.icon;

          return (
            <div key={item.category} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-lg ${style.bg} ${style.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {item.category}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    ₹{item.amount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 ml-1.5 font-medium">
                    ({item.percentage}%)
                  </span>
                </div>
              </div>

              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${style.barColor}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Estimated Cost */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
          Total Estimated Cost
        </span>
        <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
          ₹{actualTotal.toLocaleString('en-IN')}
        </span>
      </div>
      {actualTotal <= totalBudget && (
        <p className="text-xs font-semibold text-emerald-500 dark:text-emerald-400 mt-1.5 text-right">
          ✓ Within your ₹{totalBudget.toLocaleString('en-IN')} budget
        </p>
      )}
    </div>
  );
};
