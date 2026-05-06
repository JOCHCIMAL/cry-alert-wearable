import { useState, useCallback, useEffect } from 'react';
import { WatchFrame } from './components/Watch/WatchFrame';
import { WatchFace } from './components/Watch/WatchFace';
import { AlarmScreen } from './components/Watch/AlarmScreen';
import { SettingsScreen } from './components/Watch/SettingsScreen';
import { useAudioDetection } from './hooks/useAudioDetection';
import { Toaster, toast } from 'sonner';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isAlarming, setIsAlarming] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [threshold, setThreshold] = useState(0.25);
  
  const handleDangerDetected = useCallback(() => {
    if (!isAlarming) {
      setIsAlarming(true);
      toast.error('DANGER DETECTED!', {
        description: 'Monitoring system detected high volume noise.',
        duration: 5000,
      });
    }
  }, [isAlarming]);

  const { volume, isActive, startMonitoring, stopMonitoring } = useAudioDetection(
    threshold,
    handleDangerDetected
  );

  // Alarm Sound Effect
  useEffect(() => {
    let interval: any;
    if (isAlarming) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        
        const playBeep = () => {
            if (ctx.state === 'suspended') ctx.resume();
            
            const oscillator = ctx.createOscillator();
            const gain = ctx.createGain();
            
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(1200, ctx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);
            
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
            
            oscillator.connect(gain);
            gain.connect(ctx.destination);
            
            oscillator.start();
            oscillator.stop(ctx.currentTime + 0.4);
        };
        
        playBeep();
        interval = setInterval(playBeep, 500);
        
        return () => {
            clearInterval(interval);
            ctx.close();
        };
    }
  }, [isAlarming]);

  const handleToggleProtection = () => {
    if (isActive) {
      stopMonitoring();
      toast.info('SafeGuard Disabled');
    } else {
      startMonitoring();
      toast.success('SafeGuard Enabled', {
        description: 'Listening for danger sounds...'
      });
    }
  };

  const cancelAlarm = () => {
    setIsAlarming(false);
    toast.success('Alarm Reset', {
      description: 'System back to normal mode.'
    });
  };

  return (
    <div className="min-h-screen bg-black selection:bg-purple-500/30">
      <WatchFrame>
        <AnimatePresence mode="wait">
          {isAlarming ? (
            <AlarmScreen key="alarm" onCancel={cancelAlarm} />
          ) : showSettings ? (
            <SettingsScreen 
              key="settings" 
              onClose={() => setShowSettings(false)} 
              threshold={threshold}
              setThreshold={setThreshold}
            />
          ) : (
            <WatchFace 
              key="face"
              isListening={isActive}
              volume={volume}
              onToggleListening={handleToggleProtection}
              onOpenSettings={() => setShowSettings(true)}
            />
          )}
        </AnimatePresence>
      </WatchFrame>
      
      <Toaster 
        richColors 
        position="bottom-center" 
        toastOptions={{
            style: {
                background: '#0f172a',
                color: '#fff',
                border: '1px solid #1e293b'
            }
        }} 
      />
    </div>
  );
}

export default App;