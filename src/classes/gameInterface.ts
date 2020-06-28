import { Terminal } from 'terminal-kit';

export default class GameInterface {
  #terminal: Terminal;

  constructor(terminal: Terminal) {
    this.#terminal = terminal;
    this.initialiseTerminal();
  }

  displayMessage(): void {
    this.#terminal('Hello, world!');
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

  /**
   * Terminate
   * From the documentation: https://github.com/cronvel/terminal-kit/blob/master/doc/high-level.md#grabinput-options--safecallback-
   * Found out that there is a clear in here: https://github.com/cronvel/terminal-kit/blob/master/sample/document/buttons-test.js
   */
  private terminate(): void {
    this.#terminal.grabInput(false);
    this.#terminal.clear();
    setTimeout(() => {
      process.exit();
    }, 100);
  }
}
