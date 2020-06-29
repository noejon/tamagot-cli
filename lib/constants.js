"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.END_GAME_MESSAGES = exports.GAME_MESSAGES = exports.LIFE_STAGE_EMOTICONS = exports.TERMINAL_GAME_MENU = exports.TERMINAL_PLAYER_CHOICE = exports.GAME_RULES = exports.TEENAGER_MAX_AGE = exports.CHILD_MAX_AGE = exports.BABY_MAX_AGE = void 0;
exports.BABY_MAX_AGE = 2;
exports.CHILD_MAX_AGE = 10;
exports.TEENAGER_MAX_AGE = 18;
exports.GAME_RULES = `Welcome to tamagot-cli!!!
The rules are simple, you have a little pet that you want to help grow until it becomes an angel.
In which case the game is won. But your pet needs care and attention, otherwise it might die before it is ready to become an angel. 
In which case the game is lost. To care for your pet, you need to:
- feed it when it is hungry
- clean its poop to give him a healthy habitat
- make it sleep when it is tired
- play with it to keep it happy
Good luck
`;
exports.TERMINAL_PLAYER_CHOICE = [
    'Show status',
    'Play with pet',
    'Feed pet',
    'Sing a bedtime song to make the pet sleep',
    'Clean pet',
];
exports.TERMINAL_GAME_MENU = ['Start a new game', 'Exit tamagot-cli'];
exports.LIFE_STAGE_EMOTICONS = {
    baby: '👶',
    child: '🧒',
    teenager: '🧑',
    adult: '🧓',
};
exports.GAME_MESSAGES = {
    clean: '🚿🧼  I am all cleaned up now  🧼🚿',
    feed: '🥨🥨  Mmmmm, that was good  🥨🥨',
    playGames: '⚽⚽  Give me the ball, give me the ball!!!!  ⚽⚽',
    pollStatus: '',
    sleep: '🛏️🛏️  I am sl... zZzZ   🛏️🛏️',
    sleeping: '💤😴  Let me sleep  😴💤',
};
exports.END_GAME_MESSAGES = {
    loss: '👻👻 YOU LOST!! 👻👻',
    win: '😇😇 Congratulation, your pet has now become an angel!! 😇😇',
};
//# sourceMappingURL=constants.js.map