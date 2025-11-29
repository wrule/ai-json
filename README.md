# 🤖 ai-json

> 使用 Zod Schema 让 AI 生成结构化 JSON 数据的轻量级工具库

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

## ✨ 特性

- 🔄 **Zod Schema 序列化** - 将 Zod schema 序列化为 JSON 字符串，便于存储和传输
- 🔓 **Zod Schema 反序列化** - 从 JSON 字符串还原为可用的 Zod schema
- 🎯 **结构化 AI 输出** - 使用 OpenRouter API 让 LLM 生成符合 Zod schema 的结构化数据
- 🌐 **多模型支持** - 通过 OpenRouter 支持 GPT-4、Claude、Gemini 等多种模型

## 📦 安装

```bash
# npm
npm install ai-json

# yarn
yarn add ai-json

# pnpm
pnpm add ai-json
```

## 🚀 快速开始

### 基础用法 - Zod Schema 序列化

```typescript
import { z, zodStringify, zodParse } from 'ai-json';

// 定义 Zod schema
const userSchema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
});

// 序列化为 JSON 字符串
const jsonString = zodStringify(userSchema);
console.log(jsonString);

// 从 JSON 字符串还原
const restoredSchema = zodParse(jsonString);
```

### AI 结构化输出

```typescript
import { z, generateObject } from 'ai-json';

const userSchema = z.object({
  name: z.string(),
  age: z.number(),
});

// 使用 Zod schema 直接生成
const result = await generateObject(
  'your-openrouter-api-key',
  'gpt-4',
  userSchema,
  '生成一个虚构用户的信息'
);

console.log(result);
// { name: "张三", age: 28 }
```

### 使用 JSON 字符串生成

```typescript
import { z, zodStringify, generateObjectByJSON } from 'ai-json';

// 先序列化 schema
const json = zodStringify(z.object({
  name: z.string(),
  age: z.number(),
}));

// 使用 JSON 字符串生成对象
const result = await generateObjectByJSON(
  process.env.OPENROUTER_API_KEY!,
  'gpt-4',
  json,
  '生成一个虚构用户的信息'
);
```

## 📖 API 文档

### `zodStringify(zodSchema)`

将 Zod schema 序列化为 JSON 字符串。

| 参数 | 类型 | 描述 |
|------|------|------|
| `zodSchema` | `ZodTypes` | 要序列化的 Zod schema |

**返回值:** `string` - JSON 字符串

### `zodParse(json)`

从 JSON 字符串反序列化为 Zod schema。

| 参数 | 类型 | 描述 |
|------|------|------|
| `json` | `string` | 要解析的 JSON 字符串 |

**返回值:** `ZodTypes` - 还原的 Zod schema

### `generateObject(openrouterApiKey, modelName, zodSchema, prompt?, suffixPrompt?)`

使用 AI 生成符合 Zod schema 的结构化对象。

| 参数 | 类型 | 描述 |
|------|------|------|
| `openrouterApiKey` | `string` | OpenRouter API 密钥 |
| `modelName` | `string` | 模型名称 (如 `gpt-4`, `claude-3-opus`) |
| `zodSchema` | `z.ZodTypeAny` | Zod schema 定义 |
| `prompt` | `string?` | 提示词 |
| `suffixPrompt` | `string?` | 后缀提示词 |

**返回值:** `Promise<T>` - 生成的结构化对象

### `generateObjectByJSON(openrouterApiKey, modelName, json, prompt?, suffixPrompt?)`

使用 JSON 字符串形式的 schema 生成结构化对象。

| 参数 | 类型 | 描述 |
|------|------|------|
| `openrouterApiKey` | `string` | OpenRouter API 密钥 |
| `modelName` | `string` | 模型名称 |
| `json` | `string` | Zod schema 的 JSON 字符串 |
| `prompt` | `string?` | 提示词 |
| `suffixPrompt` | `string?` | 后缀提示词 |

**返回值:** `Promise<T>` - 生成的结构化对象

## 🔧 环境配置

创建 `.env` 文件：

```env
OPENROUTER_API_KEY=your-api-key-here
```

## 🤝 依赖

- [zod](https://github.com/colinhacks/zod) - TypeScript-first schema 验证
- [zodex](https://github.com/nicksrandall/zodex) - Zod schema 序列化工具
- [ai](https://github.com/vercel/ai) - Vercel AI SDK
- [@openrouter/ai-sdk-provider](https://openrouter.ai/) - OpenRouter 提供商
- [@langchain/core](https://github.com/langchain-ai/langchainjs) - LangChain 核心库

## 📄 许可证

[MIT](LICENSE) © 36000.eth
