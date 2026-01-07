
import React from 'react';
import { Section } from './Section';
import { GlobeAltIcon } from './Icons';

interface ImpactSummaryListProps {
  impactPoints: string[];
}

export const ImpactSummaryList: React.FC<ImpactSummaryListProps> = ({ impactPoints }) => {
  return (
    <Section title="Impact Summary" icon={<GlobeAltIcon className="w-8 h-8"/>}>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        {impactPoints.map((point, index) => (
          <li key={index} className="flex items-start">
            <svg className="flex-shrink-0 h-6 w-6 text-brand-lightblue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="ml-3 text-brand-text-secondary">{point}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
};
