import * as readline from 'node:readline/promises';  // This uses the promise-based APIs
import { stdin as input, stdout as output } from 'node:process';
import {Ollama} from 'ollama';
import {generateCharacterAndSystemPrompt} from './characterGenerator';
import {chatWithCharacter, startCharacterChat} from './characterChat';
import {generateGreetingMessage} from "./greetingMessageGenerator";

(async () => {
  const ollama = new Ollama({host: 'http://localhost:11434'});
  const rl = readline.createInterface({input, output});

  rl.write(`Hello! I am a character generator. I will generate characters for you.
How many characters do you want me to create?\n
- 1 character: I generate one character you can chat with
- 2 characters: I generate two characters and they will chat with each other!\n
Respond with "1" or "2"\n`);
  const numberOfCharacters = await askNumberOfCharacters(rl);
  if (numberOfCharacters === 1) {
    const character = await generateCharacterAndSystemPrompt(rl, ollama);
    await generateGreetingMessage(rl, ollama, character);
    await chatWithCharacter(rl, ollama, character);
    return;
  } else {
    const character1 = await generateCharacterAndSystemPrompt(rl, ollama);
    const character2 = await generateCharacterAndSystemPrompt(rl, ollama);
    await generateGreetingMessage(rl, ollama, character1, character2);
    await startCharacterChat(rl, ollama, character1, character2);
  }
})();

async function askNumberOfCharacters(rl: readline.Interface): Promise<number> {
  const response = await rl.question('1 or 2? ');
  switch (response) {
    case '1':
      return 1;
    case '2':
      return 2;
    default:
      rl.write('Please respond with "1" or "2"\n');
      return askNumberOfCharacters(rl);
  }
}
