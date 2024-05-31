import {Ollama} from "ollama";

const model = 'llama3';

export async function generate(ollama: Ollama, prompt: string, system: string) {
  return await ollama.generate({
    model,
    prompt,
    system
  });
}

export async function generateStream(ollama: Ollama, prompt: string, system: string) {
  return await ollama.generate({
    model,
    prompt,
    system,
    stream: true
  });
}

export async function chat(ollama: Ollama, messages: any[]) {
  return await ollama.chat({
    model,
    messages,
    stream: true
  });
}
