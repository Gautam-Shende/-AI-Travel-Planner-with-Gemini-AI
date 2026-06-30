import React from 'react';
import { PiggyBank } from 'lucide-react';

interface MoneySavingTipsProps {
  tips: string[];
}

export const MoneySavingTips: React.FC<MoneySavingTipsProps> = ({ tips }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500">
          <PiggyBank className="w-5 h-5" />
        </div>
        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          💡 Money Saving Tips
        </h4>
      </div>

      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li
            key={index}
            className="flex gap-3 items-start p-3 rounded-xl border border-slate-50 dark:border-slate-800 bg-emerald-50/10 dark:bg-slate-900/50 hover:border-emerald-200 dark:hover:border-emerald-900/30 transition-all"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-xs">
              {index + 1}
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              {tip}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
