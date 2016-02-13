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

  describe('.prototype.clone()', () => {

    it('should create a new instance', () => {
      let source = new Luv(42.782, 102.260, -3.495);
      let cloned = source.clone();
      assert(cloned !== null);
      assert(cloned !== source);
      assert(cloned instanceof Luv);
      assert.deepEqual(cloned.values(), source.values());
    });

  });

  describe('.prototype.luv()', () => {

    it('should return self', () => {
      let luv = new Luv(42.782, 102.260, -3.495);
      assert(luv.luv() === luv);
    });

  });

});
