import {greetingMessageGeneratorSystemPrompt} from "./constants";
import readline from "readline";
import {Ollama} from "ollama";
import {ExtendedCharacter} from "./types";
import {generateStream} from "./ollama";

export async function generateGreetingMessage(rl: readline.Interface, ollama: Ollama, ...characters: ExtendedCharacter[]) {
  const character = characters[0];
  rl.write(`${character.firstName} ${character.surname}: `);
  let greetingMessage = '';
  for await (let part of await generateStream(ollama, character.characterString, greetingMessageGeneratorSystemPrompt)) {
    greetingMessage += part.response;
    rl.write(part.response);
  }
  rl.write('\n');
  character.messageHistory.push({role: 'assistant', content: greetingMessage});
  characters.forEach((c, i) => {
    if (i === 0) {
      return;
    }
    c.messageHistory.push({role: 'user', content: greetingMessage});
  });
}
