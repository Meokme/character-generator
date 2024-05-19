import {characterGeneratorSystemPrompt, systemPromptGeneratorSystemPrompt} from './prompts.js';
import {askUserInput} from "./utils.js";

const expectedFields = ['firstName', 'surname', 'gender', 'age', 'occupation', 'personalityType', 'traits', 'topicsOfInterest', 'responses', 'mood', 'interests'];
function validateResponse(response) {
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

export async function generateCharacterAndSystemPrompt(rl, ollama) {
  let characterDescription = await askUserInput(rl, 'Enter the character to generate: ');

  rl.output.write('Generating character... ');
  const characterString = await generateCharacter(ollama, characterDescription);
  const systemPrompt = await generateSystemPrompt(ollama, characterString);
  rl.output.write('Done!\n\n');

  return {
    characterString,
    systemPrompt,
    ...JSON.parse(characterString)
  };
}

async function generateCharacter(ollama, characterDescription) {
  const response = await ollama.generate({
    model: 'llama3',
    prompt: characterDescription,
    system: characterGeneratorSystemPrompt
  });

  // console.debug('Generated character:', JSON.stringify(JSON.parse(response.response), null, 2));
  const characterResponse = response.response;
  return validateResponse(characterResponse) ? characterResponse : await generateCharacter(ollama, characterDescription);
}

async function generateSystemPrompt(ollama, characterString) {
  const response = await ollama.generate({
    model: 'llama3',
    prompt: characterString,
    system: systemPromptGeneratorSystemPrompt
  });

  return response.response;
}
