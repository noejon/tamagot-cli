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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _gameInterface, _pet;
Object.defineProperty(exports, "__esModule", { value: true });
const consoleUserInterface_1 = __importDefault(require("./consoleUserInterface"));
const pet_1 = __importDefault(require("./pet"));
const gameMenu_1 = require("../enums/gameMenu");
const playerChoice_1 = require("../enums/playerChoice");
const endGameMessages_1 = require("../enums/endGameMessages");
class Tamagotchi {
    constructor() {
        _gameInterface.set(this, void 0);
        _pet.set(this, void 0);
        __classPrivateFieldSet(this, _gameInterface, new consoleUserInterface_1.default());
        __classPrivateFieldSet(this, _pet, new pet_1.default({}));
    }
    async run() {
        __classPrivateFieldGet(this, _gameInterface).displayRules();
        await this.gameLoop();
    }
    async lifeCycle() {
        const lifeCycleInterval = setInterval(() => {
            this.passTime();
        }, 1000);
        while (__classPrivateFieldGet(this, _pet).isAlive()) {
            await this.chooseAction();
        }
        clearInterval(lifeCycleInterval);
        await this.handleDeath();
    }
    passTime() {
        __classPrivateFieldGet(this, _pet).live();
    }
    async chooseAction() {
        const playerChoice = await __classPrivateFieldGet(this, _gameInterface).promptPlayerChoice();
        this.handlePlayerChoice(playerChoice);
    }
    async handleDeath() {
        const petState = __classPrivateFieldGet(this, _pet).pollStatus();
        if (petState.health === 0) {
            __classPrivateFieldGet(this, _gameInterface).displayEndGameMessage(endGameMessages_1.EndGameMessages.loss, petState);
        }
        else {
            __classPrivateFieldGet(this, _gameInterface).displayEndGameMessage(endGameMessages_1.EndGameMessages.win, petState);
        }
        await this.gameLoop();
    }
    handlePlayerChoice(playerChoice) {
        if (__classPrivateFieldGet(this, _pet).isSleeping()) {
            __classPrivateFieldGet(this, _gameInterface).displayChoiceResponse();
        }
        else {
            switch (playerChoice) {
                case playerChoice_1.PlayerChoice.clean:
                    __classPrivateFieldGet(this, _pet).clean();
                    break;
                case playerChoice_1.PlayerChoice.feed:
                    __classPrivateFieldGet(this, _pet).feed();
                    break;
                case playerChoice_1.PlayerChoice.playGames:
                    __classPrivateFieldGet(this, _pet).playGames();
                    break;
                case playerChoice_1.PlayerChoice.sleep:
                    __classPrivateFieldGet(this, _pet).sleep();
                    break;
                default:
                    __classPrivateFieldGet(this, _gameInterface).displayStatus(__classPrivateFieldGet(this, _pet).pollStatus());
                    break;
            }
            __classPrivateFieldGet(this, _gameInterface).displayChoiceResponse(playerChoice);
        }
    }
    async gameLoop() {
        const shouldIRun = await __classPrivateFieldGet(this, _gameInterface).promptMainMenu();
        if (shouldIRun === gameMenu_1.GameMenu.start) {
            __classPrivateFieldSet(this, _pet, new pet_1.default({}));
            await this.lifeCycle();
        }
        else {
            __classPrivateFieldGet(this, _gameInterface).terminate();
        }
    }
}
exports.default = Tamagotchi;
_gameInterface = new WeakMap(), _pet = new WeakMap();
//# sourceMappingURL=tamagotchi.js.map