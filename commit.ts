import { execSync } from 'child_process';
import { generateObject, z } from './ollama';

export function getStagedDiff(): string {
  const diff = execSync('git diff --staged', {
    encoding: 'utf-8',
    maxBuffer: 1024 * 1024 * 32,
  });
  return diff;
}

async function main() {
  const diff = getStagedDiff();
  const result = await generateObject(
    'http://192.168.0.105:11434/api',
    'qwen3:14b',
    z.object({
      type: z.enum(['feat', 'fix', 'chore']),
      message: z.string(),
    }),
    `以下是执行 git diff --staged 的结果：\n\n${diff}，请确定 commit type 之后，用中文写一个 commit message，要求包含精准的关键词，有利于之后搜索`,
  );
  console.log(result);
}

main();
