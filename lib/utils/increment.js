"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const increment = (currentValue, incrementValue, maxValue) => {
    const newValue = currentValue + incrementValue;
    return (maxValue && newValue > maxValue ? maxValue : newValue) || newValue;
};
exports.default = increment;
//# sourceMappingURL=increment.js.map