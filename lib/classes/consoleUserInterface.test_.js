"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const consoleUserInterface_1 = __importDefault(require("./consoleUserInterface"));
const terminal_kit_1 = require("terminal-kit");
jest.mock('terminal-kit');
describe('ConsoleUserInterface', () => {
    let ui;
    beforeEach(() => {
        ui = new consoleUserInterface_1.default();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    describe('when the UI is initialised', () => {
        it('should add the on key listener to the terminal', () => {
            expect(terminal_kit_1.terminal.on).toHaveBeenCalledWith('key');
        });
    });
    describe('when we call display rules', () => {
        beforeEach(() => {
            ui.displayRules();
        });
        it('should clear the terminal', () => {
            expect(terminal_kit_1.terminal.clear).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=consoleUserInterface.test_.js.map