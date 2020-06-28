import Pet from './pet';
import { LifeStage } from '../enums/lifeStages';
import { PetStatus } from '../types/petStatus';

describe('Pet class', () => {
  describe('when initiliasing a pet with an empty pet configuration', () => {
    const expectedPollStatus: PetStatus = {
      age: 0,
      health: 40,
      lifeStage: LifeStage.Baby,
      morale: 10,
      poopCount: 0,
      satiety: 20,
      vigor: 15,
    };

    let pet: Pet;

    beforeEach(() => {
      pet = new Pet({});
    });

    describe("when we poll the pet's status", () => {
      it('should return the default values set during initialisation', () => {
        expect(pet.pollStatus()).toEqual(expectedPollStatus);
      });
    });

    describe('when we check if the pet is alive', () => {
      it('should return true', () => {
        expect(pet.isAlive()).toEqual(true);
      });
    });

    describe('when we check if the pet is sleepy', () => {
      it('should return false', () => {
        expect(pet.isSleepy()).toEqual(false);
      });
    });

    describe('when we check if the pet is exhausted', () => {
      it('should return false', () => {
        expect(pet.isExhausted()).toEqual(false);
      });
    });

    // TODO:
    // live
    // feed
    // playGames
    // sleep
    // life stages

    describe('when the pet pooes one time', () => {
      beforeEach(() => {
        pet.poo();
      });

      describe("when we poll the pet's status", () => {
        it('should return an object with an increased poop count', () => {
          expect(pet.pollStatus().poopCount).toEqual(1);
        });
      });
    });

    describe('when the pet pooes a lesser or equal amount than the decrement value and we clean ', () => {
      describe("when we poll the pet's status", () => {
        [1, 2, 3].forEach(poopCount => {
          it(`should return a status with a poopCount equal to 0 (before clean: ${poopCount}/decrement(3)) `, () => {
            for (let i = 1; i <= poopCount; i++) {
              pet.poo();
            }
            pet.clean();
            expect(pet.pollStatus().poopCount).toEqual(0);
          });
        });
      });
    });

    describe('when the pet pooes more than the decrement value and we clean ', () => {
      describe("when we poll the pet's status", () => {
        [4, 5, 6].forEach(poopCount => {
          const expectedPoopCount: number = poopCount - 3;
          it(`should return a status with a poopCount equal to ${expectedPoopCount} (before clean: ${poopCount}/decrement(3)) `, () => {
            for (let i = 1; i <= poopCount; i++) {
              pet.poo();
            }
            pet.clean();
            expect(pet.pollStatus().poopCount).toEqual(expectedPoopCount);
          });
        });
      });
    });
  });
});
