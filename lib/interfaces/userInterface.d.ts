import { GameMenu } from '../enums/gameMenu';
import { PlayerChoice } from '../enums/playerChoice';
import { EndGameMessages } from '../enums/endGameMessages';
import { PetStatus } from '../types/petStatus';
export interface UserInterface {
    displayChoiceResponse(choice: PlayerChoice | 'sleeping'): void;
    displayEndGameMessage(status: EndGameMessages): void;
    displayRules(): void;
    displayStatus(status: PetStatus): void;
    terminate(): void;
    promptMainMenu(): Promise<GameMenu>;
    promptPlayerChoice(): Promise<PlayerChoice>;
}
//# sourceMappingURL=userInterface.d.ts.map