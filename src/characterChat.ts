import { askUserInput } from './utils';
import readline from "readline";
import {Ollama} from "ollama";

import {ExtendedCharacter} from "./types";
import {chat} from "./ollama";
import {narratorChat} from "./narrator";

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
    const modelResponse = await chat(ollama, character.messageHistory)

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

async function characterMessage(rl: readline.Interface, ollama: Ollama, character: ExtendedCharacter) {
  rl.write(`${character.firstName} ${character.surname}: `);
  const stream = await chat(ollama, character.messageHistory);
  let message = '';
  for await (let part of stream) {
    rl.write(part.message.content);
    message += part.message.content;
  }
  character.messageHistory.push({role: 'assistant', content: message});
  rl.write('\n');
  return message;
}

function checkDebug(input: string, rl: readline.Interface, character1: ExtendedCharacter, character2: ExtendedCharacter) {
  if (input === 'debug') {
    rl.write(`${character1.firstName} ${character1.surname}: ${JSON.stringify(character1, null, 2)}\n`);
    rl.write(`${character2.firstName} ${character2.surname}: ${JSON.stringify(character2, null, 2)}\n`);
    return true;
  }
}

export async function startCharacterChat(rl: readline.Interface, ollama: Ollama, character1: ExtendedCharacter, character2: ExtendedCharacter) {
  while (true) {
    const input = await askUserInput(rl, 'Press Enter to continue...');
    if (checkDebug(input, rl, character1, character2)) {
      continue;
    }
    if (checkExit(input, rl)) {
      return;
    }
    // bug: somehow the narrator prevents the characters from chatting (which role should it use?)
    const character1Message = await characterMessage(rl, ollama, character1);
    character2.messageHistory.push({role: 'user', content: character1Message});
    const character2Message = await characterMessage(rl, ollama, character2);
    character1.messageHistory.push({role: 'user', content: character2Message});
    const narratorMessage = await narratorChat(rl, ollama, character1.messageHistory);
    character1.messageHistory.push({role: 'system', content: narratorMessage});
    character2.messageHistory.push({role: 'system', content: narratorMessage});
  }
}
