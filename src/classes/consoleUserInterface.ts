import { terminal, Terminal } from 'terminal-kit';
import {
  END_GAME_MESSAGES,
  TERMINAL_GAME_MENU,
  GAME_MESSAGES,
  GAME_RULES,
  LIFE_STAGE_EMOTICONS,
  TERMINAL_PLAYER_CHOICE,
} from '../constants';
import { PetStatus } from '../types/petStatus';
import { GameMenu } from '../enums/gameMenu';
import { PlayerChoice } from '../enums/playerChoice';
import { EndGameMessages } from '../enums/endGameMessages';

export default class ConsoleUserInterface {
  constructor() {
    this.initialiseTerminal();
  }

  displayChoiceResponse(choice: PlayerChoice | 'sleeping' = 'sleeping'): void {
    if (GAME_MESSAGES[choice]) {
      this.displayMessageInStarRow(GAME_MESSAGES[choice]);
    }
  }

  displayEndGameMessage(gameState: EndGameMessages, petState: PetStatus): void {
    this.displayMessageInStarRow(END_GAME_MESSAGES[gameState]);
    this.displayRawStatus(petState);
  }

  displayRules(): void {
    terminal.clear();
    terminal(GAME_RULES);
  }

  displayStatus(status: PetStatus): void {
    terminal.clear();
    this.displayRawStatus(status);
  }

  async promptMainMenu(): Promise<GameMenu> {
    try {
      const choice = await this.singleColumnMenu(TERMINAL_GAME_MENU);
      if (choice.selectedIndex === 0) {
        terminal.clear();
        return GameMenu.start;
      } else {
        return GameMenu.exit;
      }
    } catch (error) {
      return GameMenu.exit;
    }
  }

  async promptPlayerChoice(): Promise<PlayerChoice> {
    try {
      const choice = await this.singleColumnMenu(TERMINAL_PLAYER_CHOICE);
      switch (choice.selectedIndex) {
        case 0:
          return PlayerChoice.pollStatus;
        case 1:
          return PlayerChoice.playGames;
        case 2:
          return PlayerChoice.feed;
        case 3:
          return PlayerChoice.sleep;
        case 4:
          return PlayerChoice.clean;
        default:
          return PlayerChoice.pollStatus;
      }
    } catch (error) {
      return PlayerChoice.pollStatus;
    }
  }

  /**
   * Terminate
   * From the documentation: https://github.com/cronvel/terminal-kit/blob/master/doc/high-level.md#grabinput-options--safecallback-
   * Found out that there is a clear in here: https://github.com/cronvel/terminal-kit/blob/master/sample/document/buttons-test.js
   */
  terminate(): void {
    terminal.clear();
    terminal.processExit(0);
  }

  private displayRawStatus({
    age,
    health,
    lifeStage,
    morale,
    poopCount,
    satiety,
    vigor,
  }: PetStatus) {
    const starRow = '*'.repeat(50);
    terminal(`\n${starRow}\n\n`);
    const lifeStageEmoticons = LIFE_STAGE_EMOTICONS[lifeStage].repeat(2);
    terminal(`${lifeStageEmoticons}  ${lifeStage}  ${lifeStageEmoticons}`);
    this.displayValue(age, '🎂🎂  Age 🎂🎂 ', 'years old');
    this.displayValue(health, '🏥🏥  Health  🏥🏥');
    this.displayValue(morale, '😃😃 Morale 😃😃');
    this.displayValue(satiety, '🥣🥣  Satiety  🥣🥣');
    this.displayValue(vigor, '💤💤 Vigor 💤💤');
    this.displayValue(poopCount, '💩💩 Poop 💩💩');
    terminal(`\n\n${starRow}\n`);
  }

  private displayMessageInStarRow(message: string): void {
    const starRow = '*'.repeat(50);
    terminal.clear();
    terminal(`\n${starRow}\n\n${message}\n\n${starRow}\n`);
  }

  private displayValue(value: number, label?: string, suffix?: string): void {
    terminal(
      `\n${label ? `${label}: ` : ''}${value}${suffix ? ` ${suffix}` : ''}`
    );
  }

  private initialiseTerminal(): void {
    this.addCTRLCKeyListener();
  }

  /**
   * Terminal kit disables CTRL-C as an exit option by default
   * Here we set that up
   * From the documentation: https://github.com/cronvel/terminal-kit/blob/master/doc/high-level.md#grabinput-options--safecallback-
   */
  private addCTRLCKeyListener(): void {
    terminal.on('key', (name: string) => {
      if (name === 'CTRL_C') this.terminate();
    });
  }

  private singleColumnMenu(
    menu: Array<string>
  ): Promise<Terminal.SingleColumnMenuResponse> {
    return new Promise((resolve, reject) => {
      terminal.singleColumnMenu(menu, (error, response) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
  }
}
