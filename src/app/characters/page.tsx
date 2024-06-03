'use client';

import { NextPage } from 'next';
import { Button } from '@ui';
import { useState } from 'react';
import { Character, ExtendedCharacter } from '@t/character';
import { CharacterCard } from '@c/character';

//some test characters
const testCharacters: ExtendedCharacter[] = [
  {
    characterString:
      '{"race":"Hobbit","firstName":"Frodo","lastName":"Baggins","age":50,"gender":"male","occupation":"Ringbearer","personality":"kind","traits":{"honest":true,"trustworthy":true},"topicsOfInterest":["rings","adventure"],"mood":"happy","interests":["gardening","adventuring"]}',
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
    messageHistory: [],
  },
  {
    characterString:
      '{"race":"House Elf","firstName":"Dobby","lastName":"","age":200,"gender":"male","occupation":"free elf","personality":"loyal","traits":{"honest":true,"trustworthy":true},"topicsOfInterest":["freedom","Harry Potter"],"mood":"happy","interests":["socks","freedom"]}',
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
    messageHistory: [],
  },
];

const CharactersPage: NextPage = () => {
  const [characters, setCharacters] = useState<Character[]>(testCharacters);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );

  const selectCharacter = (character: Character) => {
    setCharacters(
      [...characters].map((c) => ({ ...c, selected: c === character })),
    );
    setSelectedCharacter(character);
  };

  return (
    <div className="flex flex-grow">
      <aside className="w-64 bg-gray-200 p-4">
        <h2 className="mb-4 text-2xl font-bold">Characters</h2>
        <Button>Add Character</Button>
        {characters.map((character) => (
          <CharacterCard
            character={character}
            onClick={() => selectCharacter(character)}
          />
        ))}
      </aside>
      <main className="flex-grow p-4">
        <h2 className="mb-4 text-2xl font-bold">Character Information</h2>
        {selectedCharacter && (
          <div>
            <h3 className="mb-2 text-xl font-bold">
              {selectedCharacter.firstName} {selectedCharacter.lastName}
            </h3>
            <p className="text-gray">
              {selectedCharacter.race} {selectedCharacter.mood}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CharactersPage;
