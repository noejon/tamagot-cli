import increment from './increment';

describe('increment', () => {
  describe('when no maximum value is provided', () => {
    it('should return the result of the addition of the current value and the increment value', () => {
      expect(increment(42, 42)).toEqual(84);
    });
  });

  describe('when a maximum value is provided', () => {
    describe('when the result of the addition between the current value and the increment value is equal to the maximum value', () => {
      it('should return the maximum value', () => {
        expect(increment(1, 2, 3)).toEqual(3);
      });
    });

    describe('when the result of the addition between the current value and the increment value is less than the maximum value', () => {
      it('should return the result of the addition', () => {
        expect(increment(1, 1, 3)).toEqual(2);
      });
    });

    describe('when the result of the addition between the current value and the increment value is bigger than the maximum value', () => {
      it('should return the maximum value', () => {
        expect(increment(2, 2, 3)).toEqual(3);
      });
    });
  });
});
