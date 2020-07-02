import { LifeStage } from './enums/lifeStages';
import { EndGameMessages } from './enums/endGameMessages';
import { PlayerChoice } from './enums/playerChoice';

export const BABY_MAX_AGE = 2;
export const CHILD_MAX_AGE = 10;
export const TEENAGER_MAX_AGE = 18;

export const GAME_RULES = `Welcome to tamagot-cli!!!
The rules are simple, you have a little pet that you want to help grow until it becomes an angel.
In which case the game is won. But your pet needs care and attention, otherwise it might die before it is ready to become an angel. 
In which case the game is lost. 
A pet becomes an angel after it reaches age 27. It gains one year whenever it sleeps.
It goes to sleep automatically when the vigor reaches 2.
Every 3 seconds an automatic set of actions happens:
- Satiety decreases
- Vigor decreases
- Morale decreases
- Poop can happen
- Healing: If satiety, vigor and morale are all above 75% of their max values, 2 health points are gained
- Damaging: See below
One damage is dealt when:
- The pet is hungry (satiety reaches 0)
- It is sad (morale reaches 0)
- It is too tired (vigor goes below 4)
- It is surrounded by poop (poop count reaches 5)
Those can be cumulated, so at any time 4 damages could be inflicted to the the pet.
To care for your pet, you need to:
- feed it when it is hungry
- clean its poop to give him a healthy habitat
- make it sleep when it is tired
- play with it to keep it happy
Good luck
`;

export const TERMINAL_PLAYER_CHOICE = [
  'Show status',
  'Play with pet',
  'Feed pet',
  'Sing a bedtime song to make the pet sleep',
  'Clean pet',
];

export const TERMINAL_GAME_MENU = ['Start a new game', 'Exit tamagot-cli'];

export const LIFE_STAGE_EMOTICONS: { [key in LifeStage]: string } = {
  baby: '👶',
  child: '🧒',
  teenager: '🧑',
  adult: '🧓',
};

export const GAME_MESSAGES: { [key in PlayerChoice | 'sleeping']: string } = {
  clean: '🚿🧼  I am all cleaned up now  🧼🚿',
  feed: '🥨🥨  Mmmmm, that was good  🥨🥨',
  playGames: '⚽⚽  Give me the ball, give me the ball!!!!  ⚽⚽',
  pollStatus: '',
  sleep: '🛏️🛏️  I am sl... zZzZ   🛏️🛏️',
  sleeping: '💤😴  Let me sleep  😴💤',
};

export const END_GAME_MESSAGES: { [key in EndGameMessages]: string } = {
  loss: '👻👻 YOU LOST!! 👻👻',
  win: '😇😇 Congratulation, your pet has now become an angel!! 😇😇',
};
