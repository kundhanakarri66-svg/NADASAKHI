import React from 'react';
import { NavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

export interface NavigationItemProps {
  to: string;
  label: string;
  icon: LucideIcon;
  badge?: number | string;
  onClick?: () => void;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  to,
  label,
  icon: Icon,
  badge,
  onClick
}) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 select-none ${
          isActive
            ? 'bg-teal-700 text-white shadow-xs font-semibold'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className="flex items-center gap-3 truncate">
            <Icon
              className={`w-4 h-4 shrink-0 transition-colors ${
                isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'
              }`}
              aria-hidden="true"
            />
            <span className="truncate">{label}</span>
          </div>
          {badge !== undefined && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-mono tabular-nums font-semibold ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-teal-50 text-teal-800 border border-teal-100'
              }`}
            >
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
};
