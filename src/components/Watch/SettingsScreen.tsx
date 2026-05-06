import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Volume2, Sliders, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface SettingsScreenProps {
  onClose: () => void;
  threshold: number;
  setThreshold: (val: number) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onClose, threshold, setThreshold }) => {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="w-full h-full bg-slate-900 flex flex-col p-6 text-white"
    >
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white">
          <ArrowLeft size={20} />
        </Button>
        <h2 className="text-lg font-bold">Settings</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Volume2 size={14} /> Sensitivity
            </span>
            <span className="font-mono text-purple-400">{Math.round((1 - threshold) * 100)}%</span>
          </div>
          <Slider 
            value={[1 - threshold]} 
            min={0} 
            max={1} 
            step={0.05} 
            onValueChange={(val) => setThreshold(1 - val[0])}
            className="cursor-pointer"
          />
          <p className="text-[9px] text-slate-500 leading-tight">
            Higher sensitivity triggers alarm with quieter shouts.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Info size={14} /> Information
          </div>
          <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800 text-[10px] text-slate-400 space-y-2">
            <p>• Monitors ambient volume levels.</p>
            <p>• Triggers alarm on rapid volume spikes.</p>
            <p>• Hold cancel for 3s to stop alarm.</p>
          </div>
        </div>

        <div className="mt-auto">
             <div className="flex items-center justify-center p-4">
                <img 
                    src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/edd4dd1d-0021-4cd2-bb35-0942ece4a2de/safety-logo-5aba81af-1778025880413.webp" 
                    alt="Safety Logo" 
                    className="w-12 h-12 rounded-lg opacity-50 grayscale contrast-125"
                />
             </div>
             <p className="text-center text-[8px] text-slate-600 uppercase tracking-widest font-bold">SafeGuard v1.0.4</p>
        </div>
      </div>
    </motion.div>
  );
};