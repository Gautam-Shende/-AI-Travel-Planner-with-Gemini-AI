import React from 'react';
import { MapPin } from 'lucide-react';
import type { PlaceRecommendation } from '../services/travelPlanner';

interface TopPlacesProps {
  places: PlaceRecommendation[];
}

export const TopPlaces: React.FC<TopPlacesProps> = ({ places }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-950/20 text-sky-500">
          <MapPin className="w-5 h-5" />
        </div>
        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          📍 Top Places to Visit
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {places.map((place, index) => (
          <div
            key={index}
            className="flex gap-3.5 p-4 rounded-xl border border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/50 hover:border-sky-200 dark:hover:border-sky-900/40 transition-all group"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/30 text-sky-500 flex items-center justify-center font-black text-sm group-hover:scale-110 transition-transform">
              {index + 1}
            </div>
            <div className="space-y-1">
              <h5 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {place.name}
              </h5>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                {place.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
