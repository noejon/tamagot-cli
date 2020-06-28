import times from 'lodash/times';
import { Organism } from '../interfaces/organism';
import { PetStatus } from '../types/petStatus';
import { PetConfiguration } from '../types/petConfiguration';
import { LifeStage } from '../enums/lifeStages';
import { TEENAGE_MAX_AGE, CHILD_MAX_AGE, BABY_MAX_AGE } from '../constants';
import decrement from '../utils/decrement';
import increment from '../utils/increment';

export default class Pet implements Organism {
  #age: number;
  #exhaustionTreshold: number;
  #health: number;
  #healthGainTresholdPercentage: number;
  #healthIncrement: number;
  #maxAge: number;
  #maxHealth: number;
  #maxSatiety: number;
  #maxMorale: number;
  #maxVigor: number;
  #morale: number;
  #moraleIncrement: number;
  #poopCount: number;
  #poopDecrement: number;
  #poopIncrement: number;
  #poopTreshold: number;
  #satiety: number;
  #satietyDecrement: number;
  #satietyIncrement: number;
  #sleepinessTreshold: number;
  #vigor: number;

  constructor({
    exhaustionTreshold = 2,
    healthGainTresholdPercentage = 75,
    healthIncrement = 2,
    maxAge = 27,
    maxHealth = 40,
    maxSatiety = 20,
    maxMorale = 10,
    maxVigor = 15,
    moraleIncrement = 3,
    poopIncrement = 1,
    poopDecrement = 3,
    poopTreshold = 5,
    satietyDecrement = 3,
    satietyIncrement = 3,
    sleepinessTreshold = 5,
  }: PetConfiguration) {
    this.#maxAge = maxAge;
    this.#maxHealth = maxHealth;
    this.#maxSatiety = maxSatiety;
    this.#maxMorale = maxMorale;
    this.#maxVigor = maxVigor;
    this.#healthIncrement = healthIncrement;
    this.#moraleIncrement = moraleIncrement;
    this.#poopIncrement = poopIncrement;
    this.#poopDecrement = poopDecrement;
    this.#satietyDecrement = satietyDecrement;
    this.#satietyIncrement = satietyIncrement;
    this.#exhaustionTreshold = exhaustionTreshold;
    this.#healthGainTresholdPercentage = healthGainTresholdPercentage;
    this.#poopTreshold = poopTreshold;
    this.#sleepinessTreshold = sleepinessTreshold;
    this.#health = this.#maxHealth;
    this.#satiety = this.#maxSatiety;
    this.#morale = this.#maxMorale;
    this.#vigor = this.#maxVigor;
    this.#age = 0;
    this.#poopCount = 0;
  }

  clean(): void {
    this.#poopCount = decrement(this.#poopCount, this.#poopDecrement);
  }

  feed(): void {
    this.#satiety = increment(
      this.#satiety,
      this.#satietyIncrement,
      this.#maxSatiety
    );
  }

  isAlive(): boolean {
    return this.#age <= this.#maxAge;
  }

  isExhausted(): boolean {
    return this.#vigor === this.#exhaustionTreshold;
  }

  isSleepy(): boolean {
    return this.#vigor <= this.#sleepinessTreshold;
  }

  live(): void {
    this.#morale = decrement(this.#satiety, this.#satietyDecrement);
    this.#satiety = decrement(this.#satiety, this.#satietyDecrement);
    this.#vigor = decrement(this.#satiety, this.#satietyDecrement);
    this.damage();
    this.heal();
  }

  sleep(): void {
    this.#vigor = this.#maxVigor;
    times(this.#maxVigor / 3, this.live);
    this.#age++;
  }

  playGames(): void {
    this.#morale = increment(
      this.#morale,
      this.#moraleIncrement,
      this.#maxMorale
    );
  }

  pollStatus(): PetStatus {
    return {
      age: this.#age,
      health: this.#health,
      lifeStage: this.calculateLifeStage(),
      morale: this.#morale,
      poopCount: this.#poopCount,
      satiety: this.#satiety,
      vigor: this.#vigor,
    };
  }

  poo(): void {
    this.#poopCount = increment(this.#poopCount, this.#poopIncrement);
  }

  private calculateLifeStage(): LifeStage {
    if (!this.isAlive()) return LifeStage.Angel;
    if (this.#age > TEENAGE_MAX_AGE) {
      return LifeStage.Adult;
    } else if (this.#age > CHILD_MAX_AGE) {
      return LifeStage.Teenage;
    } else if (this.#age > BABY_MAX_AGE) {
      return LifeStage.Child;
    } else {
      return LifeStage.Baby;
    }
  }

  private damage(): void {
    let damageAmount = 0;
    if (this.#vigor <= this.#sleepinessTreshold) damageAmount++;
    if (this.#satiety === 0) damageAmount++;
    if (this.#morale === 0) damageAmount++;
    if (this.#poopCount > this.#poopTreshold) damageAmount++;
    this.#health -= damageAmount;
  }

  private heal(): void {
    if (
      this.isClean() &&
      this.isHappy() &&
      this.isVigorous() &&
      this.isWellFed()
    )
      this.#health += this.#healthIncrement;
    if (this.#health > this.#maxHealth) this.#health = this.#maxHealth;
  }

  private isClean(): boolean {
    return this.#poopCount > this.#poopTreshold;
  }

  private isHappy(): boolean {
    return (
      this.#morale >
      (this.#maxMorale * this.#healthGainTresholdPercentage) / 100
    );
  }

  private isVigorous(): boolean {
    return (
      this.#vigor > (this.#maxVigor * this.#healthGainTresholdPercentage) / 100
    );
  }

  private isWellFed(): boolean {
    return (
      this.#satiety >
      (this.#maxSatiety * this.#healthGainTresholdPercentage) / 100
    );
  }
}
