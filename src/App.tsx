import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AccessibilityProvider } from './hooks/useAccessibility.tsx';
import { MainLayout } from './layouts/MainLayout.tsx';
import { Dashboard } from './pages/Dashboard.tsx';
import { SoundGuardian } from './pages/SoundGuardian.tsx';
import { SignToText } from './pages/SignToText.tsx';
import { TextToSign } from './pages/TextToSign.tsx';
import { SpeechToText } from './pages/SpeechToText.tsx';
import { Communication } from './pages/Communication.tsx';
import { Alerts } from './pages/Alerts.tsx';
import { Settings } from './pages/Settings.tsx';

export default function App() {
  return (
    <AccessibilityProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="sound-guardian" element={<SoundGuardian />} />
            <Route path="sign-to-text" element={<SignToText />} />
            <Route path="text-to-sign" element={<TextToSign />} />
            <Route path="speech-to-text" element={<SpeechToText />} />
            <Route path="communication" element={<Communication />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="settings" element={<Settings />} />
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AccessibilityProvider>
  );
}

