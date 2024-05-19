export interface Character {
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
  responses: {
    [topicOfInterest: string]: string[];
  };

  mood: string;
  interests: string[];
}

interface Message {
  role: string;
  content: string;
}

export interface ExtendedCharacter extends Character {
  characterString: string;
  messageHistory: Message[];
}
