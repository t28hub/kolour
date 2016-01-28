import assert from 'power-assert';
import Hsl    from '../src/hsl';

describe('Hsl', () => {

  describe('.constructor(h, s, l)', () => {

    it('should create an instance', () => {
      let hsl = new Hsl(60, 0.1, 0.1);
      assert(hsl !== null);
      assert.deepEqual(hsl.values(), [60, 0.1, 0.1]);
    });

  });

});
