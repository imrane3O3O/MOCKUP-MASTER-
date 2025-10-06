
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-16 bg-base-300/50 rounded-lg text-center">
      <div className="w-16 h-16 border-4 border-t-brand-primary border-base-100 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-content-100">Generating amazing mockups...</p>
      <p className="text-sm text-content-200">This can take a moment. Please wait.</p>
    </div>
  );
};
