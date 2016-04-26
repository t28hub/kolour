import assert from 'power-assert';
import Cmy from '../../src/color/cmy.es6';
import Cmyk from '../../src/color/cmyk.es6';
import Hsl from '../../src/color/hsl.es6';
import Hsv from '../../src/color/hsv.es6';
import Hwb from '../../src/color/hwb.es6';
import Rgb from '../../src/color/rgb.es6';

describe('Cmy', () => {
  describe('.constructor(c, m, y, a)', () => {
    it('should create an instance with cyan, magenta and yellow values', () => {
      // exercise
      const cmy = new Cmy(0.2, 0.4, 0.6);

      // verify
      assert(cmy instanceof Cmy);
      assert(cmy.isValid());
    });

    it('should create an instance with cyan, magenta, yellow and alpha values', () => {
      // exercise
      const cmy = new Cmy(0.2, 0.4, 0.6, 0.5);

      // verify
      assert(cmy instanceof Cmy);
      assert(cmy.isValid());
    });
  });

  describe('.prototype.isValid()', () => {
    it('should return true when an instance has valid values', () => {
      // setup
      const cmy = new Cmy(0.2, 0.4, 0.6);

      // exercise
      const isValid = cmy.isValid();

      // verify
      assert(isValid === true);
    });

    it('should return true when an instance has an alpha value and all values are valid', () => {
      // setup
      const cmy = new Cmy(0.2, 0.4, 0.6, 0.5);

      // exercise
      const isValid = cmy.isValid();

      // verify
      assert(isValid === true);
    });

    it('should return false when an instance has an invalid value', () => {
      // setup
      const cmy = new Cmy(0.2, 0.4, NaN);

      // exercise
      const isValid = cmy.isValid();

      // verify
      assert(isValid === false);
    });

    it('should return false when an instance has an invalid alpha value', () => {
      // setup
      const cmy = new Cmy(0.2, 0.4, 0.6, NaN);

      // exercise
      const isValid = cmy.isValid();

      // verify
      assert(isValid === false);
    });

    it('should return false when an instance has a value which is less than minimum value', () => {
      // setup
      const cmy = new Cmy(-0.2, 0.4, 0.6);

      // exercise
      const isValid = cmy.isValid();

      // verify
      assert(isValid === false);
    });

    it('should return false when an instance has a value which is greater than maximum value', () => {
      // setup
      const cmy = new Cmy(0.2, 0.4, 1.5);

      // exercise
      const isValid = cmy.isValid();

      // verify
      assert(isValid === false);
    });
  });
  
  describe('.prototype.cmy()', () => {
    it('should returns a cloned instance', () => {
      // setup
      const cmy = new Cmy(0.2, 0.4, 0.6);

      // exercise
      const color = cmy.cmy();

      // verify
      assert(color.int() === cmy.int())
    });
  });

  describe('.prototype.cmyk()', () => {
    it('should convert color space to CMYK', () => {
      // setup
      const cmy = new Cmy(0.2, 0.4, 0.6, 0.5);

      // exercise
      const cmyk = cmy.cmyk();

      // verify
      assert(cmyk instanceof Cmyk);
      assert(cmyk.isValid());
      assert(cmyk.int() === cmy.int())
    });

    it('should return a black color when all values are equal to 1', () => {
      // setup
      const cmy = new Cmy(1, 1, 1);

      // exercise
      const cmyk = cmy.cmyk();

      // verify
      assert(cmyk instanceof Cmyk);
      assert(cmyk.isValid());
      assert(cmyk.int() === cmy.int())
    });
  });

  describe('.prototype.hsl()', () => {
    it('should convert color space to HSL', () => {
      // setup
      const cmy = new Cmy(0.2, 0.4, 0.6, 0.5);

      // exercise
      const hsl = cmy.hsl();

      // verify
      assert(hsl instanceof Hsl);
      assert(hsl.isValid());
      assert(hsl.int() === cmy.int())
    });
  });

  describe('.prototype.hsv()', () => {
    it('should convert color space to HSV', () => {
      // setup
      const cmy = new Cmy(0.2, 0.4, 0.6, 0.5);

      // exercise
      const hsv = cmy.hsv();

      // verify
      assert(hsv instanceof Hsv);
      assert(hsv.isValid());
      assert(hsv.int() === cmy.int())
    });
  });

  describe('.prototype.hwb()', () => {
    it('should convert color space to HWB', () => {
      // setup
      const cmy = new Cmy(0.2, 0.4, 0.6, 0.5);

      // exercise
      const hwb = cmy.hwb();

      // verify
      assert(hwb instanceof Hwb);
      assert(hwb.isValid());
      assert(hwb.int() === cmy.int())
    });
  });

  describe('.prototype.rgb()', () => {
    it('should convert color space to RGB', () => {
      // setup
      const cmy = new Cmy(0.2, 0.4, 0.6, 0.5);

      // exercise
      const rgb = cmy.rgb();

      // verify
      assert(rgb instanceof Rgb);
      assert(rgb.isValid());
      assert(rgb.int() === cmy.int())
    });
  });
});
