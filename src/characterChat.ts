import { askUserInput } from './utils';
import readline from "readline";
import {Ollama} from "ollama";

import {ExtendedCharacter} from "./types";

function checkExit(userMessage: string, rl: readline.Interface) {
  if (userMessage === 'exit') {
    rl.write('Goodbye!\n');
    rl.close();
    return true;
  }
  return false;
}

export async function chatWithCharacter(rl: readline.Interface, ollama: Ollama, character: ExtendedCharacter) {
  while (true) {
    const userMessage = await askUserInput(rl, 'Your message: ');
    if (checkExit(userMessage, rl)) {
      return;
    }
    character.messageHistory.push({role: 'user', content: userMessage});
    const modelResponse = await ollama.chat({
      model: 'llama3',
      messages: character.messageHistory,
      stream: true,
    });

    rl.write(`${character.firstName} ${character.surname}: `);

    let characterAnswer = '';
    for await (let part of modelResponse) {
      characterAnswer += part.message.content
      rl.write(part.message.content);
    }
    rl.write('\n');
    character.messageHistory.push({role: 'assistant', content: characterAnswer});
  }
}
