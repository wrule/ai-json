import 'dotenv/config';
import { z } from '.';
import { zodStringify } from '.';
import { generateObjectByJSON } from '.';

async function main() {
  const json = zodStringify(z.object({
    name: z.string(),
    age: z.number(),
  }));
  const result = await generateObjectByJSON(process.env.OPENROUTER_API_KEY!, 'gpt-4', json);
  console.log(result);
}

main();
