import { NextPage } from 'next';
import { Button, Page } from '@ui';
import { useState } from 'react';
import { Character } from '@t/character';
import { CharacterCard } from '@c/character';

//some test characters
const testCharacters: Character[] = [
  {
    race: 'Hobbit',
    firstName: 'Frodo',
    lastName: 'Baggins',
    age: 50,
    gender: 'male',
    occupation: 'Ringbearer',
    personality: 'kind',
    traits: {
      honest: true,
      trustworthy: true,
    },
    topicsOfInterest: ['rings', 'adventure'],
    mood: 'happy',
    interests: ['gardening', 'adventuring'],
  },
  {
    race: 'House Elf',
    firstName: 'Dobby',
    lastName: '',
    age: 200,
    gender: 'male',
    occupation: 'free elf',
    personality: 'loyal',
    traits: {
      honest: true,
      trustworthy: true,
    },
    topicsOfInterest: ['freedom', 'Harry Potter'],
    mood: 'happy',
    interests: ['socks', 'freedom'],
  },
];

const HomePage: NextPage = () => {
  const [characters, setCharacters] = useState<Character[]>(testCharacters);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );

  return (
    <Page>
      <div className="flex flex-grow">
        <aside className="w-64 bg-gray-200 p-4">
          <h2 className="mb-4 text-2xl font-bold">Characters</h2>
          <Button>Add Character</Button>
          {characters.map((character) => (
            <CharacterCard character={character} />
          ))}
        </aside>
        <main className="flex-grow p-4">
          <h2 className="mb-4 text-2xl font-bold">Character Information</h2>
          <Button>Generate Backstory</Button>
          <Button>Chat with Character</Button>
          <Button>Let Character Chat with Another</Button>
        </main>
      </div>
    </Page>
  );
};

export default HomePage;
