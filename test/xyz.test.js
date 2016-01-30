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

});
