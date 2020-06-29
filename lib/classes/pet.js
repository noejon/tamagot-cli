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
var _age, _exhaustionTreshold, _foodCounter, _health, _healthGainTresholdPercentage, _healthIncrement, _isSleeping, _maxAge, _maxHealth, _maxSatiety, _maxMorale, _maxVigor, _morale, _moraleDecrement, _moraleIncrement, _poopCount, _poopDecrement, _poopIncrement, _poopTreshold, _satiety, _satietyDecrement, _satietyIncrement, _sleepinessTreshold, _vigor, _vigorDecrement;
Object.defineProperty(exports, "__esModule", { value: true });
const lifeStages_1 = require("../enums/lifeStages");
const constants_1 = require("../constants");
const decrement_1 = __importDefault(require("../utils/decrement"));
const increment_1 = __importDefault(require("../utils/increment"));
class Pet {
    constructor({ exhaustionTreshold = 2, healthGainTresholdPercentage = 75, healthIncrement = 2, maxAge = 27, maxHealth = 40, maxSatiety = 20, maxMorale = 10, maxVigor = 15, moraleDecrement = 2, moraleIncrement = 6, poopIncrement = 1, poopDecrement = 2, poopTreshold = 5, satietyDecrement = 2, satietyIncrement = 5, sleepinessTreshold = 4, vigorDecrement = 1, }) {
        _age.set(this, 0);
        _exhaustionTreshold.set(this, void 0);
        _foodCounter.set(this, 0);
        _health.set(this, void 0);
        _healthGainTresholdPercentage.set(this, void 0);
        _healthIncrement.set(this, void 0);
        _isSleeping.set(this, false);
        _maxAge.set(this, void 0);
        _maxHealth.set(this, void 0);
        _maxSatiety.set(this, void 0);
        _maxMorale.set(this, void 0);
        _maxVigor.set(this, void 0);
        _morale.set(this, void 0);
        _moraleDecrement.set(this, void 0);
        _moraleIncrement.set(this, void 0);
        _poopCount.set(this, 0);
        _poopDecrement.set(this, void 0);
        _poopIncrement.set(this, void 0);
        _poopTreshold.set(this, void 0);
        _satiety.set(this, void 0);
        _satietyDecrement.set(this, void 0);
        _satietyIncrement.set(this, void 0);
        _sleepinessTreshold.set(this, void 0);
        _vigor.set(this, void 0);
        _vigorDecrement.set(this, void 0);
        __classPrivateFieldSet(this, _maxAge, maxAge);
        __classPrivateFieldSet(this, _maxHealth, maxHealth);
        __classPrivateFieldSet(this, _maxSatiety, maxSatiety);
        __classPrivateFieldSet(this, _maxMorale, maxMorale);
        __classPrivateFieldSet(this, _maxVigor, maxVigor);
        __classPrivateFieldSet(this, _healthIncrement, healthIncrement);
        __classPrivateFieldSet(this, _moraleDecrement, moraleDecrement);
        __classPrivateFieldSet(this, _moraleIncrement, moraleIncrement);
        __classPrivateFieldSet(this, _poopIncrement, poopIncrement);
        __classPrivateFieldSet(this, _poopDecrement, poopDecrement);
        __classPrivateFieldSet(this, _satietyDecrement, satietyDecrement);
        __classPrivateFieldSet(this, _satietyIncrement, satietyIncrement);
        __classPrivateFieldSet(this, _vigorDecrement, vigorDecrement);
        __classPrivateFieldSet(this, _exhaustionTreshold, exhaustionTreshold);
        __classPrivateFieldSet(this, _healthGainTresholdPercentage, healthGainTresholdPercentage);
        __classPrivateFieldSet(this, _poopTreshold, poopTreshold);
        __classPrivateFieldSet(this, _sleepinessTreshold, sleepinessTreshold);
        __classPrivateFieldSet(this, _health, __classPrivateFieldGet(this, _maxHealth));
        __classPrivateFieldSet(this, _satiety, __classPrivateFieldGet(this, _maxSatiety));
        __classPrivateFieldSet(this, _morale, __classPrivateFieldGet(this, _maxMorale));
        __classPrivateFieldSet(this, _vigor, __classPrivateFieldGet(this, _maxVigor));
    }
    clean() {
        __classPrivateFieldSet(this, _poopCount, decrement_1.default(__classPrivateFieldGet(this, _poopCount), __classPrivateFieldGet(this, _poopDecrement)));
    }
    feed() {
        __classPrivateFieldSet(this, _satiety, increment_1.default(__classPrivateFieldGet(this, _satiety), __classPrivateFieldGet(this, _satietyIncrement), __classPrivateFieldGet(this, _maxSatiety)));
        __classPrivateFieldSet(this, _foodCounter, +__classPrivateFieldGet(this, _foodCounter) + 1);
    }
    isAlive() {
        return __classPrivateFieldGet(this, _age) < __classPrivateFieldGet(this, _maxAge) && __classPrivateFieldGet(this, _health) > 0;
    }
    isSleeping() {
        return __classPrivateFieldGet(this, _isSleeping);
    }
    live() {
        if (this.isAlive()) {
            __classPrivateFieldSet(this, _morale, decrement_1.default(__classPrivateFieldGet(this, _morale), __classPrivateFieldGet(this, _moraleDecrement)));
            __classPrivateFieldSet(this, _satiety, decrement_1.default(__classPrivateFieldGet(this, _satiety), __classPrivateFieldGet(this, _satietyDecrement)));
            if (!__classPrivateFieldGet(this, _isSleeping)) {
                __classPrivateFieldSet(this, _vigor, decrement_1.default(__classPrivateFieldGet(this, _vigor), __classPrivateFieldGet(this, _vigorDecrement)));
                this.poo();
            }
            this.damage();
            this.heal();
            this.handleSleep();
        }
    }
    sleep() {
        __classPrivateFieldSet(this, _isSleeping, true);
        __classPrivateFieldSet(this, _age, +__classPrivateFieldGet(this, _age) + 1);
    }
    playGames() {
        __classPrivateFieldSet(this, _morale, increment_1.default(__classPrivateFieldGet(this, _morale), __classPrivateFieldGet(this, _moraleIncrement), __classPrivateFieldGet(this, _maxMorale)));
    }
    pollStatus() {
        return {
            age: __classPrivateFieldGet(this, _age),
            health: __classPrivateFieldGet(this, _health),
            lifeStage: this.calculateLifeStage(),
            morale: __classPrivateFieldGet(this, _morale),
            poopCount: __classPrivateFieldGet(this, _poopCount),
            satiety: __classPrivateFieldGet(this, _satiety),
            vigor: __classPrivateFieldGet(this, _vigor),
        };
    }
    poo() {
        const foodTreshold = Math.floor(Math.random() * 4) + 1;
        if (__classPrivateFieldGet(this, _foodCounter) >= foodTreshold) {
            __classPrivateFieldSet(this, _poopCount, increment_1.default(__classPrivateFieldGet(this, _poopCount), __classPrivateFieldGet(this, _poopIncrement)));
            __classPrivateFieldSet(this, _foodCounter, 0);
        }
    }
    calculateLifeStage() {
        if (__classPrivateFieldGet(this, _age) > constants_1.TEENAGER_MAX_AGE) {
            return lifeStages_1.LifeStage.Adult;
        }
        else if (__classPrivateFieldGet(this, _age) > constants_1.CHILD_MAX_AGE) {
            return lifeStages_1.LifeStage.Teenager;
        }
        else if (__classPrivateFieldGet(this, _age) > constants_1.BABY_MAX_AGE) {
            return lifeStages_1.LifeStage.Child;
        }
        else {
            return lifeStages_1.LifeStage.Baby;
        }
    }
    damage() {
        let damageAmount = 0;
        if (__classPrivateFieldGet(this, _vigor) <= __classPrivateFieldGet(this, _sleepinessTreshold))
            damageAmount++;
        if (__classPrivateFieldGet(this, _satiety) === 0)
            damageAmount++;
        if (__classPrivateFieldGet(this, _morale) === 0)
            damageAmount++;
        if (__classPrivateFieldGet(this, _poopCount) > __classPrivateFieldGet(this, _poopTreshold))
            damageAmount++;
        __classPrivateFieldSet(this, _health, decrement_1.default(__classPrivateFieldGet(this, _health), damageAmount));
    }
    handleSleep() {
        if (__classPrivateFieldGet(this, _isSleeping)) {
            __classPrivateFieldSet(this, _vigor, increment_1.default(__classPrivateFieldGet(this, _vigor), Math.floor(Math.random() * __classPrivateFieldGet(this, _sleepinessTreshold)) + 1));
            if (__classPrivateFieldGet(this, _vigor) > __classPrivateFieldGet(this, _sleepinessTreshold)) {
                __classPrivateFieldSet(this, _vigor, __classPrivateFieldGet(this, _maxVigor));
                __classPrivateFieldSet(this, _isSleeping, false);
            }
        }
        else if (__classPrivateFieldGet(this, _vigor) <= __classPrivateFieldGet(this, _exhaustionTreshold)) {
            this.sleep();
        }
    }
    heal() {
        if (this.isClean() &&
            this.isHappy() &&
            this.isVigorous() &&
            this.isWellFed())
            __classPrivateFieldSet(this, _health, increment_1.default(__classPrivateFieldGet(this, _health), __classPrivateFieldGet(this, _healthIncrement), __classPrivateFieldGet(this, _maxHealth)));
    }
    isClean() {
        return __classPrivateFieldGet(this, _poopCount) <= __classPrivateFieldGet(this, _poopTreshold);
    }
    isHappy() {
        return (__classPrivateFieldGet(this, _morale) >
            (__classPrivateFieldGet(this, _maxMorale) * __classPrivateFieldGet(this, _healthGainTresholdPercentage)) / 100);
    }
    isVigorous() {
        return (__classPrivateFieldGet(this, _vigor) > (__classPrivateFieldGet(this, _maxVigor) * __classPrivateFieldGet(this, _healthGainTresholdPercentage)) / 100);
    }
    isWellFed() {
        return (__classPrivateFieldGet(this, _satiety) >
            (__classPrivateFieldGet(this, _maxSatiety) * __classPrivateFieldGet(this, _healthGainTresholdPercentage)) / 100);
    }
}
exports.default = Pet;
_age = new WeakMap(), _exhaustionTreshold = new WeakMap(), _foodCounter = new WeakMap(), _health = new WeakMap(), _healthGainTresholdPercentage = new WeakMap(), _healthIncrement = new WeakMap(), _isSleeping = new WeakMap(), _maxAge = new WeakMap(), _maxHealth = new WeakMap(), _maxSatiety = new WeakMap(), _maxMorale = new WeakMap(), _maxVigor = new WeakMap(), _morale = new WeakMap(), _moraleDecrement = new WeakMap(), _moraleIncrement = new WeakMap(), _poopCount = new WeakMap(), _poopDecrement = new WeakMap(), _poopIncrement = new WeakMap(), _poopTreshold = new WeakMap(), _satiety = new WeakMap(), _satietyDecrement = new WeakMap(), _satietyIncrement = new WeakMap(), _sleepinessTreshold = new WeakMap(), _vigor = new WeakMap(), _vigorDecrement = new WeakMap();
//# sourceMappingURL=pet.js.map