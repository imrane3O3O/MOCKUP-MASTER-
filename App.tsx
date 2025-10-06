import React, { useState, useCallback } from 'react';
import { ConfigurationPanel } from './components/ConfigurationPanel';
import { ImageUploader } from './components/ImageUploader';
import { ResultsGrid } from './components/ResultsGrid';
import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { generateMockup } from './services/geminiService';
import { buildMasterPrompt } from './utils/promptBuilder';
import { fileToBase64, getMimeType } from './utils/fileUtils';
import type { ConfigState, Result } from './types';
import { DEFAULT_CONFIG } from './constants';
import { EditModal } from './components/EditModal';
import { ImageViewer } from './components/ImageViewer';

const App: React.FC = () => {
  const [config, setConfig] = useState<ConfigState>(DEFAULT_CONFIG);
  const [productImage, setProductImage] = useState<{ b64: string; mimeType: string; name: string } | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingResult, setEditingResult] = useState<Result | null>(null);
  const [viewingResult, setViewingResult] = useState<Result | null>(null);

  const handleImageUpload = async (file: File) => {
    try {
      setError(null);
      const b64 = await fileToBase64(file);
      const mimeType = getMimeType(file.name) || 'image/png';
      setProductImage({ b64, mimeType, name: file.name });
    } catch (err) {
      setError('Failed to load image. Please try another one.');
      console.error(err);
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!productImage) {
      setError('Please upload a product image first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
        const generatedResults = await Promise.all(
            Array.from({ length: config.variations }, (_, i) => {
                const prompt = buildMasterPrompt(config);
                return generateMockup(productImage.b64, productImage.mimeType, prompt)
                    .then(generatedB64 => ({
                        id: `${Date.now()}-${i}`,
                        b64: generatedB64,
                        prompt,
                    }));
            })
        );
      setResults(generatedResults);
    } catch (err) {
      console.error(err);
      setError('Failed to generate mockups. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [config, productImage]);
  
  const handleRegenerate = useCallback(async (resultToUpdate: Result, newPrompt: string) => {
    if (!productImage) return;

    setIsLoading(true);
    setError(null);
    try {
      const regeneratedB64 = await generateMockup(productImage.b64, productImage.mimeType, newPrompt);
      let updatedResult: Result | null = null;
      setResults(prevResults => {
          const newResults = prevResults.map(r => {
              if (r.id === resultToUpdate.id) {
                  updatedResult = { ...r, b64: regeneratedB64, prompt: newPrompt };
                  return updatedResult;
              }
              return r;
          });
          return newResults;
      });
      
      if (editingResult) setEditingResult(null);
      if (viewingResult && updatedResult) setViewingResult(updatedResult);

    } catch (err) {
       console.error(err);
       setError('Failed to regenerate the mockup.');
    } finally {
      setIsLoading(false);
    }
  }, [productImage, editingResult, viewingResult]);

  return (
    <div className="min-h-screen bg-base-100 text-content-100 font-sans">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3">
            <div className="sticky top-8 space-y-8">
              <ConfigurationPanel config={config} setConfig={setConfig} />
              <button
                onClick={handleGenerate}
                disabled={isLoading || !productImage}
                className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center"
              >
                {isLoading ? 'Generating...' : '🚀 Generate Mockups'}
              </button>
            </div>
          </aside>
          <div className="lg:col-span-9">
            <div className="bg-base-200 rounded-xl p-6 shadow-inner space-y-6">
              <ImageUploader onImageUpload={handleImageUpload} currentImage={productImage?.b64} />
              
              {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg">{error}</div>}

              {isLoading && <Loader />}
              
              {!isLoading && results.length > 0 && (
                <ResultsGrid results={results} onEdit={setEditingResult} onView={setViewingResult} />
              )}

              {!isLoading && results.length === 0 && !error && (
                <div className="text-center py-16 px-6 bg-base-300/50 rounded-lg">
                  <h3 className="text-xl font-semibold text-content-100">Your mockups will appear here</h3>
                  <p className="text-content-200 mt-2">Upload an image and configure the options to get started.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {editingResult && (
        <EditModal 
          result={editingResult}
          onClose={() => setEditingResult(null)}
          onRegenerate={handleRegenerate}
        />
      )}
      {viewingResult && (
        <ImageViewer
          result={viewingResult}
          onClose={() => setViewingResult(null)}
          onRegenerate={handleRegenerate}
        />
      )}
    </div>
  );
};

export default App;
