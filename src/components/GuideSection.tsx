import React from 'react';
import { SunDim, ShieldCheck, Info, AlertTriangle } from 'lucide-react';

interface GuideSectionProps {
  weather: string;
  tips: string[];
  safetyTips: string[];
}

export const GuideSection: React.FC<GuideSectionProps> = ({ weather, tips, safetyTips }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weather Advisory Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex gap-4">
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-500 flex-shrink-0 h-12 w-12 flex items-center justify-center">
            <SunDim className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="text-md font-bold text-slate-800 dark:text-slate-100 mb-1">
              🌤️ Weather Advisory
            </h4>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              {weather}
            </p>
          </div>
        </div>

        {/* Local Travel Tips Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-md font-bold text-slate-800 dark:text-slate-100">
              💡 Smart Travel Tips
            </h4>
          </div>
          <ul className="space-y-2.5">
            {tips.map((tip, index) => (
              <li key={index} className="flex gap-2.5 items-start text-sm">
                <Info className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5" />
                <span className="font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                  {tip}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Safety Tips — Full Width */}
      <div className="bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/20 text-rose-500">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h4 className="text-md font-bold text-slate-800 dark:text-slate-100">
            ⚠️ Safety Tips
          </h4>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
          {safetyTips.map((tip, index) => (
            <li key={index} className="flex gap-2.5 items-start text-sm">
              <span className="text-rose-400 dark:text-rose-500 font-bold mt-0.5 flex-shrink-0">•</span>
              <span className="font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                {tip}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
