import ConsoleUserInterface from './consoleUserInterface';
import { GAME_RULES } from '../constants';

describe('ConsoleUserInterface', () => {
  let ui: ConsoleUserInterface;
  const originalStdout = process.stdout;

  beforeEach(() => {
    process.stdout.write = jest.fn();
    ui = new ConsoleUserInterface();
  });

  afterEach(() => {
    process.stdout.write = originalStdout.write;
    jest.resetAllMocks();
  });

  describe('when we call display rules', () => {
    beforeEach(() => {
      ui.displayRules();
    });
    it('should clear the terminal', () => {
      expect(process.stdout.write).toHaveBeenCalledWith(GAME_RULES);
    });
  });

  /**
   * Here there are many other functions that I should write unit test for. But it would be quite tedious and long for the current scope.
   */
});
