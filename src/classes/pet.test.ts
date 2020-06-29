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
      /**
       * Parts of the game are handled with random numbers. For our tests to be consistent,
       * we need to have random returning a constant value
       */
      jest.spyOn(Math, 'random').mockReturnValue(0.5);
    });

    afterEach(() => {
      jest.resetAllMocks();
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
              morale: 8,
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
              age: 1,
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
          it('should return an age of 27 and a health of 37', () => {
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

    describe('when the feed function is called', () => {
      describe('when the pet is fed more than three times and live() is called', () => {
        beforeEach(() => {
          times(3, () => {
            pet.feed();
          });
          pet.live();
        });

        it('should return a poop count of 1', () => {
          const { poopCount } = pet.pollStatus();
          expect(poopCount).toEqual(1);
        });
      });

      describe('when the pet is fed after the satiety level dropped after calling live 3 times (satiety level at 14)', () => {
        beforeEach(() => {
          times(3, () => {
            pet.live();
          });
          pet.feed();
        });

        it('should return a satiety level of 19 (14 + 4 increment)', () => {
          const { satiety } = pet.pollStatus();
          expect(satiety).toEqual(19);
        });
      });
    });

    describe('when the play games function is called', () => {
      describe('when the game is played after the morale level dropped after calling live 4 times (morale level at 2)', () => {
        beforeEach(() => {
          times(4, () => {
            pet.live();
          });
          pet.playGames();
        });

        it('should return a satiety level of 8 (2  + 6 increment)', () => {
          const { morale } = pet.pollStatus();
          expect(morale).toEqual(8);
        });
      });
    });

    /**
     * The sleep is handled with random numbers, here we are cheating by making random return the value we want
     */
    describe('when the sleep function is called', () => {
      describe('when the sleep happens below the sleepiness treshold', () => {
        beforeEach(() => {
          avoidDeathLoop(12);
          pet.sleep();
        });

        it('should set the pet asleep', () => {
          expect(pet.isSleeping()).toBe(true);
        });

        describe('when live happens while asleep and the random value added to the vigor is less than the sleepiness treshold', () => {
          beforeEach(() => {
            jest.spyOn(Math, 'random').mockReturnValue(0);
            pet.live();
          });

          it('should add the random value to the vigor', () => {
            const { vigor } = pet.pollStatus();
            expect(vigor).toEqual(4);
          });
        });

        describe('when the random value added to the vigor is more than the sleepiness treshold', () => {
          beforeEach(() => {
            jest.spyOn(Math, 'random').mockReturnValue(1);
            pet.live();
          });

          it('should reset the vigor to the maxVigor value', () => {
            const { vigor } = pet.pollStatus();
            expect(vigor).toEqual(15);
          });
        });
      });
    });

    describe('when life happens and the vigor reaches the exhausted treshold', () => {
      beforeEach(() => {
        avoidDeathLoop(13);
      });

      it('should set the pet to sleep automatically', () => {
        expect(pet.isSleeping()).toEqual(true);
      });
    });

    describe('when life happens the pet takes damage', () => {
      describe('when satiety, morale and vigor reach a treshold level', () => {
        it('should reduce the health by 1 for each status (by 3) when life happens', () => {
          times(10, () => {
            pet.live();
          });
          expect(pet.pollStatus().health).toEqual(33);
          pet.live();
          expect(pet.pollStatus().health).toEqual(30);
        });
      });

      describe('when only poop inflicts damage', () => {
        beforeEach(() => {
          jest.spyOn(Math, 'random').mockReturnValue(0.5);
        });

        it('should reduce the health by 1 when life happens', () => {
          times(7, () => {
            pet.feed();
            pet.live();
          });
          expect(pet.pollStatus().health).toEqual(37);
          pet.live();
          expect(pet.pollStatus().health).toEqual(36);
        });
      });
    });

    describe('when life happens the pet heals', () => {
      describe('when satiety, morale and vigor are above 75% but the poop amount should deal one damage', () => {
        it('should not reduce the health when life happens and remain 40', () => {
          times(100, () => {
            pet.feed();
            pet.playGames();
            pet.sleep();
            pet.live();
          });
          expect(pet.pollStatus().health).toEqual(40);
        });
      });
    });
  });
});
