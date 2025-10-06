
import React, { useState } from 'react';
import type { Result } from '../types';

interface EditModalProps {
  result: Result;
  onClose: () => void;
  onRegenerate: (result: Result, newPrompt: string) => void;
}

export const EditModal: React.FC<EditModalProps> = ({ result, onClose, onRegenerate }) => {
  const [prompt, setPrompt] = useState(result.prompt);

  const handleRegenerateClick = () => {
    onRegenerate(result, prompt);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-base-200 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-base-300">
          <h3 className="text-xl font-bold">Edit & Regenerate</h3>
          <p className="text-sm text-content-200">Modify the prompt to refine your mockup.</p>
        </div>

        <div className="p-6 flex-grow overflow-y-auto space-y-4">
          <div className="flex gap-4">
            <div className="w-1/3">
              <img src={`data:image/png;base64,${result.b64}`} alt="Editing mockup" className="rounded-lg w-full aspect-square object-cover" />
            </div>
            <div className="w-2/3">
              <label htmlFor="prompt" className="block text-sm font-medium text-content-200 mb-2">
                Prompt
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                rows={10}
                className="w-full bg-base-100 border border-base-300 text-content-100 rounded-md p-3 text-sm focus:ring-brand-primary focus:border-brand-primary transition"
              />
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-base-300 flex justify-end gap-4 bg-base-300/50 rounded-b-xl">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-base-300 rounded-lg hover:bg-base-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleRegenerateClick}
            className="py-2 px-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg hover:scale-105 transform transition-transform"
          >
            Regenerate
          </button>
        </div>
      </div>
    </div>
  );
};
