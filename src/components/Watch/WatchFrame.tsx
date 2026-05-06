import React from 'react';
import { motion } from 'framer-motion';

interface WatchFrameProps {
  children: React.ReactNode;
}

export const WatchFrame: React.FC<WatchFrameProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 p-4">
      {/* Watch Straps */}
      <div className="relative flex flex-col items-center">
        {/* Top Strap */}
        <div className="w-24 h-32 bg-slate-800 rounded-t-3xl shadow-inner mb-[-20px] relative overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-10 bg-slate-700/50" />
        </div>

        {/* Watch Body */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-72 h-72 md:w-80 md:h-80 rounded-[4rem] bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-3 shadow-2xl border-[6px] border-slate-600 z-10"
        >
          {/* Side Button (Crown) */}
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-12 bg-slate-600 rounded-r-lg border-y border-r border-slate-500 shadow-lg" />
          
          {/* Screen */}
          <div className="w-full h-full rounded-[3.5rem] bg-black overflow-hidden relative border-4 border-slate-950 flex flex-col items-center justify-center">
            {children}
            
            {/* Screen Reflections */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10 bg-gradient-to-tr from-transparent via-white to-transparent" />
          </div>
        </motion.div>

        {/* Bottom Strap */}
        <div className="w-24 h-32 bg-slate-800 rounded-b-3xl shadow-inner mt-[-20px] relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-10 bg-slate-700/50" />
            {/* Strap Holes */}
            <div className="flex flex-col items-center gap-4 mt-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className="w-3 h-6 bg-slate-900/50 rounded-full" />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};