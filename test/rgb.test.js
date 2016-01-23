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
