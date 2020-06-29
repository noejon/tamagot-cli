"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _terminal;
Object.defineProperty(exports, "__esModule", { value: true });
const terminal_kit_1 = require("terminal-kit");
const constants_1 = require("../constants");
const gameMenu_1 = require("../enums/gameMenu");
const playerChoice_1 = require("../enums/playerChoice");
class ConsoleUserInterface {
    constructor() {
        _terminal.set(this, void 0);
        __classPrivateFieldSet(this, _terminal, terminal_kit_1.terminal);
        this.initialiseTerminal();
    }
    displayChoiceResponse(choice = 'sleeping') {
        if (constants_1.GAME_MESSAGES[choice]) {
            this.displayMessageInStarRow(constants_1.GAME_MESSAGES[choice]);
        }
    }
    displayEndGameMessage(gameState, petState) {
        this.displayMessageInStarRow(constants_1.END_GAME_MESSAGES[gameState]);
        this.displayRawStatus(petState);
    }
    displayRules() {
        __classPrivateFieldGet(this, _terminal).clear();
        __classPrivateFieldGet(this, _terminal).call(this, constants_1.GAME_RULES);
    }
    displayStatus(status) {
        __classPrivateFieldGet(this, _terminal).clear();
        this.displayRawStatus(status);
    }
    async promptMainMenu() {
        try {
            const choice = await this.singleColumnMenu(constants_1.TERMINAL_GAME_MENU);
            if (choice.selectedIndex === 0) {
                __classPrivateFieldGet(this, _terminal).clear();
                return gameMenu_1.GameMenu.start;
            }
            else {
                return gameMenu_1.GameMenu.exit;
            }
        }
        catch (error) {
            return gameMenu_1.GameMenu.exit;
        }
    }
    async promptPlayerChoice() {
        try {
            const choice = await this.singleColumnMenu(constants_1.TERMINAL_PLAYER_CHOICE);
            switch (choice.selectedIndex) {
                case 0:
                    return playerChoice_1.PlayerChoice.pollStatus;
                case 1:
                    return playerChoice_1.PlayerChoice.playGames;
                case 2:
                    return playerChoice_1.PlayerChoice.feed;
                case 3:
                    return playerChoice_1.PlayerChoice.sleep;
                case 4:
                    return playerChoice_1.PlayerChoice.clean;
                default:
                    return playerChoice_1.PlayerChoice.pollStatus;
            }
        }
        catch (error) {
            return playerChoice_1.PlayerChoice.pollStatus;
        }
    }
    /**
     * Terminate
     * From the documentation: https://github.com/cronvel/terminal-kit/blob/master/doc/high-level.md#grabinput-options--safecallback-
     * Found out that there is a clear in here: https://github.com/cronvel/terminal-kit/blob/master/sample/document/buttons-test.js
     */
    terminate() {
        __classPrivateFieldGet(this, _terminal).clear();
        __classPrivateFieldGet(this, _terminal).processExit(0);
    }
    displayRawStatus({ age, health, lifeStage, morale, poopCount, satiety, vigor, }) {
        const starRow = '*'.repeat(50);
        __classPrivateFieldGet(this, _terminal).call(this, `\n${starRow}\n\n`);
        const lifeStageEmoticons = constants_1.LIFE_STAGE_EMOTICONS[lifeStage].repeat(2);
        __classPrivateFieldGet(this, _terminal).call(this, `${lifeStageEmoticons}  ${lifeStage}  ${lifeStageEmoticons}`);
        this.displayValue(age, '🎂🎂  Age 🎂🎂 ', 'years old');
        this.displayValue(health, '🏥🏥  Health  🏥🏥');
        this.displayValue(morale, '😃😃 Morale 😃😃');
        this.displayValue(satiety, '🥣🥣  Satiety  🥣🥣');
        this.displayValue(vigor, '💤💤 Vigor 💤💤');
        this.displayValue(poopCount, '💩💩 Poop 💩💩');
        __classPrivateFieldGet(this, _terminal).call(this, `\n\n${starRow}\n`);
    }
    displayMessageInStarRow(message) {
        const starRow = '*'.repeat(50);
        __classPrivateFieldGet(this, _terminal).clear();
        __classPrivateFieldGet(this, _terminal).call(this, `\n${starRow}\n\n${message}\n\n${starRow}\n`);
    }
    displayValue(value, label, suffix) {
        __classPrivateFieldGet(this, _terminal).call(this, `\n${label ? `${label}: ` : ''}${value}${suffix ? ` ${suffix}` : ''}`);
    }
    initialiseTerminal() {
        this.addCTRLCKeyListener();
    }
    /**
     * Terminal kit disables CTRL-C as an exit option by default
     * Here we set that up
     * From the documentation: https://github.com/cronvel/terminal-kit/blob/master/doc/high-level.md#grabinput-options--safecallback-
     */
    addCTRLCKeyListener() {
        __classPrivateFieldGet(this, _terminal).on('key', (name) => {
            if (name === 'CTRL_C')
                this.terminate();
        });
    }
    singleColumnMenu(menu) {
        return new Promise((resolve, reject) => {
            __classPrivateFieldGet(this, _terminal).singleColumnMenu(menu, (error, response) => {
                if (error)
                    reject(error);
                else
                    resolve(response);
            });
        });
    }
}
exports.default = ConsoleUserInterface;
_terminal = new WeakMap();
//# sourceMappingURL=consoleUserInterface.js.map