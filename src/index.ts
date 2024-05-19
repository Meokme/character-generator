import readline from 'readline';
import {Ollama} from 'ollama';
import {generateCharacterAndSystemPrompt} from './characterGenerator';
import {startCharacterChat} from './characterChat';
import {narratorStart} from "./narrator";

(async () => {
  const ollama = new Ollama({host: 'http://localhost:11434'});
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.write('Hello! I am a character generator. I will generate a character for you.\n');
  const character1 = await generateCharacterAndSystemPrompt(rl, ollama);
  const character2 = await generateCharacterAndSystemPrompt(rl, ollama);
  await narratorStart(rl, ollama, character1, character2);
  await startCharacterChat(rl, ollama, character1, character2);
})();
