import GameInterface from './gameInterface';
import Pet from './pet';
import { GameMenu } from '../enums/gameMenu';
import { PlayerChoice } from '../enums/playerChoice';
import { EndGameMessages } from '../enums/endGameMessages';

export default class GameEngine {
  #gameInterface: GameInterface;
  #pet: Pet;

  constructor() {
    this.#gameInterface = new GameInterface();
    this.#pet = new Pet({});
  }

  async run(): Promise<void> {
    this.#gameInterface.displayRules();
    const shouldIRun: GameMenu = await this.#gameInterface.promptMainMenu();
    if (shouldIRun === GameMenu.start) {
      this.#pet = new Pet({});
      await this.lifeCycle();
    } else {
      this.#gameInterface.terminate();
    }
  }

  private async lifeCycle(): Promise<void> {
    const lifeCycleInterval = setInterval(() => {
      this.passTime();
    }, 1000);
    while (this.#pet.isAlive()) {
      await this.chooseAction();
    }
    clearInterval(lifeCycleInterval);
    this.handleDeath();
  }

  private passTime(): void {
    this.#pet.live();
  }

  private async chooseAction(): Promise<void> {
    const playerChoice: PlayerChoice = await this.#gameInterface.promptPlayerChoice();
    this.handlePlayerChoice(playerChoice);
  }

  private handleDeath(): void {
    if (this.#pet.pollStatus().health === 0) {
      this.#gameInterface.displayEndGameMessage(EndGameMessages.loss);
    } else {
      this.#gameInterface.displayEndGameMessage(EndGameMessages.win);
    }
  }

  private handlePlayerChoice(playerChoice: PlayerChoice): void {
    if (this.#pet.isSleeping()) {
      this.#gameInterface.displayChoiceResponse();
    } else {
      switch (playerChoice) {
        case PlayerChoice.clean:
          this.#pet.clean();
          break;
        case PlayerChoice.feed:
          this.#pet.feed();
          break;
        case PlayerChoice.playGames:
          this.#pet.playGames();
          break;
        case PlayerChoice.sleep:
          this.#pet.sleep();
          break;
        default:
          this.#gameInterface.displayStatus(this.#pet.pollStatus());
          break;
      }
      this.#gameInterface.displayChoiceResponse(playerChoice);
    }
  }
}
