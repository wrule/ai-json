import 'dotenv/config';
import { z } from 'zod';
import { generateText } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { StructuredOutputParser } from '@langchain/core/output_parsers';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function main() {
  const parser = StructuredOutputParser.fromZodSchema(z.object({
    recipe: z.object({
      name: z.string(),
      ingredients: z.array(z.string()),
      steps: z.array(z.string()),
    }),
  }));
  const formatInstructions = parser.getFormatInstructions();
  const { text } = await generateText({
    model: openrouter('anthropic/claude-sonnet-4.5'),
    prompt: formatInstructions,
  });
  const { recipe } = await parser.parse(text);
  console.log(recipe);
}

main();
