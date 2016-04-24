import assert from 'power-assert';
import * as math from '../../src/utils/math.es6';

describe('Math', () => {
  describe('.clamp(value, min, max)', () => {
    it('should return a specified value when the value is range within min and max', () => {
      // exercise
      const value = math.clamp(50, 0, 100);

      // verify
      assert(value === 50);
    });
    
    it('should return min value when the value is less than min', () => {
      // exercise
      const value = math.clamp(-50, 0, 100);

      // verify
      assert(value === 0);
    });
    
    it('should return max value when the value is greater than max', () => {
      // exercise
      const value = math.clamp(150, 0, 100);

      // verify
      assert(value === 100);
    });
  });
});