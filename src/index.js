import readline from 'readline';
import {Ollama} from 'ollama';
import {generateCharacterAndSystemPrompt} from './characterGenerator.js';
import {generateGreetingMessage} from './greetingMessageGenerator.js';
import {chatWithCharacter} from './characterChat.js';

const ollama = new Ollama({host: 'http://localhost:11434'});
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.output.write('Hello! I am a character generator. I will generate a character for you.\n');
const character = await generateCharacterAndSystemPrompt(rl, ollama);
const greetingMessage = await generateGreetingMessage(rl, ollama, character);
chatWithCharacter(rl, ollama, character, greetingMessage);
