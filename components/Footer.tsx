
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-brand-text-secondary text-sm">
          &copy; {new Date().getFullYear()} AllWays Care. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
