import React from 'react';
import { Hand } from 'lucide-react';

export interface SignAvatarPreviewProps {
  currentGloss?: string;
  isActive?: boolean;
}

export const SignAvatarPreview: React.FC<SignAvatarPreviewProps> = ({
  currentGloss,
  isActive = false
}) => {
  return (
    <div className="relative aspect-video w-full rounded-xl bg-slate-950 flex flex-col items-center justify-center text-white border border-slate-800 overflow-hidden">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${
        isActive ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-800 text-slate-500'
      }`}>
        <Hand className="w-7 h-7" />
      </div>
      <span className="text-xs font-semibold text-slate-300">
        {currentGloss ? `Gloss: [${currentGloss}]` : 'Sign Avatar Model Standby'}
      </span>
      <span className="text-[11px] text-slate-500 mt-0.5">
        MediaPipe landmark kinematics prepared for Step 2
      </span>
    </div>
  );
};
