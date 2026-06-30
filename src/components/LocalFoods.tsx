import React from 'react';
import { Utensils } from 'lucide-react';
import type { FoodRecommendation } from '../services/travelPlanner';

interface LocalFoodsProps {
  foods: FoodRecommendation[];
}

export const LocalFoods: React.FC<LocalFoodsProps> = ({ foods }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/20 text-rose-500">
          <Utensils className="w-5 h-5" />
        </div>
        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          🍜 Local Food Recommendations
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {foods.map((food, index) => (
          <div
            key={index}
            className="p-4 rounded-xl border border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/50 hover:border-rose-200 dark:hover:border-rose-900/40 transition-all group"
          >
            <h5 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1.5 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
              {food.dish}
            </h5>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
              {food.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
