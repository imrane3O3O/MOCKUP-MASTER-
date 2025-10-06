import React, { useState } from 'react';
import type { Result } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';
import { EditIcon } from './icons/EditIcon';
import { CodeIcon } from './icons/CodeIcon';
import { ExpandIcon } from './icons/ExpandIcon';

interface ResultCardProps {
  result: Result;
  onEdit: () => void;
  onView: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onEdit, onView }) => {
  const [showPrompt, setShowPrompt] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${result.b64}`;
    link.download = `mockup-${result.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-base-300 rounded-lg overflow-hidden shadow-lg group relative">
      <img
        src={`data:image/png;base64,${result.b64}`}
        alt="Generated mockup"
        className="w-full h-auto aspect-square object-cover"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={handleDownload} title="Download Image" className="p-3 bg-white/20 rounded-full hover:bg-brand-primary transition-colors text-white">
            <DownloadIcon className="w-6 h-6" />
          </button>
           <button onClick={onView} title="View Fullscreen" className="p-3 bg-white/20 rounded-full hover:bg-brand-primary transition-colors text-white">
            <ExpandIcon className="w-6 h-6" />
          </button>
          <button onClick={onEdit} title="Edit Prompt" className="p-3 bg-white/20 rounded-full hover:bg-brand-primary transition-colors text-white">
            <EditIcon className="w-6 h-6" />
          </button>
           <button onClick={() => setShowPrompt(!showPrompt)} title="Show Prompt" className="p-3 bg-white/20 rounded-full hover:bg-brand-primary transition-colors text-white">
            <CodeIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      {showPrompt && (
        <div className="absolute inset-0 bg-base-100/95 p-4 overflow-y-auto" onClick={() => setShowPrompt(false)}>
            <h4 className="font-bold text-content-100 mb-2">Prompt Used:</h4>
            <p className="text-xs text-content-200 break-words">{result.prompt}</p>
        </div>
      )}
    </div>
  );
};
