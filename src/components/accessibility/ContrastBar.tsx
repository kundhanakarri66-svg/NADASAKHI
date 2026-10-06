import React from 'react';
import { useAccessibility } from '../../hooks/useAccessibility.tsx';
import { Sparkles, Type } from 'lucide-react';

export const ContrastBar: React.FC = () => {
  const { settings, updateSetting } = useAccessibility();

  return (
    <div
      role="region"
      aria-label="Quick accessibility controls"
      className="flex items-center gap-2 p-2 bg-slate-100 rounded-lg text-xs"
    >
      <button
        onClick={() => updateSetting('largeText', !settings.largeText)}
        className={`px-2.5 py-1 rounded font-medium flex items-center gap-1 transition-colors cursor-pointer ${
          settings.largeText ? 'bg-teal-700 text-white' : 'text-slate-700 hover:bg-slate-200'
        }`}
      >
        <Type className="w-3.5 h-3.5" />
        <span>Large Text</span>
      </button>

      <button
        onClick={() => updateSetting('highContrast', !settings.highContrast)}
        className={`px-2.5 py-1 rounded font-medium flex items-center gap-1 transition-colors cursor-pointer ${
          settings.highContrast ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-200'
        }`}
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>High Contrast</span>
      </button>
    </div>
  );
};
