export interface Character {
  race: string;
  firstName: string;
  surname: string;
  gender: string;
  age: number;
  occupation: string;
  personalityType: string;
  traits: {
    honest: boolean;
    trustworthy: boolean;
    [key: string]: boolean; // custom traits
  };
  topicsOfInterest: string[];
  mood: string;
  interests: string[];
}

export interface Message {
  role: string;
  content: string;
}

export interface ExtendedCharacter extends Character {
  characterString: string;
  messageHistory: Message[];
}
