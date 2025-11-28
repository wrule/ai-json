import 'dotenv/config';
import { generateText } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function main() {
  const { text } = await generateText({
    model: openrouter.chat('anthropic/claude-3.5-sonnet'),
    prompt: 'What is OpenRouter?',
  });
  console.log(text);
}

main();
