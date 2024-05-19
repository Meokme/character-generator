import {characterGeneratorSystemPrompt, systemPromptGeneratorSystemPrompt} from './constants';
import {askUserInput} from "./utils";
import readline from "readline";
import {Ollama} from "ollama";
import {ExtendedCharacter} from "./types";

const expectedFields = ['firstName', 'surname', 'gender', 'age', 'occupation', 'personalityType', 'traits', 'topicsOfInterest', 'responses', 'mood', 'interests'];
function validateResponse(response: string): boolean {
  try {
    const character = JSON.parse(response);
    if (typeof character !== 'object') {
      return false;
    }
    for (const field of expectedFields) {
      if (!(field in character)) {
        return false;
      }
    }
    return true;
  } catch (e) {
    return false;
  }
}

export async function generateCharacterAndSystemPrompt(rl: readline.Interface, ollama: Ollama): Promise<ExtendedCharacter> {
  let characterDescription = await askUserInput(rl, 'Enter the character to generate: ');

  rl.write('Generating character... ');
  const characterString = await generateCharacter(ollama, characterDescription);
  const systemPrompt = await generateSystemPrompt(ollama, characterString);
  rl.write('Done!\n\n');

  return {
    characterString,
    messageHistory: [{role: 'system', content: systemPrompt}],
    ...JSON.parse(characterString)
  };
}

async function generateCharacter(ollama: Ollama, characterDescription: string): Promise<string> {
  const response = await ollama.generate({
    model: 'llama3',
    prompt: characterDescription,
    system: characterGeneratorSystemPrompt
  });

  // console.debug('Generated character:', JSON.stringify(JSON.parse(response.response), null, 2));
  const characterResponse = response.response;
  return validateResponse(characterResponse) ? characterResponse : await generateCharacter(ollama, characterDescription);
}

async function generateSystemPrompt(ollama: Ollama, characterString: string): Promise<string> {
  const response = await ollama.generate({
    model: 'llama3',
    prompt: characterString,
    system: systemPromptGeneratorSystemPrompt
  });

  return response.response;
}
