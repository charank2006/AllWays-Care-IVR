
import React from 'react';
import type { MainMenuOption } from '../types';
import { Section } from './Section';
import { MenuIcon } from './Icons';

interface MainMenuProps {
  menuOptions: MainMenuOption[];
  onSelect: (option: MainMenuOption) => void;
  activeKey?: string;
}

export const MainMenu: React.FC<MainMenuProps> = ({ menuOptions, onSelect, activeKey }) => {
  return (
    <Section
      title="Step 2: Main Menu"
      subtitle="Please choose a service from the options below to see the detailed sub-flow."
      icon={<MenuIcon className="w-8 h-8"/>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => onSelect(option)}
            className={`text-left p-4 rounded-lg border transition-all duration-200 ${
              activeKey === option.key
                ? 'bg-blue-100 border-brand-blue ring-2 ring-brand-blue shadow-lg'
                : 'bg-white hover:bg-slate-50 hover:shadow-md border-slate-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                activeKey === option.key ? 'bg-brand-blue text-white' : 'bg-slate-200 text-brand-text-secondary'
              }`}>
                {option.key}
              </div>
              {/* FIX: Use .en property of TranslatableString for display */}
              <p className="font-semibold text-brand-text-primary">{option.feature.en}</p>
            </div>
            {/* FIX: Use .en property of TranslatableString for display */}
            <p className="mt-2 text-sm text-brand-text-secondary ml-11">{option.description.en}</p>
          </button>
        ))}
      </div>
    </Section>
  );
};
