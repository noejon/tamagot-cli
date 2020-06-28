import decrement from './decrement';

describe('decrement', () => {
  describe('when the current value is bigger than the decrement value', () => {
    it('should return the result of the subtraction between the current value and the decrement value', () => {
      expect(decrement(2, 1)).toEqual(1);
    });
  });

  describe('when the current value is smaller than the decrement value', () => {
    it('should return 0', () => {
      expect(decrement(1, 2)).toEqual(0);
    });
  });

  describe('when the current value is equal to the decrement value', () => {
    it('should return 0', () => {
      expect(decrement(1, 1)).toEqual(0);
    });
  });
});
