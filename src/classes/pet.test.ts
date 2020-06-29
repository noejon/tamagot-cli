import times from 'lodash/times';
import Pet from './pet';
import { LifeStage } from '../enums/lifeStages';
import { PetStatus } from '../types/petStatus';

import { TEENAGER_MAX_AGE, BABY_MAX_AGE, CHILD_MAX_AGE } from '../constants';

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

    const avoidDeathLoop = (loopNumber: number): void => {
      times(loopNumber, () => {
        times(6, () => {
          pet.feed();
        });
        pet.clean();
        times(4, () => {
          pet.playGames();
        });
        pet.live();
      });
    };

    beforeEach(() => {
      pet = new Pet({});
    });

    beforeAll(() => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
    });

    afterAll(() => {
      jest.clearAllMocks();
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

    describe('when we check if the pet is sleeping', () => {
      it('should return false', () => {
        expect(pet.isSleeping()).toEqual(false);
      });
    });

    describe("when the pet live it's day", () => {
      describe('when live() is called once', () => {
        describe('when we call pollStatus', () => {
          it('should return the status after decrement', () => {
            pet.live();
            expect(pet.pollStatus()).toEqual({
              ...expectedPollStatus,
              morale: 9,
              satiety: 18,
              vigor: 14,
            });
          });
        });
      });

      describe('when the age passes a life stage mark', () => {
        [
          { loopNumber: 400, ageCeiling: 27, expectedResult: LifeStage.Adult },
          {
            loopNumber: 200,
            ageCeiling: TEENAGER_MAX_AGE,
            expectedResult: LifeStage.Teenager,
          },
          {
            loopNumber: 100,
            ageCeiling: CHILD_MAX_AGE,
            expectedResult: LifeStage.Child,
          },
          {
            loopNumber: 1,
            ageCeiling: BABY_MAX_AGE,
            expectedResult: LifeStage.Baby,
          },
        ].forEach(({ loopNumber, ageCeiling, expectedResult }) => {
          describe(`when the age is less or equal than (${ageCeiling})`, () => {
            describe('when we poll the status', () => {
              beforeEach(() => {
                avoidDeathLoop(loopNumber);
              });
              it('should return true', () => {
                const { lifeStage } = pet.pollStatus();
                expect(lifeStage).toEqual(expectedResult);
              });
            });
          });
        });
      });

      describe('when the health reaches 0', () => {
        beforeEach(() => {
          times(26, () => {
            pet.live();
          });
        });

        describe("when we poll the pet's status", () => {
          it('should return an age less than 27 and a health of 0', () => {
            const { age, health } = pet.pollStatus();
            expect({ age, health }).toEqual({
              age: 2,
              health: 0,
            });
          });
        });

        describe('when we call isAlive', () => {
          it('should return false', () => {
            expect(pet.isAlive()).toEqual(false);
          });
        });
      });

      describe('when the age reaches 0 and the health is greater than 0', () => {
        beforeEach(() => {
          avoidDeathLoop(400);
        });

        describe("when we poll the pet's status", () => {
          it('should return an age of 27 and a health of 40', () => {
            const { age, health } = pet.pollStatus();
            expect({ age, health }).toEqual({
              age: 27,
              health: 37,
            });
          });
        });

        describe('when we call isAlive', () => {
          it('should return false', () => {
            expect(pet.isAlive()).toEqual(false);
          });
        });
      });
    });

    // TODO:
    // feed
    // playGames
    // damage
    // heal
    // sleep
  });
});
