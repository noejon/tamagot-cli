import { PetStatus } from '../types/petStatus';

export interface Organism {
  clean(): void;
  feed(): void;
  isAlive(): boolean;
  isSleeping(): boolean;
  live(): void;
  sleep(): void;
  playGames(): void;
  pollStatus(): PetStatus;
}
