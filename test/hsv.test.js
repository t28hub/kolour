import assert from 'power-assert';
import sinon  from 'sinon';
import Hsv    from '../src/hsv';

describe('Hsv', () => {

  describe('.constructor(h, s, v)', () => {

    it('should create an instance', () => {
      let hsv = new Hsv(60, 0.1, 0.1);
      assert(hsv !== null);
      assert.deepEqual(hsv.values(), [60, 0.1, 0.1]);
    });

  });

});
