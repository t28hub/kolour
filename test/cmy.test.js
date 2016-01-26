import assert from 'power-assert';
import Cmy    from '../src/cmy';

describe('Cmy', () => {

  describe('.constructor(c, m, y)', () => {

    it('should create an instance', () => {
      let cmy = new Cmy(0.5, 0.25, 0.125);
      assert(cmy !== null);
      assert(`[c=${cmy.c()}, m=${cmy.m()}, y=${cmy.y()}]` === '[c=0.5, m=0.25, y=0.125]');
    });

  });

  describe('.prototype.clone()', () => {

    it('should clone an instance', () => {
      let source = new Cmy(0.5, 0.25, 0.125);
      let cloned = source.clone();
      assert(cloned !== null);
      assert(cloned !== source);
      assert(cloned instanceof Cmy);
      assert.deepEqual(cloned.entries(), source.entries());
    });

  });

});
