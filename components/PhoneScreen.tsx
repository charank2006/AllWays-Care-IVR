
import React, { forwardRef, useEffect } from 'react';

interface PhoneScreenProps {
  textLines: string[];
}

export const PhoneScreen = forwardRef<HTMLDivElement, PhoneScreenProps>(
  ({ textLines }, ref) => {
    
    // Auto-scroll to top when content changes, using the passed ref
    useEffect(() => {
      if (ref && typeof ref !== 'function' && ref.current) {
        ref.current.scrollTop = 0;
      }
    }, [textLines, ref]);

    return (
      <div className="bg-slate-800 rounded-xl p-2 border-2 border-slate-700 shadow-inner">
        <div 
          ref={ref}
          className="relative h-60 bg-[#96b484] text-[#1a1c18] font-mono p-4 rounded shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] overflow-y-auto scroll-smooth"
        >
          {/* Scanline Effect Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-10 bg-[length:100%_2px,3px_100%]"></div>
          
          <div className="relative z-0">
            {textLines.map((line, index) => (
              <p key={index} className="text-[13px] leading-relaxed mb-1 font-bold whitespace-pre-wrap break-words">
                {line || ' '}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

PhoneScreen.displayName = 'PhoneScreen';
