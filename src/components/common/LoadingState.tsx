import React from 'react';
import { Loader2 } from 'lucide-react';

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading data...',
  className = ''
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <Loader2 className="w-6 h-6 animate-spin text-teal-600 mb-2.5" aria-hidden="true" />
      <span className="text-sm font-medium text-slate-600">{message}</span>
      <span className="sr-only">Please wait, content is loading.</span>
    </div>
  );
};
