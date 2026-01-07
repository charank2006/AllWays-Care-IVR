
import React from 'react';
import { PhoneScreen } from './PhoneScreen';
import { Keypad } from './Keypad';

interface PhoneSimulatorProps {
  displayText: string[];
  onKeyPress: (key: string) => void;
  status: 'IDLE' | 'ACTIVE';
  screenRef: React.RefObject<HTMLDivElement>;
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({ displayText, onKeyPress, status, screenRef }) => {
  return (
    <div className="relative w-full max-w-[320px] mx-auto bg-slate-900 rounded-[3rem] p-5 border-[6px] border-slate-700 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col space-y-4">
      {/* Speaker Grill */}
      <div className="w-16 h-1.5 bg-slate-800 mx-auto rounded-full mb-2"></div>
      
      <PhoneScreen ref={screenRef} textLines={displayText} />
      <Keypad onKeyPress={onKeyPress} />
      
      {/* Home Stripe */}
      <div className="w-1/3 h-1 bg-slate-800 mx-auto rounded-full mt-2"></div>
    </div>
  );
};
