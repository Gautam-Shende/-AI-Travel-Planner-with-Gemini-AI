import React, { useState } from 'react';
import { CheckSquare, Square, PackageOpen } from 'lucide-react';

interface PackingChecklistProps {
  items: string[];
}

export const PackingChecklist: React.FC<PackingChecklistProps> = ({ items }) => {
  const [packedItems, setPackedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (item: string) => {
    setPackedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const packedCount = Object.values(packedItems).filter(Boolean).length;
  const totalCount = items.length;
  const progressPercent = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <PackageOpen className="w-5 h-5 text-indigo-500" />
          Packing Checklist
        </h4>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
          {packedCount}/{totalCount} Packed
        </span>
      </div>

      {/* Progress slider bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-5">
        <div 
          className="bg-indigo-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1">
        {items.map((item, index) => {
          const isPacked = !!packedItems[item];
          return (
            <button
              key={`${item}-${index}`}
              onClick={() => toggleItem(item)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                isPacked 
                  ? 'border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-950/10 text-slate-400 dark:text-slate-500 line-through' 
                  : 'border-slate-100 dark:border-slate-800/80 bg-slate-50/30 dark:bg-slate-900 hover:border-slate-200 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {isPacked ? (
                <CheckSquare className="w-5 h-5 text-indigo-500 flex-shrink-0" />
              ) : (
                <Square className="w-5 h-5 text-slate-400 dark:text-slate-600 flex-shrink-0" />
              )}
              <span className="text-sm font-medium leading-relaxed">{item}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
