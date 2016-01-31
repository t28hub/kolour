import assert from 'power-assert';
import sinon  from 'sinon';
import Yxy    from '../src/yxy';

describe('Yxy', () => {

  describe('.constructor(Y, x, y)', () => {

    it('should create an instance', () => {
      let yxy = new Yxy(21.499, 0.61154, 0.31425);
      assert(yxy !== null);
      assert(yxy instanceof Yxy);
    });

  });

  describe('.prototype.clone()', () => {

    it('should create an instance', () => {
      let source = new Yxy(21.499, 0.61154, 0.31425);
      let cloned = source.clone();
      assert(cloned !== null);
      assert(cloned !== source);
      assert(cloned instanceof Yxy);
      assert.deepEqual(cloned.entries(), source.entries());
    });

  });

});
