
import type { ConfigState } from '../types';

export function buildMasterPrompt(config: ConfigState): string {
  const {
    productType,
    modelGender,
    ethnicity,
    bodyType,
    poseStyle,
    backgroundStyle,
    vibeKeywords,
  } = config;

  // The main instruction is to place the product from the input image onto a model.
  let prompt = `Take the product from the provided image, which is a ${productType}, and create a photorealistic mockup. Place it on a model with the following characteristics:`;

  prompt += `
- Ethnicity: A natural-looking ${ethnicity} model.
- Body Type: ${bodyType}.
- Pose: A dynamic and professional ${poseStyle}.
- Gender: ${modelGender === 'any' ? 'Any gender that fits the product style' : modelGender}.`;
  
  prompt += `

The overall scene should have these qualities:
- Background: A clean and suitable ${backgroundStyle} background that complements the product.
- Vibe: The image should have a ${vibeKeywords} vibe.
- Style: Ultra-realistic, high-quality fashion photography. Maintain all original product details, logos, textures, and colors perfectly. The product must fit the model naturally and have correct perspective and alignment.
- Lighting: Professional studio lighting with balanced shadows.
- Composition: The composition should be artistic, with creative angles that highlight the product. The final image must look like a real, professional photoshoot for an e-commerce brand.
- Negative Keywords: Avoid low resolution, bad anatomy, weird faces, distorted limbs, blurry images, watermarks, or an artificial look.
  `;

  return prompt;
}
