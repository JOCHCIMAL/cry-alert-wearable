import { useState, useEffect, useRef, useCallback } from 'react';

export const useAudioDetection = (threshold: number = 0.2, onThresholdExceeded?: () => void) => {
  const [volume, setVolume] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const startMonitoring = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass();
      audioContextRef.current = audioContext;
      
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;
      
      setIsActive(true);
      setError(null);
      updateVolume();
    } catch (err) {
      setError('Microphone access denied or not available.');
      console.error(err);
    }
  };

  const stopMonitoring = useCallback(() => {
    setIsActive(false);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  }, []);

  const updateVolume = useCallback(() => {
    if (!analyserRef.current) return;
    
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteTimeDomainData(dataArray);
    
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      const v = (dataArray[i] - 128) / 128;
      sum += v * v;
    }
    
    const rms = Math.sqrt(sum / bufferLength);
    setVolume(rms);
    
    if (rms > threshold && onThresholdExceeded) {
      onThresholdExceeded();
    }
    
    animationFrameRef.current = requestAnimationFrame(updateVolume);
  }, [threshold, onThresholdExceeded]);

  useEffect(() => {
    return () => {
      stopMonitoring();
    };
  }, [stopMonitoring]);

  return { volume, isActive, error, startMonitoring, stopMonitoring };
};