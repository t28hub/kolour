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

});
