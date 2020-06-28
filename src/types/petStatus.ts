import { LifeStage } from '../enums/lifeStages';

export type PetStatus = {
  age: number;
  health: number;
  lifeStage: LifeStage;
  morale: number;
  poopCount: number;
  satiety: number;
  vigor: number;
};
