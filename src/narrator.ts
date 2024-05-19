import {Ollama} from "ollama";
import {ExtendedCharacter, Message} from "./types";
import readline from "readline";
import {generateStream} from "./ollama";
import {narratorSystemPrompt} from "./constants";

export async function narratorStart(rl: readline.Interface, ollama: Ollama, ...characters: ExtendedCharacter[]) {
  const [character1, character2] = characters;
  const prompt = `A scene with following characters: ${character1.characterString}, ${character2.characterString}. 
  Start a new story so that both characters can start to interact.`;
  const message = await narrator(rl, ollama, prompt);
  character1.messageHistory.push({role: 'system', content: message});
  character2.messageHistory.push({role: 'system', content: message})
}

export async function narratorChat(rl: readline.Interface, ollama: Ollama, messages: Message[]) {
  const history = messages.map(message => message.content);
  const prompt = `Following has happened: ${history.join(' ')}. Continue the story. Make it mostly 5 sentences long.`;
  return await narrator(rl, ollama, prompt);
}

async function narrator(rl: readline.Interface, ollama: Ollama, prompt: string) {
  const stream = await generateStream(ollama, prompt, narratorSystemPrompt);
  let message = '';
  for await (let part of stream) {
    rl.write(part.response);
    message += part.response;
  }
  rl.write('\n');
  return message;
}
