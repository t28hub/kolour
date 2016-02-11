import assert from 'power-assert';
import Luv    from '../src/luv';

describe('Luv', () => {

  describe('.constructor(l, u, v)', () => {

    it('should create an instance', () => {
      let luv = new Luv(42.782, 102.260, -3.495);
      assert(luv !== null);
      assert(luv instanceof Luv);
      assert.deepEqual(luv.values(), [42.782, 102.260, -3.495]);
    });

  });

});
