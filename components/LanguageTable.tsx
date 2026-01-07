
import React from 'react';
import type { LanguageOption } from '../types';
import { Section } from './Section';
import { LanguageIcon } from './Icons';

interface LanguageTableProps {
  languages: LanguageOption[];
}

export const LanguageTable: React.FC<LanguageTableProps> = ({ languages }) => {
  return (
    <Section
      title="Step 1: Welcome and Language Selection"
      subtitle="Once selected, all subsequent prompts are delivered in the chosen language."
      icon={<LanguageIcon className="w-8 h-8"/>}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-brand-text-secondary uppercase tracking-wider">Key</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-brand-text-secondary uppercase tracking-wider">Language</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-brand-text-secondary uppercase tracking-wider">Voice Prompt Example</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {languages.map((lang) => (
              <tr key={lang.key}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-text-primary">{lang.key}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text-secondary">{lang.language}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text-secondary italic">"{lang.prompt}"</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
};
