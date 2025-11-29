import 'dotenv/config';
import { z } from 'zod';
import { zerialize, dezerialize, ZodTypes } from 'zodex';
import { generateText } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { StructuredOutputParser } from '@langchain/core/output_parsers';

export function zodStringify(zodSchema: ZodTypes) {
  return JSON.stringify(zerialize(zodSchema));
}

export function zodParse(json: string) {
  return dezerialize(JSON.parse(json));
}

export async function generateObject(
  openrouterApiKey: string,
  modelName: string,
  zodSchema: z.ZodTypeAny,
  prompt?: string,
  suffixPrompt?: string,
) {
  const openrouter = createOpenRouter({
    apiKey: openrouterApiKey,
  });
  const parser = StructuredOutputParser.fromZodSchema(zodSchema);
  const formatInstructions = parser.getFormatInstructions();
  const { text } = await generateText({
    model: openrouter(modelName),
    prompt: `${prompt}\n\n${formatInstructions}${suffixPrompt ? `\n\n${suffixPrompt}` : ''}`,
  });
  return await parser.parse(text);
}

export async function generateObjectByJSON(
  openrouterApiKey: string,
  modelName: string,
  json: string,
  prompt?: string,
  suffixPrompt?: string,
) {
  return await generateObject(openrouterApiKey, modelName, zodParse(json), prompt, suffixPrompt);
}
