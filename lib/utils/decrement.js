"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decrement = (currentValue, decrementValue) => {
    const newValue = currentValue - decrementValue;
    return newValue < 0 ? 0 : newValue;
};
exports.default = decrement;
//# sourceMappingURL=decrement.js.map