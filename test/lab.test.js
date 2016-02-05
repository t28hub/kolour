import assert from 'power-assert';
import sinon  from 'sinon';
import Lab    from '../src/lab';

describe('Lab', () => {

  describe('.constructor(l, a, b)', () => {

    it('should create an instance', () => {
      let lab = new Lab(42.782, 63.477, 7.189);
      assert(lab !== null);
      assert(lab instanceof Lab);
      assert.deepEqual(lab.values(), [42.782, 63.477, 7.189]);
    });

  });

});
