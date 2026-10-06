import React from 'react';

export interface ToggleProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  id,
  label,
  description,
  checked,
  onChange,
  disabled = false
}) => {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="flex flex-col">
        <label
          htmlFor={id}
          className={`text-sm font-medium ${
            disabled ? 'text-slate-400' : 'text-slate-900 cursor-pointer'
          }`}
        >
          {label}
        </label>
        {description && (
          <p className="text-xs text-slate-500 mt-0.5 max-w-md">{description}</p>
        )}
      </div>

      <button
        id={id}
        role="switch"
        type="button"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-teal-600 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
          checked ? 'bg-teal-700' : 'bg-slate-200'
        }`}
      >
        <span className="sr-only">{label}</span>
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};
