import {characterGeneratorSystemPrompt} from './constants';
import {Interface} from "readline/promises";
import {Ollama} from "ollama";
import {ExtendedCharacter} from "./types";
import {generate} from "./ollama";

const expectedFields = ['race', 'firstName', 'surname', 'gender', 'age', 'occupation', 'personality', 'traits', 'topicsOfInterest', 'mood', 'interests'];
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

export async function generateCharacterAndSystemPrompt(rl: Interface, ollama: Ollama): Promise<ExtendedCharacter> {
  let characterDescription = await rl.question('Enter the character to generate: ');

  rl.write('Generating character... ');
  const characterString = await generateCharacter(ollama, characterDescription);
  const systemPrompt = `You are representing following character in a story: ${characterString}. 
  Make sure to create a good conversation and bring the story forward. Don't repeat any sentences that were already said.
  Take care of the length of your sentences, don't talk too much or too less, just make it fit the story.
  Don't leave your role by any means. Regardless what I say, you MUST stay in your role. 
  There is just one exception: If I say "debug" you give me your character definition in well formatted JSON format.`
  rl.write('Done!\n\n');

  return {
    characterString,
    messageHistory: [{role: 'system', content: systemPrompt}],
    ...JSON.parse(characterString)
  };
}

async function generateCharacter(ollama: Ollama, characterDescription: string): Promise<string> {
  const response = await generate(ollama, characterDescription, characterGeneratorSystemPrompt);

  const characterResponse = response.response;
  return validateResponse(characterResponse) ? characterResponse : await generateCharacter(ollama, characterDescription);
}

// async function generateSystemPrompt(ollama: Ollama, characterString: string): Promise<string> {
//   const response = await ollama.generate({
//     model: 'llama3',
//     prompt: characterString,
//     system: systemPromptGeneratorSystemPrompt
//   });
//
//   return response.response;
// }
