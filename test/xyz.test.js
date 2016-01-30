import assert from 'power-assert';
import sinon  from 'sinon';
import Xyz    from '../src/xyz';

describe('Xyz', () => {

  describe('.constructor(x, y, z)', () => {

    it('should create an instace', () => {
      let xyz = new Xyz(41.838, 21.499, 5.077);
      assert(xyz !== null);
      assert(xyz instanceof Xyz);
    });

  });

  describe('.prototype.clone()', () => {

    it('should clone an instace', () => {
      let source = new Xyz(41.838, 21.499, 5.077);
      let cloned = source.clone();
      assert(cloned !== null);
      assert(cloned !== source);
      assert(cloned instanceof Xyz);
      assert.deepEqual(cloned.entries(), source.entries());
    });

  });

});
