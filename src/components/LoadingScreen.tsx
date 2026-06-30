import React, { useEffect, useState } from 'react';
import { Compass, MapPin, Calendar, Utensils, Wallet } from 'lucide-react';

const LOADING_STEPS = [
  { text: "Mapping out optimal travel routes...", icon: Compass, color: "text-emerald-500" },
  { text: "Finding popular local attractions...", icon: MapPin, color: "text-indigo-500" },
  { text: "Curating top-rated food & dining spots...", icon: Utensils, color: "text-rose-500" },
  { text: "Aligning itinerary with your budget...", icon: Wallet, color: "text-amber-500" },
  { text: "Structuring daily tabs and schedules...", icon: Calendar, color: "text-sky-500" }
];

export const LoadingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle loading texts every 600ms
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 600);

    // Smoothly animate progress bar from 0 to 100 over 3000ms
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const StepIcon = LOADING_STEPS[currentStep].icon;

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] py-12 px-6 text-center animate-fade-in">
      {/* Outer spinning compass ring */}
      <div className="relative mb-8 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
        <div className="absolute flex items-center justify-center p-4 rounded-full bg-emerald-50 dark:bg-emerald-950/35 shadow-md">
          <StepIcon className={`w-10 h-10 ${LOADING_STEPS[currentStep].color} animate-pulse duration-1000`} />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 transition-all duration-300 animate-pulse">
        Planning your perfect journey...
      </h3>
      
      <p className="text-slate-500 dark:text-slate-400 font-medium h-8 mb-6 animate-pulse">
        {LOADING_STEPS[currentStep].text}
      </p>

      {/* Progress container */}
      <div className="w-full max-w-sm bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden mb-2">
        <div 
          className="bg-gradient-to-r from-emerald-500 to-indigo-600 h-full rounded-full transition-all duration-75 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
        {progress}% Completed
      </span>
    </div>
  );
};
