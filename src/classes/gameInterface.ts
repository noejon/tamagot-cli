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

export default class GameInterface {
  #terminal: Terminal;

  constructor() {
    this.#terminal = terminal;
    this.initialiseTerminal();
  }

  async promptMainMenu(): Promise<GameMenu> {
    try {
      const choice = await this.singleColumnMenu(TERMINAL_GAME_MENU);
      if (choice.selectedIndex === 0) {
        this.#terminal.clear();
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

  displayChoiceResponse(choice: PlayerChoice | 'sleeping' = 'sleeping'): void {
    if (GAME_MESSAGES[choice]) {
      this.displayMessageInStarRow(GAME_MESSAGES[choice]);
    }
  }

  displayEndGameMessage(status: EndGameMessages): void {
    this.displayMessageInStarRow(END_GAME_MESSAGES[status]);
  }

  displayRules(): void {
    this.#terminal.clear();
    this.#terminal(GAME_RULES);
  }

  displayStatus(status: PetStatus): void {
    const {
      age,
      health,
      lifeStage,
      morale,
      poopCount,
      satiety,
      vigor,
    } = status;
    this.#terminal.clear();
    const starRow = '*'.repeat(50);
    this.#terminal(`\n${starRow}\n\n`);
    const lifeStageEmoticons = LIFE_STAGE_EMOTICONS[lifeStage].repeat(2);
    this.#terminal(
      `${lifeStageEmoticons}  ${lifeStage}  ${lifeStageEmoticons}`
    );
    this.displayValue(age, '🎂🎂  Age 🎂🎂 ', 'years old');
    this.displayValue(health, '🏥🏥  Health  🏥🏥');
    this.displayValue(morale, '😃😃 Morale 😃😃');
    this.displayValue(satiety, '🥣🥣  Satiety  🥣🥣');
    this.displayValue(vigor, '💤💤 Vigor 💤💤');
    this.displayValue(poopCount, '💩💩 Poop 💩💩');
    this.#terminal(`\n\n${starRow}\n`);
  }

  /**
   * Terminate
   * From the documentation: https://github.com/cronvel/terminal-kit/blob/master/doc/high-level.md#grabinput-options--safecallback-
   * Found out that there is a clear in here: https://github.com/cronvel/terminal-kit/blob/master/sample/document/buttons-test.js
   */
  terminate(): void {
    this.#terminal.clear();
    this.#terminal.processExit(0);
  }

  private displayMessageInStarRow(message: string): void {
    const starRow = '*'.repeat(50);
    this.#terminal.clear();
    this.#terminal(`\n${starRow}\n\n${message}\n\n${starRow}\n`);
  }

  private displayValue(value: number, label?: string, suffix?: string): void {
    this.#terminal(
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
    this.#terminal.on('key', (name: string) => {
      if (name === 'CTRL_C') this.terminate();
    });
  }

  private singleColumnMenu(
    menu: Array<string>
  ): Promise<Terminal.SingleColumnMenuResponse> {
    return new Promise((resolve, reject) => {
      this.#terminal.singleColumnMenu(menu, (error, response) => {
        if (error) reject(error);
        else resolve(response);
      });
    });
  }
}
