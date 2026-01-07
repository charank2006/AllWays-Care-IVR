
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center py-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-brand-text-primary tracking-tight">
        AllWays Care IVR Simulator
      </h1>
      <p className="mt-1 text-md text-brand-text-secondary">
        Use the keypad to navigate the call flow.
      </p>
    </header>
  );
};
