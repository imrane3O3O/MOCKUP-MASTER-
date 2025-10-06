import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Result } from '../types';
import { CloseIcon } from './icons/CloseIcon';
import { ZoomInIcon } from './icons/ZoomInIcon';
import { ZoomOutIcon } from './icons/ZoomOutIcon';
import { FitScreenIcon } from './icons/FitScreenIcon';

interface ImageViewerProps {
  result: Result;
  onClose: () => void;
  onRegenerate: (result: Result, newPrompt: string) => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ result, onClose, onRegenerate }) => {
  const [prompt, setPrompt] = useState(result.prompt);
  const [transform, setTransform] = useState({ scale: 1, posX: 0, posY: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetTransform = useCallback(() => {
    if (!containerRef.current || !imageRef.current) return;
    const { width: containerWidth, height: containerHeight } = containerRef.current.getBoundingClientRect();
    const { naturalWidth, naturalHeight } = imageRef.current;
    
    const scaleX = containerWidth / naturalWidth;
    const scaleY = containerHeight / naturalHeight;
    const scale = Math.min(scaleX, scaleY, 1);

    setTransform({ scale, posX: 0, posY: 0 });
  }, []);

  useEffect(() => {
    // Reset transform when the image result changes
    const img = new Image();
    img.src = `data:image/png;base64,${result.b64}`;
    img.onload = () => {
      resetTransform();
    };
  }, [result.id, resetTransform]);

  useEffect(() => {
    setPrompt(result.prompt);
  }, [result.prompt]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleZoom = (factor: number) => {
    setTransform(prev => ({
      ...prev,
      scale: Math.max(0.1, Math.min(prev.scale * factor, 10)),
    }));
  };
  
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 0.95 : 1.05;
    handleZoom(factor);
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPanning(true);
    setPanStart({ x: e.clientX - transform.posX, y: e.clientY - transform.posY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    e.preventDefault();
    setTransform(prev => ({ ...prev, posX: e.clientX - panStart.x, posY: e.clientY - panStart.y }));
  };

  const handleMouseUp = () => setIsPanning(false);

  const handleRegenerateClick = () => {
    onRegenerate(result, prompt);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full h-full flex flex-col lg:flex-row p-4 gap-4" onClick={e => e.stopPropagation()}>
        {/* Image Display Area */}
        <div className="flex-grow flex flex-col items-center justify-center relative h-full lg:w-2/3">
          <div
            ref={containerRef}
            className="w-full h-full flex items-center justify-center overflow-hidden rounded-lg bg-base-100/20 cursor-grab"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              ref={imageRef}
              src={`data:image/png;base64,${result.b64}`}
              alt="Full screen mockup"
              className="max-w-none max-h-none transition-transform duration-75"
              style={{ transform: `scale(${transform.scale}) translate(${transform.posX}px, ${transform.posY}px)` }}
            />
          </div>
           {/* Toolbar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-base-200/80 rounded-full shadow-lg p-2 flex items-center gap-2">
            <button onClick={() => handleZoom(1.2)} title="Zoom In" className="p-2 hover:bg-base-300 rounded-full transition-colors"><ZoomInIcon className="w-6 h-6" /></button>
            <button onClick={() => handleZoom(0.8)} title="Zoom Out" className="p-2 hover:bg-base-300 rounded-full transition-colors"><ZoomOutIcon className="w-6 h-6" /></button>
            <button onClick={resetTransform} title="Fit to Screen" className="p-2 hover:bg-base-300 rounded-full transition-colors"><FitScreenIcon className="w-6 h-6" /></button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="bg-base-200 rounded-xl shadow-2xl w-full lg:w-1/3 max-w-md h-full flex flex-col">
          <div className="p-4 border-b border-base-300">
            <h3 className="text-lg font-bold">Edit & Regenerate</h3>
          </div>
          <div className="p-4 flex-grow overflow-y-auto">
            <label htmlFor="prompt-viewer" className="block text-sm font-medium text-content-200 mb-2">
              Prompt
            </label>
            <textarea
              id="prompt-viewer"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              rows={12}
              className="w-full bg-base-100 border border-base-300 text-content-100 rounded-md p-3 text-sm focus:ring-brand-primary focus:border-brand-primary transition"
            />
          </div>
          <div className="p-4 border-t border-base-300 bg-base-300/50 rounded-b-xl">
            <button
              onClick={handleRegenerateClick}
              className="w-full py-2 px-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg hover:scale-105 transform transition-transform"
            >
              Regenerate
            </button>
          </div>
        </div>
      </div>
      <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-base-200/50 rounded-full hover:bg-brand-primary transition-colors text-white">
        <CloseIcon className="w-6 h-6" />
      </button>
    </div>
  );
};
