import React from 'react';
import { Gem } from 'lucide-react';
import type { PlaceRecommendation } from '../services/travelPlanner';

interface HiddenGemsProps {
  gems: PlaceRecommendation[];
}

export const HiddenGems: React.FC<HiddenGemsProps> = ({ gems }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-amber-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-500">
          <Gem className="w-5 h-5" />
        </div>
        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          ⭐ Hidden Gems
        </h4>
        <span className="text-xs font-semibold text-amber-500 dark:text-amber-400 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/30 ml-auto">
          Less Crowded
        </span>
      </div>

      <div className="space-y-4">
        {gems.map((gem, index) => (
          <div
            key={index}
            className="flex gap-4 p-4 rounded-xl border border-amber-50 dark:border-slate-800 bg-amber-50/20 dark:bg-slate-900/50 hover:border-amber-200 dark:hover:border-amber-900/30 transition-all group"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Gem className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h5 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {gem.name}
              </h5>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                {gem.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
