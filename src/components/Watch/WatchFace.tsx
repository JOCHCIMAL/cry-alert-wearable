import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Settings, ShieldAlert, Heart, Battery, SignalHigh } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WatchFaceProps {
  onOpenSettings: () => void;
  isListening: boolean;
  onToggleListening: () => void;
  volume: number;
}

export const WatchFace: React.FC<WatchFaceProps> = ({ 
  onOpenSettings, 
  isListening, 
  onToggleListening,
  volume 
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-full h-full flex flex-col p-6 text-white relative select-none">
      {/* Status Bar */}
      <div className="flex justify-between items-center text-[10px] font-medium text-slate-400 mb-2">
        <div className="flex items-center gap-1">
          <SignalHigh size={12} />
          <span>LTE</span>
        </div>
        <div className="flex items-center gap-1">
          <span>98%</span>
          <Battery size={12} className="rotate-90" />
        </div>
      </div>

      {/* Main Time */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.h1 
          key={formatTime(time)}
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-bold tracking-tight mb-1 font-mono"
        >
          {formatTime(time)}
        </motion.h1>
        
        <div className="flex items-center gap-2 text-rose-500 mb-4">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          >
            <Heart size={14} fill="currentColor" />
          </motion.div>
          <span className="text-xs font-semibold uppercase tracking-widest">72 BPM</span>
        </div>

        {/* Audio Visualizer (Mini) */}
        {isListening && (
           <div className="flex items-end gap-[2px] h-8 mb-4">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-purple-500 rounded-full"
                animate={{ height: isListening ? Math.max(4, volume * 100 * (Math.random() * 0.5 + 0.5)) : 4 }}
                transition={{ duration: 0.1 }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <Button 
          variant="outline" 
          size="icon"
          onClick={onToggleListening}
          className={`w-full rounded-2xl h-12 border-slate-800 ${isListening ? 'bg-purple-600/20 border-purple-500/50 text-purple-400' : 'bg-slate-900/50 text-slate-400'}`}
        >
          {isListening ? <Mic size={20} /> : <MicOff size={20} />}
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={onOpenSettings}
          className="w-full rounded-2xl h-12 bg-slate-900/50 border-slate-800 text-slate-400"
        >
          <Settings size={20} />
        </Button>
      </div>

      {/* Safety Status */}
      <div className="absolute bottom-16 left-0 right-0 flex justify-center">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900/80 rounded-full border border-slate-800">
          <div className={`w-1.5 h-1.5 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`} />
          <span className="text-[9px] uppercase tracking-wider font-bold text-slate-300">
            {isListening ? 'SafeGuard Active' : 'Protection Off'}
          </span>
        </div>
      </div>
    </div>
  );
};