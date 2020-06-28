// import times from 'lodash/times'; //TODO: Uninstall
import { Organism } from '../interfaces/organism';
import { PetStatus } from '../types/petStatus';
import { PetConfiguration } from '../types/petConfiguration';
import { LifeStage } from '../enums/lifeStages';
import { TEENAGE_MAX_AGE, CHILD_MAX_AGE, BABY_MAX_AGE } from '../constants';
import decrement from '../utils/decrement';
import increment from '../utils/increment';

export default class Pet implements Organism {
  #age = 0;
  #exhaustionTreshold: number;
  #foodCounter = 0;
  #health: number;
  #healthGainTresholdPercentage: number;
  #healthIncrement: number;
  #isSleeping = false;
  #maxAge: number;
  #maxHealth: number;
  #maxSatiety: number;
  #maxMorale: number;
  #maxVigor: number;
  #morale: number;
  #moraleDecrement: number;
  #moraleIncrement: number;
  #poopCount = 0;
  #poopDecrement: number;
  #poopIncrement: number;
  #poopTreshold: number;
  #satiety: number;
  #satietyDecrement: number;
  #satietyIncrement: number;
  #sleepinessTreshold: number;
  #vigor: number;
  #vigorDecrement: number;

  constructor({
    exhaustionTreshold = 2,
    healthGainTresholdPercentage = 75,
    healthIncrement = 2,
    maxAge = 27,
    maxHealth = 40,
    maxSatiety = 20,
    maxMorale = 10,
    maxVigor = 15,
    moraleDecrement = 1,
    moraleIncrement = 3,
    poopIncrement = 1,
    poopDecrement = 3,
    poopTreshold = 5,
    satietyDecrement = 2,
    satietyIncrement = 3,
    sleepinessTreshold = 5,
    vigorDecrement = 2,
  }: PetConfiguration) {
    this.#maxAge = maxAge;
    this.#maxHealth = maxHealth;
    this.#maxSatiety = maxSatiety;
    this.#maxMorale = maxMorale;
    this.#maxVigor = maxVigor;
    this.#healthIncrement = healthIncrement;
    this.#moraleDecrement = moraleDecrement;
    this.#moraleIncrement = moraleIncrement;
    this.#poopIncrement = poopIncrement;
    this.#poopDecrement = poopDecrement;
    this.#satietyDecrement = satietyDecrement;
    this.#satietyIncrement = satietyIncrement;
    this.#vigorDecrement = vigorDecrement;
    this.#exhaustionTreshold = exhaustionTreshold;
    this.#healthGainTresholdPercentage = healthGainTresholdPercentage;
    this.#poopTreshold = poopTreshold;
    this.#sleepinessTreshold = sleepinessTreshold;
    this.#health = this.#maxHealth;
    this.#satiety = this.#maxSatiety;
    this.#morale = this.#maxMorale;
    this.#vigor = this.#maxVigor;
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
    this.#foodCounter++;
  }

  isAlive(): boolean {
    return this.#age <= this.#maxAge && this.#health > 0;
  }

  isSleeping(): boolean {
    return this.#isSleeping;
  }

  live(): void {
    this.#morale = decrement(this.#morale, this.#moraleDecrement);
    this.#satiety = decrement(this.#satiety, this.#satietyDecrement);
    if (!this.#isSleeping) {
      this.#vigor = decrement(this.#vigor, this.#vigorDecrement);
    }
    this.poo();
    this.damage();
    this.heal();
    this.handleSleep();
  }

  sleep(): void {
    this.#isSleeping = true;
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

  private poo(): void {
    const foodTreshold = Math.floor(Math.random() * 4) + 1;
    if (this.#foodCounter >= foodTreshold) {
      this.#poopCount = increment(this.#poopCount, this.#poopIncrement);
      this.#foodCounter = 0;
    }
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
    this.#health = decrement(this.#health, damageAmount);
  }

  private handleSleep(): void {
    if (this.#vigor <= this.#exhaustionTreshold) {
      this.sleep();
    }
    if (this.#isSleeping) {
      this.#vigor = increment(
        this.#vigor,
        Math.floor(Math.random() * this.#sleepinessTreshold) + 1
      );
      if (this.#vigor > this.#sleepinessTreshold) {
        this.#vigor = this.#maxVigor;
        this.#isSleeping = false;
      }
    }
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
