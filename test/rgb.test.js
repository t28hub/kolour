import assert from 'power-assert';
import Cmy    from '../src/cmy';
import Cmyk   from '../src/cmyk';
import Hsl    from '../src/hsl';
import Hsv    from '../src/hsv';
import Rgb    from '../src/rgb';
import Xyz    from '../src/xyz';

describe('Rgb', () => {

  describe('.constructor(r, g, b)', () => {

    it('should create an instance', () => {
      let rgb = new Rgb(32, 64, 128);
      assert(rgb !== null);
    });

  });

  describe('.prorotype.isValid()', () => {

    it('should return true when all values are invalid', () => {
      let rgb = new Rgb(32, 64, 128);
      assert(rgb.isValid());
    });

    it('should return true when a value is equal to minimum value', () => {
      let rgb = new Rgb(0, 64, 128);
      assert(rgb.isValid());
    });

    it('should return true when a value is equal to maximum value', () => {
      let rgb = new Rgb(32, 64, 255);
      assert(rgb.isValid());
    });

    it('should return false when a value is float number', () => {
      let rgb = new Rgb(32, 64, 128.0001);
      assert(rgb.isValid() === false);
    });

    it('should return false when a value is not number', () => {
      let rgb = new Rgb('32', '64', '128');
      assert(rgb.isValid() === false);
    });

    it('should return false when a value is less than minimum value', () => {
      let rgb = new Rgb(-1, 64, 128);
      assert(rgb.isValid() === false);
    });

    it('should return false when a value is greater than maximum value', () => {
      let rgb = new Rgb(32, 64, 256);
      assert(rgb.isValid() === false);
    });

  });

  describe('.prorotype.clone()', () => {

    it('should create new instance', () => {
      let rgb = new Rgb(32, 64, 128);
      let cloned = rgb.clone();
      assert(cloned !== null);
      assert(cloned !== rgb);
      assert(`[r=${cloned.r()}, g=${cloned.g()}, b=${cloned.b()}]` === `[r=${rgb.r()}, g=${rgb.g()}, b=${rgb.b()}]`)
    });

  });

  describe('.prorotype.cmy()', () => {

    it('should convert color space from RGB to CMY', () => {
      let rgb = new Rgb(32, 64, 128);
      let cmy = rgb.cmy();
      assert(cmy !== null);
      assert(cmy instanceof Cmy);
    });

  });

  describe('.prorotype.cmyk()', () => {

    it('should convert color space from RGB to CMYK', () => {
      let rgb  = new Rgb(32, 64, 128);
      let cmyk = rgb.cmyk();
      assert(cmyk !== null);
      assert(cmyk instanceof Cmyk);
    });

  });

  describe('.prorotype.hsl()', () => {

    it('should convert color space from RGB to HSL', () => {
      let rgb = new Rgb(32, 64, 128);
      let hsl = rgb.hsl();
      assert(hsl !== null);
      assert(hsl instanceof Hsl);
    });

  });

  describe('.prorotype.hsv()', () => {

    it('should convert color space from RGB to HSV', () => {
      let rgb = new Rgb(32, 64, 128);
      let hsv = rgb.hsv();
      assert(hsv !== null);
      assert(hsv instanceof Hsv);
    });

  });

  describe('.prorotype.rgb()', () => {

    it('should return self', () => {
      let rgb1 = new Rgb(32, 64, 128);
      let rgb2 = rgb1.rgb();
      assert(rgb1 === rgb2);
    });

  });

  describe('.prorotype.xyz()', () => {

    it('should convert color space from RGB to XYZ', () => {
      let rgb = new Rgb(32, 64, 128);
      let xyz = rgb.xyz();
      assert(xyz !== null);
      assert(xyz instanceof Xyz);
    });

  });

});
