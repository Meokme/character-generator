export async function askUserInput(rl, question) {
  return new Promise(resolve => {
    rl.question(question, resolve);
  });
}
