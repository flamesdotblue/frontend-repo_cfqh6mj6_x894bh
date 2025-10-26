import React from 'react';
import { Rocket } from 'lucide-react';

const HeaderBrand = () => {
  return (
    <header className="w-full flex items-center justify-between py-4 px-6">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 blur-xl rounded-full bg-lime-400/30" />
          <div className="relative h-10 w-10 rounded-xl bg-neutral-900/80 ring-1 ring-lime-400/50 shadow-[0_0_30px_rgba(190,255,0,0.35)] grid place-items-center">
            <Rocket className="h-5 w-5 text-lime-300" />
          </div>
        </div>
        <span className="text-lime-200 font-semibold tracking-wide">EduVibe</span>
      </div>
      <div className="text-xs text-neutral-400">
        Inspired by Agency Accelerator & Educate.io aesthetics
      </div>
    </header>
  );
};

export default HeaderBrand;
