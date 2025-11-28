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
) {
  const openrouter = createOpenRouter({
    apiKey: openrouterApiKey,
  });
  const parser = StructuredOutputParser.fromZodSchema(zodSchema);
  const formatInstructions = parser.getFormatInstructions();
  const { text } = await generateText({
    model: openrouter(modelName),
    prompt: formatInstructions,
  });
  return await parser.parse(text);
}

export async function generateObjectByJSON(
  openrouterApiKey: string,
  modelName: string,
  json: string,
) {
  return await generateObject(openrouterApiKey, modelName, zodParse(json));
}

async function main() {
  const json = zodStringify(z.object({
    name: z.string(),
    age: z.number(),
  }));
  const result = await generateObjectByJSON(process.env.OPENROUTER_API_KEY!, 'gpt-4', json);
  console.log(result);
}

main();
