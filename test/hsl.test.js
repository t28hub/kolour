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

  describe('.prototype.clone()', () => {

    it('should create an instance', () => {
      let source = new Hsl(60, 0.1, 0.1);
      let cloned = source.clone();
      assert(cloned !== null);
      assert(cloned !== source);
      assert(cloned instanceof Hsl);
      assert.deepEqual(cloned.entries(), source.entries());
    });

  });

});
