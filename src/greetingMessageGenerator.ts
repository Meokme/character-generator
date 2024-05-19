import {greetingMessageGeneratorSystemPrompt} from "./constants";
import readline from "readline";
import {Ollama} from "ollama";
import {ExtendedCharacter} from "./types";

export async function generateGreetingMessage(rl: readline.Interface, ollama: Ollama, character: ExtendedCharacter) {
  rl.write(`${character.firstName} ${character.surname}: `);
  let greetingMessage = '';
  for await (let part of await streamGreetingMessage(ollama, character.characterString)) {
    greetingMessage += part.response;
    rl.write(part.response);
  }
  rl.write('\n');
  character.messageHistory.push({role: 'assistant', content: greetingMessage});
}

async function streamGreetingMessage(ollama: Ollama, characterString: string) {
  return await ollama.generate({
    model: 'llama3',
    prompt: characterString,
    system: greetingMessageGeneratorSystemPrompt,
    stream: true,
  });
}
