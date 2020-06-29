import { LifeStage } from './enums/lifeStages';
import { EndGameMessages } from './enums/endGameMessages';
import { PlayerChoice } from './enums/playerChoice';
export declare const BABY_MAX_AGE = 2;
export declare const CHILD_MAX_AGE = 10;
export declare const TEENAGER_MAX_AGE = 18;
export declare const GAME_RULES = "Welcome to tamagot-cli!!!\nThe rules are simple, you have a little pet that you want to help grow until it becomes an angel.\nIn which case the game is won. But your pet needs care and attention, otherwise it might die before it is ready to become an angel. \nIn which case the game is lost. To care for your pet, you need to:\n- feed it when it is hungry\n- clean its poop to give him a healthy habitat\n- make it sleep when it is tired\n- play with it to keep it happy\nGood luck\n";
export declare const TERMINAL_PLAYER_CHOICE: string[];
export declare const TERMINAL_GAME_MENU: string[];
export declare const LIFE_STAGE_EMOTICONS: {
    [key in LifeStage]: string;
};
export declare const GAME_MESSAGES: {
    [key in PlayerChoice | 'sleeping']: string;
};
export declare const END_GAME_MESSAGES: {
    [key in EndGameMessages]: string;
};
//# sourceMappingURL=constants.d.ts.map