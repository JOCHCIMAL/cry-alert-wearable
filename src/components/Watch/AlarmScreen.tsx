import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Phone, X, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AlarmScreenProps {
  onCancel: () => void;
}

export const AlarmScreen: React.FC<AlarmScreenProps> = ({ onCancel }) => {
  const [count, setCount] = useState(0);
  const [holding, setHolding] = useState(false);
  const HOLD_TIME = 3000; // 3 seconds

  useEffect(() => {
    let interval: any;
    if (holding) {
      const startTime = Date.now();
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        setCount(Math.min(100, (elapsed / HOLD_TIME) * 100));
        if (elapsed >= HOLD_TIME) {
          onCancel();
          clearInterval(interval);
        }
      }, 50);
    } else {
      setCount(0);
    }
    return () => clearInterval(interval);
  }, [holding, onCancel]);

  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-full h-full bg-red-600 flex flex-col items-center justify-center p-6 text-white relative overflow-hidden"
    >
      {/* Flashing Background Effect */}
      <motion.div 
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ repeat: Infinity, duration: 0.5 }}
        className="absolute inset-0 bg-white"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.4 }}
          className="mb-4 bg-white/20 p-4 rounded-full"
        >
          <ShieldAlert size={48} className="text-white" />
        </motion.div>
        
        <h2 className="text-2xl font-black uppercase mb-2">Danger Detected</h2>
        <p className="text-xs font-medium opacity-90 mb-6 max-w-[180px]">
          High volume sound detected. Emergency services are being notified.
        </p>

        <div className="flex flex-col gap-3 w-full max-w-[200px]">
            <Button 
                variant="secondary" 
                className="w-full rounded-2xl h-12 bg-white text-red-600 font-bold hover:bg-white/90"
            >
                <Phone className="mr-2" size={18} /> Call 911
            </Button>

            <div className="relative mt-2">
                <Button 
                    variant="outline"
                    onMouseDown={() => setHolding(true)}
                    onMouseUp={() => setHolding(false)}
                    onTouchStart={() => setHolding(true)}
                    onTouchEnd={() => setHolding(false)}
                    className="w-full rounded-2xl h-14 bg-red-700/50 border-white/30 text-white font-bold overflow-hidden relative"
                >
                    <span className="relative z-10">Hold to Cancel</span>
                    {/* Progress Bar Background */}
                    <div 
                        className="absolute left-0 bottom-0 h-full bg-white/30 transition-all duration-75"
                        style={{ width: `${count}%` }}
                    />
                </Button>
                <p className="text-[8px] uppercase mt-2 opacity-70 tracking-tighter">False Alarm? Hold button for 3 seconds</p>
            </div>
        </div>
      </div>
    </motion.div>
  );
};