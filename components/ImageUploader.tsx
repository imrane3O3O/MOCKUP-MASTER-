
import React, { useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  currentImage: string | null | undefined;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, currentImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-content-100 mb-4">1. Upload Product Image</h2>
      <div
        onClick={handleClick}
        className="relative group w-full h-64 border-2 border-dashed border-base-300 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:border-brand-primary transition-colors duration-300 bg-base-100/50"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        {currentImage ? (
          <img
            src={`data:image/png;base64,${currentImage}`}
            alt="Uploaded product"
            className="object-contain h-full w-full p-2"
          />
        ) : (
          <>
            <UploadIcon className="w-12 h-12 text-content-200 group-hover:text-brand-primary transition-colors" />
            <p className="mt-2 text-content-200">Click to upload or drag & drop</p>
            <p className="text-xs text-base-300">PNG, JPG, WEBP</p>
          </>
        )}
      </div>
    </div>
  );
};
