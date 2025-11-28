import 'dotenv/config';
import { z } from 'zod';
import { zerialize, dezerialize } from 'zodex';
import { generateText } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { StructuredOutputParser } from '@langchain/core/output_parsers';

export function zodStringify(zodSchema: z.ZodAny) {
  return JSON.stringify(zerialize(zodSchema));
}

export function zodParse(json: string) {
  return dezerialize(JSON.parse(json));
}

async function generateObject(
  openrouterApiKey: string,
  modelName: string,
  zodSchema: z.ZodAny,
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

async function main() {
  const result = await generateObject(process.env.OPENROUTER_API_KEY!, '', '');
  console.log(result);
}

main();
