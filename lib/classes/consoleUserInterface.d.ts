import { PetStatus } from '../types/petStatus';
import { GameMenu } from '../enums/gameMenu';
import { PlayerChoice } from '../enums/playerChoice';
import { EndGameMessages } from '../enums/endGameMessages';
export default class ConsoleUserInterface {
    #private;
    constructor();
    displayChoiceResponse(choice?: PlayerChoice | 'sleeping'): void;
    displayEndGameMessage(gameState: EndGameMessages, petState: PetStatus): void;
    displayRules(): void;
    displayStatus(status: PetStatus): void;
    promptMainMenu(): Promise<GameMenu>;
    promptPlayerChoice(): Promise<PlayerChoice>;
    /**
     * Terminate
     * From the documentation: https://github.com/cronvel/terminal-kit/blob/master/doc/high-level.md#grabinput-options--safecallback-
     * Found out that there is a clear in here: https://github.com/cronvel/terminal-kit/blob/master/sample/document/buttons-test.js
     */
    terminate(): void;
    private displayRawStatus;
    private displayMessageInStarRow;
    private displayValue;
    private initialiseTerminal;
    /**
     * Terminal kit disables CTRL-C as an exit option by default
     * Here we set that up
     * From the documentation: https://github.com/cronvel/terminal-kit/blob/master/doc/high-level.md#grabinput-options--safecallback-
     */
    private addCTRLCKeyListener;
    private singleColumnMenu;
}
//# sourceMappingURL=consoleUserInterface.d.ts.map