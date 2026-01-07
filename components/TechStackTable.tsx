
import React from 'react';
import type { TechStackItem } from '../types';
import { Section } from './Section';
import { WrenchScrewdriverIcon } from './Icons';

interface TechStackTableProps {
  techStack: TechStackItem[];
}

export const TechStackTable: React.FC<TechStackTableProps> = ({ techStack }) => {
  return (
    <Section title="Technical Overview" icon={<WrenchScrewdriverIcon className="w-8 h-8"/>}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-brand-text-secondary uppercase tracking-wider">Layer</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-brand-text-secondary uppercase tracking-wider">Technology</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-brand-text-secondary uppercase tracking-wider">Role</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {techStack.map((item) => (
              <tr key={item.layer}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-text-primary">{item.layer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text-secondary">{item.technology}</td>
                <td className="px-6 py-4 text-sm text-brand-text-secondary">{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
};
