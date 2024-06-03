import React from 'react';
import { Character } from '@t/character';
import { fullName } from '@utils/character';

interface Props {
  character: Character;
  onClick?: () => void;
}

const CharacterCard: React.FC<Props> = ({ character, onClick }) => {
  return (
    <div
      className="m-2 cursor-pointer rounded-lg border-2 border-secondary bg-white p-4 shadow-md hover:border-secondary-dark"
      onClick={onClick}
    >
      <h2
        className={`mb-2 text-xl font-bold${character.selected ? ' text-blue-600' : ''}`}
      >
        {fullName(character)}
      </h2>
      <p className="text-gray-700">Race: {character.race}</p>
      <p className="text-gray-700">Age: {character.age}</p>
      <p className="text-gray-700">Occupation: {character.occupation}</p>
      <p className="text-gray-700">Personality: {character.personality}</p>
    </div>
  );
};

export default CharacterCard;
