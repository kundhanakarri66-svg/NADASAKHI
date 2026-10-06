import React from 'react';

export interface DecibelMeterProps {
  level: number; // 0 - 100 dB
  isListening: boolean;
  threshold?: number;
}

export const DecibelMeter: React.FC<DecibelMeterProps> = ({
  level,
  isListening,
  threshold = 70
}) => {
  const percentage = Math.min(100, Math.max(0, level));
  const isAboveThreshold = level >= threshold;

  return (
    <div className="w-full space-y-1.5" role="meter" aria-valuenow={level} aria-valuemin={0} aria-valuemax={100}>
      <div className="flex justify-between text-xs text-slate-600">
        <span className="font-medium">Sound Level</span>
        <span className="font-mono tabular-nums font-semibold">
          {isListening ? `${level} dB` : 'Inactive'}
        </span>
      </div>
      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 rounded-full ${
            isAboveThreshold ? 'bg-amber-500' : 'bg-teal-600'
          }`}
          style={{ width: `${isListening ? percentage : 0}%` }}
        />
      </div>
    </div>
  );
};
