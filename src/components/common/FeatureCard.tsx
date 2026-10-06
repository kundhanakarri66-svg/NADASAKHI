import React from 'react';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  badge?: string;
  accentColor?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  to,
  badge
}) => {
  return (
    <Link
      to={to}
      className="group relative flex flex-col justify-between p-5 bg-white rounded-xl border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-teal-300 transition-all duration-200 focus-visible:outline-teal-600 focus-visible:outline-2"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors duration-200">
            <Icon className="w-5 h-5" aria-hidden="true" />
          </div>
          {badge && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-base font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
          {title}
        </h3>
        <p className="mt-1 text-xs text-slate-500 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700 group-hover:text-teal-800">
        <span>Open module</span>
        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
      </div>
    </Link>
  );
};
