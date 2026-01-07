
import React from 'react';
import { PhoneIcon, PhoneXMarkIcon, ArrowUturnLeftIcon } from './Icons';

interface KeypadProps {
  onKeyPress: (key: string) => void;
}

const KeyButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  subText?: string;
  className?: string;
  ariaLabel: string;
}> = ({ onClick, children, subText, className = '', ariaLabel }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className={`relative flex flex-col items-center justify-center h-14 w-full bg-slate-600 text-white rounded-lg transition-all duration-100 active:bg-slate-500 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-lightblue ${className}`}
  >
    <span className="text-xl font-bold leading-none">{children}</span>
    {subText && <span className="text-[10px] mt-1 font-medium opacity-70 uppercase tracking-tighter">{subText}</span>}
  </button>
);

const NavButton: React.FC<{
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
    ariaLabel: string;
}> = ({ onClick, className = '', children, ariaLabel }) => (
    <button
        onClick={onClick}
        aria-label={ariaLabel}
        className={`bg-slate-500 text-white flex items-center justify-center transition-all active:bg-slate-400 active:scale-90 ${className}`}
    >
        {children}
    </button>
);

export const Keypad: React.FC<KeypadProps> = ({ onKeyPress }) => {
  const keys = [
    { k: '1', s: ' \u00A0 ' }, { k: '2', s: 'ABC' }, { k: '3', s: 'DEF' },
    { k: '4', s: 'GHI' }, { k: '5', s: 'JKL' }, { k: '6', s: 'MNO' },
    { k: '7', s: 'PQRS' }, { k: '8', s: 'TUV' }, { k: '9', s: 'WXYZ' },
    { k: '*', s: ' \u00A0 ' }, { k: '0', s: '+' }, { k: '#', s: ' \u00A0 ' },
  ];

  return (
    <div className="p-3 bg-slate-700 rounded-lg">
        {/* Navigation Cluster */}
        <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-32 bg-slate-800 rounded-full border-4 border-slate-600 overflow-hidden shadow-inner flex items-center justify-center">
                {/* D-Pad Buttons */}
                <NavButton 
                  onClick={() => onKeyPress('UP')} 
                  ariaLabel="Nav Up"
                  className="absolute top-0 w-full h-8 rounded-t-full"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"/></svg>
                </NavButton>
                <NavButton 
                  onClick={() => onKeyPress('DOWN')} 
                  ariaLabel="Nav Down"
                  className="absolute bottom-0 w-full h-8 rounded-b-full"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </NavButton>
                <NavButton 
                  onClick={() => onKeyPress('LEFT')} 
                  ariaLabel="Nav Left"
                  className="absolute left-0 h-full w-8 rounded-l-full"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"/></svg>
                </NavButton>
                <NavButton 
                  onClick={() => onKeyPress('RIGHT')} 
                  ariaLabel="Nav Right"
                  className="absolute right-0 h-full w-8 rounded-r-full"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/></svg>
                </NavButton>
                {/* Center OK Button */}
                <button 
                    onClick={() => onKeyPress('SELECT')}
                    className="w-14 h-14 bg-slate-200 rounded-full text-slate-900 font-bold text-xs shadow-md active:bg-white active:scale-90"
                >
                    OK
                </button>
            </div>
        </div>

        {/* Call/End and Numbers */}
        <div className="grid grid-cols-3 gap-3">
             <KeyButton
                onClick={() => onKeyPress('CALL')}
                className="bg-green-600 active:bg-green-500 h-12"
                ariaLabel="Call"
             >
                <PhoneIcon className="w-5 h-5"/>
            </KeyButton>
            <div className="flex items-center justify-center text-slate-400 font-bold text-[9px] uppercase tracking-tighter">ALLWAYS CARE</div>
             <KeyButton
                onClick={() => onKeyPress('END')}
                className="bg-red-600 active:bg-red-500 h-12"
                ariaLabel="End call"
             >
                <PhoneXMarkIcon className="w-5 h-5"/>
            </KeyButton>

            {keys.map((item) => (
            <KeyButton
                key={item.k}
                subText={item.s}
                onClick={() => onKeyPress(item.k === '*' ? 'BACK' : item.k)}
                ariaLabel={`Key ${item.k === '*' ? 'star' : item.k === '#' ? 'hash' : item.k}`}
            >
                {item.k === '*' ? <ArrowUturnLeftIcon className="w-5 h-5" /> : item.k}
            </KeyButton>
            ))}
        </div>
    </div>
  );
};
