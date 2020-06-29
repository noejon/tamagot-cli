import ConsoleUserInterface from './consoleUserInterface';
import { terminal } from 'terminal-kit';

jest.mock('terminal-kit');

describe('ConsoleUserInterface', () => {
  let ui: ConsoleUserInterface;

  beforeEach(() => {
    ui = new ConsoleUserInterface();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when the UI is initialised', () => {
    it('should add the on key listener to the terminal', () => {
      expect(terminal.on).toHaveBeenCalledWith('key');
    });
  });

  describe('when we call display rules', () => {
    beforeEach(() => {
      ui.displayRules();
    });
    it('should clear the terminal', () => {
      expect(terminal.clear).toHaveBeenCalled();
    });
  });
});
