import assert from 'power-assert';
import sinon  from 'sinon';
import Cmy    from '../src/cmy';
import Xyz    from '../src/xyz';
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

  describe('.prototype.isValid()', () => {

    it('should always return false', () => {
      let yxy = new Yxy(21.499, 0.61154, 0.31425);
      assert(yxy.isValid() === false);
    });

  });

  describe('.prototype.cmy()', () => {

    it('should convert color space from Xyx to CMY', () => {
      let yxy = new Yxy(21.499, 0.61154, 0.31425);
      let cmy = yxy.cmy();
      assert(cmy !== null);
      assert(cmy instanceof Cmy);
    });

    it('should delegate a color space conversion process to Xyz', () => {
      let yxy = new Yxy(21.499, 0.61154, 0.31425);
      let xyz = yxy.xyz();
      let spy = sinon.spy(xyz, 'cmy');
      sinon.stub(yxy, 'xyz').returns(xyz);
      let cmy = yxy.cmy();
      assert(spy.callCount === 1);
    });

  });

});
