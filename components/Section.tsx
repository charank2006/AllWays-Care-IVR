
import React from 'react';

interface SectionProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, subtitle, icon, children }) => {
  return (
    <section className="bg-brand-surface p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-start sm:items-center space-x-4 mb-6 border-b border-slate-200 pb-4">
        {icon && <div className="text-brand-blue bg-blue-100 p-3 rounded-full">{icon}</div>}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary">{title}</h2>
          {subtitle && <p className="text-sm sm:text-base text-brand-text-secondary mt-1">{subtitle}</p>}
        </div>
      </div>
      <div>
        {children}
      </div>
    </section>
  );
};
