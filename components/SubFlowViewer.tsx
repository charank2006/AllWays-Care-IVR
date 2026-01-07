
import React from 'react';
// FIX: import TranslatableString to use in type assertion
import type { MainMenuOption, SubFlow, TranslatableString } from '../types';
import { Section } from './Section';
import { CheckCircleIcon } from './Icons';

interface SubFlowViewerProps {
  activeSubFlow: MainMenuOption | null;
}

const renderOptionsTable = (options: SubFlow['options']) => {
  if (!options || options.length === 0) return null;

  const firstOption = options[0];
  const headers = Object.keys(firstOption).filter(key => key !== 'isVoiceOnly');

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full divide-y divide-slate-200 border border-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {headers.map(header => (
              <th key={header} scope="col" className="px-4 py-2 text-left text-xs font-medium text-brand-text-secondary uppercase tracking-wider capitalize">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {options.map((option, index) => (
            <tr key={index}>
              {headers.map(header => (
                <td key={header} className="px-4 py-3 whitespace-pre-wrap text-sm text-brand-text-secondary">
                  {/* FIX: Correctly render TranslatableString or primitive values in table cells */}
                  {(() => {
                    const value = (option as any)[header];
                    if (value && typeof value === 'object' && 'en' in value) {
                      return (value as TranslatableString).en;
                    }
                    return String(value || '—');
                  })()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const SubFlowViewer: React.FC<SubFlowViewerProps> = ({ activeSubFlow }) => {
  if (!activeSubFlow || !activeSubFlow.subFlow) {
    return (
      <div className="text-center py-12 px-6 bg-brand-surface rounded-xl border-2 border-dashed border-slate-300">
        <p className="text-lg font-medium text-brand-text-secondary">Select an option from the Main Menu to view its sub-flow details.</p>
      </div>
    );
  }

  const { subFlow } = activeSubFlow;

  return (
    <div className="animate-fade-in">
        {/* FIX: Use .en property of TranslatableString for display */}
        <Section title={`Step 3: Sub-Menu and Feature Flow → ${activeSubFlow.feature.en}`}>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                {/* FIX: Use .en property of TranslatableString for display */}
                <p className="text-lg font-semibold text-brand-text-primary">{subFlow.title.en}</p>
                {/* FIX: Use .en property of TranslatableString for display */}
                <p className="text-brand-text-secondary mt-1 italic">"{subFlow.prompt.en}"</p>
            </div>
            
            {renderOptionsTable(subFlow.options)}

            {subFlow.notes && subFlow.notes.length > 0 && (
                <div className="mt-6">
                    <h4 className="font-semibold text-brand-text-primary mb-2">Additional Information:</h4>
                    <ul className="space-y-2">
                        {subFlow.notes.map((note, index) => (
                        <li key={index} className="flex items-start">
                            <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"/>
                            <span className="text-brand-text-secondary text-sm">{note}</span>
                        </li>
                        ))}
                    </ul>
                </div>
            )}
        </Section>
    </div>
  );
};
