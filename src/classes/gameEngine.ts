import { terminal } from 'terminal-kit';
import GameInterface from './gameInterface';
// import Pet from './pet';

export default class GameEngine {
  #gameInterface: GameInterface;
  // #pet: Pet;

  constructor() {
    this.#gameInterface = new GameInterface(terminal);
  }

  run(): void {
    this.#gameInterface.displayMessage();
  }
}
