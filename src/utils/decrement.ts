const decrement = (currentValue: number, decrementValue: number): number => {
  const newValue = currentValue - decrementValue;
  return newValue < 0 ? 0 : newValue;
};

export default decrement;
