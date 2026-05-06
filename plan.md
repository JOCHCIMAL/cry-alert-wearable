# Safety Watch - Voice-Activated Danger Alarm

A smartwatch-styled application that monitors ambient sound levels to detect screams or loud shouts, triggering a visual and audio alarm.

## UI/UX Design
- **Style**: OLED Dark Mode / Glassmorphism. High contrast for visibility.
- **Form Factor**: Circular smartwatch interface centered on the screen.
- **Color Palette**: 
  - Background: #000000 (OLED Black)
  - Primary: #7C3AED (Safety Purple)
  - Alert: #EF4444 (Danger Red)
  - Text: #FFFFFF

## Features
- **Sound Monitoring**: Real-time microphone input analysis using Web Audio API.
- **Smart Detection**: Triggers alarm when volume threshold is exceeded for a specific duration (to avoid false positives from short spikes).
- **Alarm Mode**:
  - Pulsing red background.
  - High-decibel simulated alarm sound.
  - "CANCEL" button with 3-second hold to stop (safety feature).
  - Simulated "Emergency Services Notified" message.
- **Settings**:
  - Sensitivity adjustment slider.
  - Enable/Disable toggle.
- **Heart Rate Simulation**: Adding a pulsing heart icon for watch realism.

## Technical Stack
- React 19, Vite, Tailwind CSS.
- `framer-motion` for watch animations and pulsing alerts.
- `lucide-react` for icons (Mic, Shield, Alert, Settings).
- `sonner` for status notifications.
- Web Audio API (AnalyserNode) for sound detection.

## Components
- `WatchFrame`: Wrapper that creates the physical watch look.
- `WatchFace`: Main display showing status, time, and heart rate.
- `AlarmScreen`: High-visibility screen shown during danger detection.
- `SettingsScreen`: Menu for adjusting sensitivity.
- `useAudioDetection`: Hook managing the microphone and volume logic.
