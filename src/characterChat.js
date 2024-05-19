import { askUserInput } from './utils.js';

function checkExit(userMessage, rl) {
  if (userMessage === 'exit') {
    process.stdout.write('Goodbye!\n');
    rl.close();
    process.exit(0);
  }
}

export async function chatWithCharacter(rl, ollama, character, greetingMessage) {
  let messages = [];
  messages.push({role: 'system', content: character.systemPrompt});
  messages.push({role: 'assistant', content: greetingMessage});

  while (true) {
    const userMessage = await askUserInput(rl, 'Your message: ');
    checkExit(userMessage, rl);
    messages.push({role: 'user', content: userMessage});
    const modelResponse = await ollama.chat({
      model: 'llama3',
      messages: messages,
      stream: true,
    });

    rl.output.write(`${character.firstName} ${character.surname}: `);

    let characterAnswer = '';
    for await (let part of modelResponse) {
      characterAnswer += part.message.content
      rl.output.write(part.message.content);
    }
    rl.output.write('\n');
    messages.push({role: 'assistant', content: characterAnswer});
  }
}
