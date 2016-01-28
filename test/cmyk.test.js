import assert from 'power-assert';
import sinon  from 'sinon';
import Cmy    from '../src/cmy';
import Cmyk   from '../src/cmyk';
import Hsl    from '../src/hsl';
import Hsv    from '../src/hsv';
import Rgb    from '../src/rgb';
import Xyz    from '../src/xyz';
import Yxy    from '../src/yxy';

describe('Cmyk', () => {

  describe('.constructor(c, m, y, k)', () => {

    it('should create an instance', () => {
      let cmyk = new Cmyk(0.2, 0.4, 0.6, 0.8);
      assert(cmyk !== null);
      assert.deepEqual(cmyk.values(), [0.2, 0.4, 0.6, 0.8]);
    });

  });

  describe('.prototype.clone()', () => {

    it('should clone an instance', () => {
      let source = new Cmyk(0.2, 0.4, 0.6, 0.8);
      let cloned = source.clone();
      assert(cloned !== null);
      assert(cloned !== source);
      assert(cloned instanceof Cmyk);
      assert.deepEqual(cloned.entries(), source.entries());
    });

  });

  describe('.prototype.isValid()', () => {

    [
      {args: [  0,   0,   0,   0], 'expected': true},
      {args: [0.2, 0.4, 0.6, 0.8], 'expected': true},
      {args: [  0,   0,   0,   1], 'expected': true},
      {args: [  1,   1,   1,   0], 'expected': true},
      {args: [NaN, 0.4, 0.6, 0.8], 'expected': false},
      {args: ['a', 0.4, 0.6, 0.8], 'expected': false},
      {args: [ -1, 0.4, 0.6, 0.8], 'expected': false},
      {args: [1.1, 0.4, 0.6, 0.8], 'expected': false},
    ].forEach((test) => {
      let args     = test.args;
      let expected = test.expected
      it(`should return ${expected} with [${args}]`, () => {
        let cmyk = new Cmyk(...args);
        assert(cmyk.isValid() === expected);
      });
    });

  });

  describe('.prototype.cmy()', () => {

    it('should convert color space from CMYK to CMY', () => {
      let cmyk = new Cmyk(0.8, 0.6, 0.4, 0.2);
      let cmy  = cmyk.cmy();
      assert(cmy !== null);
      assert(cmy instanceof Cmy);
      assert.deepEqual(cmy.values(), [0.8 * (1 - 0.2) + 0.2, 0.6 * (1 - 0.2) + 0.2, 0.4 * (1 - 0.2) + 0.2]);
    });

    it('should convert color space from CMYK to CMY when color k === 1', () => {
      let cmyk = new Cmyk(0, 0, 0, 1);
      let cmy  = cmyk.cmy();
      assert(cmy !== null);
      assert(cmy instanceof Cmy);
      assert.deepEqual(cmy.values(), [1, 1, 1]);
    });

  });

  describe('.prototype.cmy()', () => {

    it('should return self', () => {
      let cmyk = new Cmyk(0.8, 0.6, 0.4, 0.2);
      assert(cmyk.cmyk() === cmyk);
    });

  });

  describe('.prototype.hsl()', () => {

    it('should convert color space from CMYK to HSL', () => {
      let cmyk = new Cmyk(0.8, 0.6, 0.4, 0.2);
      let hsl  = cmyk.hsl();
      assert(hsl !== null);
      assert(hsl instanceof Hsl);
    });

    it('should delegate color space conversion process to Cmy', () => {
      let cmyk = new Cmyk(0.8, 0.6, 0.4, 0.2);
      let cmy  = cmyk.cmy();
      let spy  = sinon.spy(cmy, 'hsl');
      sinon.stub(cmyk, 'cmy').returns(cmy);
      let hsl = cmyk.hsl();
      assert(spy.callCount === 1);
    });

  });

  describe('.prototype.hsv()', () => {

    it('should convert color space from CMYK to HSV', () => {
      let cmyk = new Cmyk(0.8, 0.6, 0.4, 0.2);
      let hsv  = cmyk.hsv();
      assert(hsv !== null);
      assert(hsv instanceof Hsv);
    });

    it('should delegate color space conversion process to Cmy', () => {
      let cmyk = new Cmyk(0.8, 0.6, 0.4, 0.2);
      let cmy  = cmyk.cmy();
      let spy  = sinon.spy(cmy, 'hsv');
      sinon.stub(cmyk, 'cmy').returns(cmy);
      let hsv = cmyk.hsv();
      assert(spy.callCount === 1);
    });

  });

  describe('.prototype.rgb()', () => {

    it('should convert color space from CMYK to RGB', () => {
      let cmyk = new Cmyk(0.8, 0.6, 0.4, 0.2);
      let rgb  = cmyk.rgb();
      assert(rgb !== null);
      assert(rgb instanceof Rgb);
    });

    it('should delegate color space conversion process to Cmy', () => {
      let cmyk = new Cmyk(0.8, 0.6, 0.4, 0.2);
      let cmy  = cmyk.cmy();
      let spy  = sinon.spy(cmy, 'rgb');
      sinon.stub(cmyk, 'cmy').returns(cmy);
      let rgb = cmyk.rgb();
      assert(spy.callCount === 1);
    });

  });

  describe('.prototype.xyz()', () => {

    it('should convert color space from CMYK to XYZ', () => {
      let cmyk = new Cmyk(0.8, 0.6, 0.4, 0.2);
      let xyz  = cmyk.xyz();
      assert(xyz !== null);
      assert(xyz instanceof Xyz);
    });

    it('should delegate color space conversion process to Cmy', () => {
      let cmyk = new Cmyk(0.8, 0.6, 0.4, 0.2);
      let cmy  = cmyk.cmy();
      let spy  = sinon.spy(cmy, 'xyz');
      sinon.stub(cmyk, 'cmy').returns(cmy);
      let xyz = cmyk.xyz();
      assert(spy.callCount === 1);
    });

  });

  describe('.prototype.yxy()', () => {

    it('should convert color space from CMYK to Yxy', () => {
      let cmyk = new Cmyk(0.8, 0.6, 0.4, 0.2);
      let yxy  = cmyk.yxy();
      assert(yxy !== null);
      assert(yxy instanceof Yxy);
    });

    it('should delegate color space conversion process to Cmy', () => {
      let cmyk = new Cmyk(0.8, 0.6, 0.4, 0.2);
      let cmy  = cmyk.cmy();
      let spy  = sinon.spy(cmy, 'yxy');
      sinon.stub(cmyk, 'cmy').returns(cmy);
      let yxy = cmyk.yxy();
      assert(spy.callCount === 1);
    });

  });

  describe('.fromObject(object)', () => {

    it('should instantiate Cmyk from plain object', () => {
      let [c, m, y, k] = [0.8, 0.6, 0.4, 0.2];
      let cmyk = Cmyk.fromObject({c, m, y, k});
      assert(cmyk !== null);
      assert(cmyk instanceof Cmyk);
      assert.deepEqual(cmyk.values(), [c, m, y, k]);
    });

    it('should instanticate Cmyk from plain object that has upper case char key', () => {
      let [C, M, Y, K] = [0.8, 0.6, 0.4, 0.2];
      let cmyk = Cmyk.fromObject({C, M, Y, K});
      assert(cmyk !== null);
      assert(cmyk instanceof Cmyk);
      assert.deepEqual(cmyk.values(), [C, M, Y, K]);
    });

    it('should return null from plain object that does not have necessary key', () => {
      let [c, m, y] = [0.8, 0.6, 0.4];
      let cmyk = Cmyk.fromObject({c, m, y});
      assert(cmyk === null);
    });

    it('should return null from plain object that has invalid key', () => {
      let [c, m, y, k, x] = [0.8, 0.6, 0.4, 0.2, 0.0];
      let cmyk = Cmyk.fromObject({c, m, y, k, x});
      assert(cmyk === null);
    });

  });

});
