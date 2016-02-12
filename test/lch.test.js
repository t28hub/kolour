import assert from 'power-assert';
import Lch    from '../src/lch';

describe('Lch', () => {

  describe('.constructor(l, c, h)', () => {

    it('should create an instance', () => {
      let lch = new Lch(42.78161911655091, 63.88270834678947, 6.461019435908064);
      assert(lch !== null);
      assert(lch instanceof Lch);
      assert.deepEqual(lch.values(), [42.78161911655091, 63.88270834678947, 6.461019435908064])
    });

  });

});
