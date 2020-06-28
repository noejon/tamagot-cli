import { PetStatus } from '../types/petStatus';

export interface Organism {
  clean(): void;
  feed(): void;
  isAlive(): boolean;
  isExhausted(): boolean;
  isSleepy(): boolean;
  live(): void;
  sleep(): void;
  playGames(): void;
  pollStatus(): PetStatus;
  poo(): void;
}
