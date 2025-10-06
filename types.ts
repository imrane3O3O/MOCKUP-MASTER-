
export interface ConfigState {
  productType: string;
  modelGender: string;
  ethnicity: string;
  bodyType: string;
  poseStyle: string;
  backgroundStyle: string;
  vibeKeywords: string;
  variations: number;
}

export interface Result {
  id: string;
  b64: string;
  prompt: string;
}
