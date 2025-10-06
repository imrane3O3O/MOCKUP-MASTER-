
import React from 'react';
import type { ConfigState } from '../types';
import {
  PRODUCT_TYPES,
  GENDERS,
  ETHNICITIES,
  BODY_TYPES,
  POSE_STYLES,
  BACKGROUND_STYLES,
} from '../constants';

interface ConfigurationPanelProps {
  config: ConfigState;
  setConfig: React.Dispatch<React.SetStateAction<ConfigState>>;
}

const SelectInput: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}> = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-content-200 mb-2">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full bg-base-300 border border-base-300 text-content-100 rounded-md py-2 px-3 focus:ring-brand-primary focus:border-brand-primary transition"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const TextInput: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}> = ({ label, value, onChange, placeholder }) => (
    <div>
      <label className="block text-sm font-medium text-content-200 mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-base-300 border border-base-300 text-content-100 rounded-md py-2 px-3 focus:ring-brand-primary focus:border-brand-primary transition"
      />
    </div>
);


const SliderInput: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, value, min, max, step, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-content-200 mb-2">{label} <span className="font-bold text-brand-secondary">{value}</span></label>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      className="w-full h-2 bg-base-300 rounded-lg appearance-none cursor-pointer range-lg accent-brand-primary"
    />
  </div>
);


export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({ config, setConfig }) => {
  const handleChange = (field: keyof ConfigState, value: string | number) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-base-200 p-6 rounded-xl shadow-inner space-y-6">
      <h2 className="text-xl font-bold text-content-100 border-b border-base-300 pb-3">Configuration</h2>
      <SelectInput
        label="Product Type"
        value={config.productType}
        onChange={(e) => handleChange('productType', e.target.value)}
        options={PRODUCT_TYPES}
      />
      <SelectInput
        label="Model Gender"
        value={config.modelGender}
        onChange={(e) => handleChange('modelGender', e.target.value)}
        options={GENDERS}
      />
      <SelectInput
        label="Ethnicity"
        value={config.ethnicity}
        onChange={(e) => handleChange('ethnicity', e.target.value)}
        options={ETHNICITIES}
      />
      <SelectInput
        label="Body Type"
        value={config.bodyType}
        onChange={(e) => handleChange('bodyType', e.target.value)}
        options={BODY_TYPES}
      />
      <SelectInput
        label="Pose Style"
        value={config.poseStyle}
        onChange={(e) => handleChange('poseStyle', e.target.value)}
        options={POSE_STYLES}
      />
      <SelectInput
        label="Background Style"
        value={config.backgroundStyle}
        onChange={(e) => handleChange('backgroundStyle', e.target.value)}
        options={BACKGROUND_STYLES}
      />
      <TextInput
        label="Vibe / Keywords"
        value={config.vibeKeywords}
        onChange={(e) => handleChange('vibeKeywords', e.target.value)}
        placeholder="e.g., vibrant, cinematic"
      />
       <SliderInput
        label="Variations per Generation"
        value={config.variations}
        min={1}
        max={6}
        step={1}
        onChange={(e) => handleChange('variations', parseInt(e.target.value, 10))}
      />
    </div>
  );
};
