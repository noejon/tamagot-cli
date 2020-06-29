import ConsoleUserInterface from './consoleUserInterface';
import Pet from './pet';
import { GameMenu } from '../enums/gameMenu';
import { PlayerChoice } from '../enums/playerChoice';
import { EndGameMessages } from '../enums/endGameMessages';
import { GameEngine } from '../interfaces/gameEngine';

export default class Tamagotchi implements GameEngine {
  #gameInterface: ConsoleUserInterface;
  #pet: Pet;

  constructor() {
    this.#gameInterface = new ConsoleUserInterface();
    this.#pet = new Pet({});
  }

  async run(): Promise<void> {
    this.#gameInterface.displayRules();
    await this.gameLoop();
  }

  private async lifeCycle(): Promise<void> {
    const lifeCycleInterval = setInterval(() => {
      this.passTime();
    }, 1000);
    while (this.#pet.isAlive()) {
      await this.chooseAction();
    }
    clearInterval(lifeCycleInterval);
    await this.handleDeath();
  }

  private passTime(): void {
    this.#pet.live();
  }

  private async chooseAction(): Promise<void> {
    const playerChoice: PlayerChoice = await this.#gameInterface.promptPlayerChoice();
    this.handlePlayerChoice(playerChoice);
  }

  private async handleDeath(): Promise<void> {
    const petState = this.#pet.pollStatus();
    if (petState.health === 0) {
      this.#gameInterface.displayEndGameMessage(EndGameMessages.loss, petState);
    } else {
      this.#gameInterface.displayEndGameMessage(EndGameMessages.win, petState);
    }
    await this.gameLoop();
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

  private async gameLoop(): Promise<void> {
    const shouldIRun: GameMenu = await this.#gameInterface.promptMainMenu();
    if (shouldIRun === GameMenu.start) {
      this.#pet = new Pet({});
      await this.lifeCycle();
    } else {
      this.#gameInterface.terminate();
    }
  }
}
