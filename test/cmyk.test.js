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

  describe('.prototype.clone()', () => {

    it('should clone an instance', () => {
      let source = new Cmyk(0.2, 0.4, 0.6, 0.8);
      let cloned = source.clone();
      assert(cloned !== null);
      assert(cloned !== source);
      assert(cloned instanceof Cmyk);
      assert.deepEqual(cloned.entries(), source.entries());
    });

  });

});
