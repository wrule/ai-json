import { z } from 'zod';
import { zerialize, dezerialize, ZodTypes } from 'zodex';
import { generateText } from 'ai';
import { createOllama } from 'ollama-ai-provider-v2';
import { StructuredOutputParser } from '@langchain/core/output_parsers';

export { z } from 'zod';

export function zodStringify(zodSchema: ZodTypes) {
  return JSON.stringify(zerialize(zodSchema));
}

export function zodParse(json: string) {
  return dezerialize(JSON.parse(json));
}

export async function generateObject(
  ollamaBaseURL: string,
  modelName: string,
  zodSchema: z.ZodTypeAny,
  prompt?: string,
  suffixPrompt?: string,
) {
  const ollama = createOllama({
    baseURL: ollamaBaseURL,
  });
  const parser = StructuredOutputParser.fromZodSchema(zodSchema);
  const formatInstructions = parser.getFormatInstructions();
  const { text } = await generateText({
    model: ollama(modelName),
    prompt: `${prompt}\n\n${formatInstructions}${suffixPrompt ? `\n\n${suffixPrompt}` : ''}`,
  });
  return await parser.parse(text);
}

export async function generateObjectByJSON(
  ollamaBaseURL: string,
  modelName: string,
  json: string,
  prompt?: string,
  suffixPrompt?: string,
) {
  return await generateObject(ollamaBaseURL, modelName, zodParse(json), prompt, suffixPrompt);
}
