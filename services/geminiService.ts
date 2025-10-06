
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateMockup(
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<string> {
  const model = 'gemini-2.5-flash-image';
  
  const response = await ai.models.generateContent({
    model: model,
    contents: {
      parts: [
        {
          inlineData: {
            data: base64ImageData,
            mimeType: mimeType,
          },
        },
        {
          text: prompt,
        },
      ],
    },
    config: {
      responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });

  // Extract the generated image from the response
  const parts = response.candidates?.[0]?.content?.parts;
  if (!parts) {
    throw new Error('No content parts returned from API.');
  }

  for (const part of parts) {
    if (part.inlineData) {
      return part.inlineData.data;
    }
  }

  // Fallback if no image is found
  const textResponse = response.text;
  throw new Error(`API did not return an image. Response: ${textResponse || 'No text response'}`);
}
