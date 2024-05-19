export async function generateGreetingMessage(rl, ollama, character) {
  rl.output.write(`${character.firstName} ${character.surname}: `);
  let greetingMessage = '';
  for await (let part of await streamGreetingMessage(ollama, character.characterString)) {
    greetingMessage += part.response;
    rl.output.write(part.response);
  }
  rl.output.write('\n');
  return greetingMessage;
}

async function streamGreetingMessage(ollama, character) {
  return await ollama.generate({
    model: 'llama3',
    prompt: character,
    system: `You are a greeting message generator for a game. 
    You will get a character definition as input and you will answer with a greeting that this character would greet a stranger with. 
    Only response with the greeting message, nothing else.`,
    stream: true,
  });
}
