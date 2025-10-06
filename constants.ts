
import type { ConfigState } from './types';

export const DEFAULT_CONFIG: ConfigState = {
  productType: 't-shirt',
  modelGender: 'any',
  ethnicity: 'European / Caucasian',
  bodyType: 'average',
  poseStyle: 'standing frontal',
  backgroundStyle: 'studio minimal',
  vibeKeywords: 'fashion, modern, premium',
  variations: 3,
};

export const PRODUCT_TYPES = ["t-shirt", "hoodie", "jacket", "pants", "shoes", "hat/cap", "beanie", "hijab", "accessory"];
export const GENDERS = ["male", "female", "any"];
export const ETHNICITIES = ["African", "Asian", "European / Caucasian", "Arab", "Latino", "Mixed"];
export const BODY_TYPES = ["athletic / muscular", "average", "slim", "curvy"];
export const POSE_STYLES = ["standing frontal", "side profile", "sitting relaxed", "dynamic action", "fashion editorial pose"];
export const BACKGROUND_STYLES = ["studio minimal", "urban street", "outdoor natural", "luxury interior"];
