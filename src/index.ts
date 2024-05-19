import readline from 'readline';
import {Ollama} from 'ollama';
import {generateCharacterAndSystemPrompt} from './characterGenerator';
import {generateGreetingMessage} from './greetingMessageGenerator';
import {chatWithCharacter} from './characterChat';

(async () => {
  const ollama = new Ollama({host: 'http://localhost:11434'});
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.write('Hello! I am a character generator. I will generate a character for you.\n');
  const character = await generateCharacterAndSystemPrompt(rl, ollama);
  await generateGreetingMessage(rl, ollama, character);
  await chatWithCharacter(rl, ollama, character);
})();
