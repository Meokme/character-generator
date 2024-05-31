import { Character } from '@t/character';

/**
 * Checks if a character has first and last name and builds a full name.
 * @param character
 * @returns The full name of the character.
 */
export function fullName(character: Character) {
  if (character.firstName && character.lastName) {
    return `${character.firstName} ${character.lastName}`;
  } else if (character.firstName) {
    return character.firstName;
  } else if (character.lastName) {
    return character.lastName;
  } else {
    return 'Unnamed';
  }
}
