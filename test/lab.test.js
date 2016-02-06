import assert from 'power-assert';
import sinon  from 'sinon';
import Cmy    from '../src/cmy';
import Cmyk   from '../src/cmyk';
import Hsl    from '../src/hsl';
import Hsv    from '../src/hsv';
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

  describe('.prototype.clone()', () => {

    it('should create a new instance', () => {
      let source = new Lab(42.782, 63.477, 7.189);
      let cloned = source.clone();
      assert(source !== null);
      assert(source !== cloned);
      assert(source instanceof Lab);
      assert.deepEqual(source.values(), cloned.values());
    });

  });

  describe('.prototype.cmy()', () => {

    it('should convert color space from L*a*b to CMY', () => {
      let lab = new Lab(42.782, 63.477, 7.189);
      let cmy = lab.cmy();
      assert(cmy !== null);
      assert(cmy instanceof Cmy);
    });

  });

  describe('.prototype.cmyk()', () => {

    it('should convert color space from L*a*b to CMYK', () => {
      let lab = new Lab(42.782, 63.477, 7.189);
      let cmyk = lab.cmyk();
      assert(cmyk !== null);
      assert(cmyk instanceof Cmyk);
    });

  });

  describe('.prototype.hsl()', () => {

    it('should convert color space from L*a*b to HSL', () => {
      let lab = new Lab(42.782, 63.477, 7.189);
      let hsl = lab.hsl();
      assert(hsl !== null);
      assert(hsl instanceof Hsl);
    });

  });

  describe('.prototype.hsv()', () => {

    it('should convert color space from L*a*b to HSV', () => {
      let lab = new Lab(42.782, 63.477, 7.189);
      let hsv = lab.hsv();
      assert(hsv !== null);
      assert(hsv instanceof Hsv);
    });

  });

  describe('.prototype.lab()', () => {

    it('should return self', () => {
      let lab = new Lab(42.782, 63.477, 7.189);
      assert(lab.lab() === lab);
    });

  });

});
