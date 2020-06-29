import { Organism } from '../interfaces/organism';
import { PetStatus } from '../types/petStatus';
import { PetConfiguration } from '../types/petConfiguration';
export default class Pet implements Organism {
    #private;
    constructor({ exhaustionTreshold, healthGainTresholdPercentage, healthIncrement, maxAge, maxHealth, maxSatiety, maxMorale, maxVigor, moraleDecrement, moraleIncrement, poopIncrement, poopDecrement, poopTreshold, satietyDecrement, satietyIncrement, sleepinessTreshold, vigorDecrement, }: PetConfiguration);
    clean(): void;
    feed(): void;
    isAlive(): boolean;
    isSleeping(): boolean;
    live(): void;
    sleep(): void;
    playGames(): void;
    pollStatus(): PetStatus;
    private poo;
    private calculateLifeStage;
    private damage;
    private handleSleep;
    private heal;
    private isClean;
    private isHappy;
    private isVigorous;
    private isWellFed;
}
//# sourceMappingURL=pet.d.ts.map