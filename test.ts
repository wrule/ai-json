import 'dotenv/config';
import { z } from '.';
import { zodStringify } from '.';
import { generateObjectByJSON } from './ollama';

async function main() {
  const json = zodStringify(z.object({
    name: z.string(),
    age: z.number(),
  }));
  const time = Date.now();
  const result = await generateObjectByJSON('http://192.168.0.105:11434/api', 'qwen3:14b', json);
  console.log(result, Date.now() - time);
}

main();
