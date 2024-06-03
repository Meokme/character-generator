import { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <div className="p-4">
      <p className="mb-2 text-lg">
        Welcome to the Character Generator application. This application allows
        you to create unique and diverse characters for your games or stories.
      </p>
      <p className="mb-2 text-lg">
        You can customize various aspects of your character such as their class,
        race, abilities, and more. The possibilities are endless!
      </p>
      <p className="mb-2 text-lg">
        This application uses advanced AI technology, specifically Large
        Language Models (LLMs), to generate character descriptions, backstories,
        dialogues, and more. This allows for a high degree of customization and
        complexity in character creation.
      </p>
      <p className="text-lg">
        Start creating your character now and explore the possibilities of
        AI-powered character generation!
      </p>
    </div>
  );
};

export default HomePage;
