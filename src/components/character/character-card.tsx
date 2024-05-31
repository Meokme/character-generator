import React from 'react';
import { Character } from '@t/character';
import { fullName } from '@utils/character';

interface Props {
  character: Character;
}

const CharacterCard: React.FC<Props> = ({ character }) => {
  return (
    <div className="border-secondary m-2 rounded-lg border-2 bg-white p-4 shadow-md">
      <h2 className="mb-2 text-xl font-bold">{fullName(character)}</h2>
      <p className="text-gray-700">Race: {character.race}</p>
      <p className="text-gray-700">Age: {character.age}</p>
      <p className="text-gray-700">Occupation: {character.occupation}</p>
      <p className="text-gray-700">Personality: {character.personality}</p>
    </div>
  );
};

export default CharacterCard;
