import assert from 'power-assert';
import Cmyk   from '../src/cmyk';

describe('Cmyk', () => {

  describe('.constructor(c, m, y, k)', () => {

    it('should create an instance', () => {
      let cmyk = new Cmyk(0.2, 0.4, 0.6, 0.8);
      assert(cmyk !== null);
      assert.deepEqual(cmyk.values(), [0.2, 0.4, 0.6, 0.8]);
    });

  });

});
