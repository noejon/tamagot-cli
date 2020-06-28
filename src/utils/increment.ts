const increment = (
  currentValue: number,
  incrementValue: number,
  maxValue?: number
): number => {
  const newValue = currentValue + incrementValue;
  return (maxValue && newValue > maxValue ? maxValue : newValue) || newValue;
};

export default increment;
