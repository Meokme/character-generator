export interface Character {
  race: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  occupation: string;
  personality: string;
  traits: {
    honest: boolean;
    trustworthy: boolean;
    [key: string]: boolean; // custom traits
  };
  topicsOfInterest: string[];
  mood: string;
  interests: string[];
}
