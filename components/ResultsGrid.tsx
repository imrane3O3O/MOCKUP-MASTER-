import React from 'react';
import type { Result } from '../types';
import { ResultCard } from './ResultCard';

interface ResultsGridProps {
  results: Result[];
  onEdit: (result: Result) => void;
  onView: (result: Result) => void;
}

export const ResultsGrid: React.FC<ResultsGridProps> = ({ results, onEdit, onView }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-content-100 mb-4">2. Generated Results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result) => (
          <ResultCard 
            key={result.id} 
            result={result} 
            onEdit={() => onEdit(result)}
            onView={() => onView(result)} 
          />
        ))}
      </div>
    </div>
  );
};
