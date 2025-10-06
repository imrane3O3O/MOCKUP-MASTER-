
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => {
  return (
    <header className="p-4 sm:p-6 lg:p-8 text-center border-b border-base-300">
      <div className="flex items-center justify-center gap-3">
        <SparklesIcon className="w-8 h-8 text-brand-secondary" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
          Mockup Master Pro
        </h1>
      </div>
      <p className="mt-3 text-lg text-content-200 max-w-2xl mx-auto">
        AI-powered mockups. Upload your product, choose a style, and generate infinite professional variations.
      </p>
    </header>
  );
};
