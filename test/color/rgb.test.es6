import assert from 'power-assert';
import { NO_ALPHA } from '../../src/color/color.es6';
import Cmy from '../../src/color/cmy.es6';
import Cmyk from '../../src/color/cmyk.es6';
import Hsl from '../../src/color/hsl.es6';
import Hsv from '../../src/color/hsv.es6';
import Hwb from '../../src/color/hwb.es6';
import Rgb from '../../src/color/rgb.es6';

describe('Rgb', () => {
  describe('.constructor(r, g, b, a)', () => {
    it('should create an instance', () => {
      // exercise
      const rgb = new Rgb(0, 128, 255);

      // verify
      assert(rgb instanceof Rgb);
      assert(rgb.isValid());
    });

    it('should create an instance with an alpha value', () => {
      // exercise
      const rgb = new Rgb(0, 128, 255, 0.5);

      // verify
      assert(rgb instanceof Rgb);
      assert(rgb.isValid());
    });
  });

  describe('.prototype.red', () => {
    it('should return a function', () => {
      // setup
      const rgb = new Rgb(0, 128, 255);

      // exercise
      const red = rgb.red;

      // verify
      assert(red instanceof Function);
    });

    it('should return a value of red when return value is executed without value', () => {
      // setup
      const rgb = new Rgb(0, 128, 255);

      // exercise
      const red = rgb.red();

      // verify
      assert(red === 0);
    });

    it('should set a value as red when return value is executed with value', () => {
      // setup
      const rgb = new Rgb(0, 128, 255);

      // exercise
      rgb.red(64);

      // verify
      assert(rgb.red() === 64);
    });
  });

  describe('.prototype.isValid()', () => {
    it('should return true when an instance is valid', () => {
      // setup
      const rgb = new Rgb(0, 128, 255);

      // exercise
      const isValid = rgb.isValid();

      // verify
      assert(isValid === true);
    });

    it('should return true when an instance with alpha is valid', () => {
      // setup
      const rgb = new Rgb(0, 128, 255, 0.5);

      // exercise
      const isValid = rgb.isValid();

      // verify
      assert(isValid === true);
    });

    it('should return false when a value is not integer', () => {
      // setup
      const rgb = new Rgb(0, 128, 0.5);

      // exercise
      const isValid = rgb.isValid();

      // verify
      assert(isValid === false);
    });

    it('should return false when a value is lower than MIN', () => {
      // setup
      const rgb = new Rgb(0, 128, Rgb.MIN - 1);

      // exercise
      const isValid = rgb.isValid();

      // verify
      assert(isValid === false);
    });

    it('should return false when a value is greater than MAX', () => {
      // setup
      const rgb = new Rgb(0, 128, Rgb.MAX + 1);

      // exercise
      const isValid = rgb.isValid();

      // verify
      assert(isValid === false);
    });

    it('should return false when the alpha value is invalid', () => {
      // setup
      const rgb = new Rgb(0, 128, 255, 10);

      // exercise
      const isValid = rgb.isValid();

      // verify
      assert(isValid === false);
    });
  });

  describe('.prototype.int()', () => {
    it('should return a number representing a color', () => {
      // setup
      const rgb = new Rgb(32, 64, 96, 0.5);

      // exercise
      const int = rgb.int();

      // verify
      assert(int === 0x20406080);
    });
  });

  describe('.prototype.css()', () => {
    it('should return a string which is specified with rgb(r, g, b)', () => {
      // setup
      const rgb = new Rgb(0, 128, 255);

      // exercise
      const css = rgb.css();

      // verify
      assert(css === 'rgb(0, 128, 255)');
    });

    it('should return a string which is specified with rgba(r, g, b, a) when the alpha value is contained', () => {
      // setup
      const rgb = new Rgb(0, 128, 255, 0.5);

      // exercise
      const css = rgb.css();

      // verify
      assert(css === 'rgba(0, 128, 255, 0.5)');
    });
  });

  describe('.prototype.darken(factor)', () => {
    it('should return darken color', () => {
      // setup
      const rgb = new Rgb(0, 128, 255);

      // exercise
      const darken = rgb.darken(0.5);

      // verify
      assert(darken instanceof Rgb);
      assert(darken.isValid());
      assert(darken.equals(new Rgb(0, 64, 128, NO_ALPHA)));
    });

    it('should return black color when a factor is 0', () => {
      // setup
      const rgb = new Rgb(0, 128, 255);

      // exercise
      const darken = rgb.darken(0);

      // verify
      assert(darken instanceof Rgb);
      assert(darken.isValid());
      assert(darken.equals(new Rgb(Rgb.MIN, Rgb.MIN, Rgb.MIN, NO_ALPHA)));
    });

    it('should return valid color when a factor is greater than 1', () => {
      // setup
      const rgb = new Rgb(0, 128, 255);

      // exercise
      const darken = rgb.darken(1.5);

      // verify
      assert(darken instanceof Rgb);
      assert(darken.isValid());
      assert(darken.equals(new Rgb(0, 192, 255, NO_ALPHA)));
    });

    it('should return valid color when a factor is less than 0', () => {
      // setup
      const rgb = new Rgb(0, 128, 255);

      // exercise
      const darken = rgb.darken(-0.5);

      // verify
      assert(darken instanceof Rgb);
      assert(darken.isValid());
      assert(darken.equals(new Rgb(Rgb.MIN, Rgb.MIN, Rgb.MIN, NO_ALPHA)));
    });

    it('should throw TypeError when a factor is no finite number', () => {
      // setup
      const rgb = new Rgb(0, 128, 255);

      // verify
      assert.throws(() => {
        // exercise
        rgb.darken(Number.NEGATIVE_INFINITY);
      }, TypeError);
    });
  });

  describe('.prototype.lighten(factor)', () => {
    it('should return lighten color', () => {
      // setup
      const rgb = new Rgb(0, 128, 255);

      // exercise
      const lighten = rgb.lighten(0.8);

      // verify
      assert(lighten instanceof Rgb);
      assert(lighten.isValid());
      assert(lighten.equals(new Rgb(0, 160, 255, NO_ALPHA)));
    });

    it('should return valid color when a factor is greater than 1', () => {
      // setup
      const rgb = new Rgb(0, 128, 255);

      // exercise
      const lighten = rgb.lighten(1.5);

      // verify
      assert(lighten instanceof Rgb);
      assert(lighten.isValid());
      assert(lighten.equals(new Rgb(0, 85, 170, NO_ALPHA)));
    });

    it('should return valid color when a factor is less than 0', () => {
      // setup
      const rgb = new Rgb(0, 128, 255);

      // exercise
      const lighten = rgb.lighten(-0.5);

      // verify
      assert(lighten instanceof Rgb);
      assert(lighten.isValid());
      assert(lighten.equals(new Rgb(Rgb.MIN, Rgb.MIN, Rgb.MIN, NO_ALPHA)));
    });

    it('should throw TypeError when a factor is 0', () => {
      // setup
      const rgb = new Rgb(0, 128, 255);

      // verify
      assert.throws(() => {
        // exercise
        rgb.lighten(0);
      }, TypeError);
    });
  });

  describe('.prototype.cmy()', () => {
    it('should convert color space to CMY', () => {
      // setup
      const rgb = new Rgb(0, 128, 255);

      // exercise
      const cmy = rgb.cmy();

      // verify
      assert(cmy instanceof Cmy);
      assert(cmy.isValid());
      assert(cmy.rgb().equals(rgb));
    });
  });

  describe('.prototype.cmyk()', () => {
    it('should convert color space to CMYK', () => {
      // setup
      const rgb = new Rgb(0, 128, 255);

      // exercise
      const cmyk = rgb.cmyk();

      // verify
      assert(cmyk instanceof Cmyk);
      assert(cmyk.isValid());
      assert(cmyk.rgb().equals(rgb));
    });
  });

  describe('.prototype.hsl()', () => {
    it('should convert color space to HSL', () => {
      // setup
      const rgb = new Rgb(0, 128, 255, 0.5);

      // exercise
      const hsl = rgb.hsl();

      // verify
      assert(hsl instanceof Hsl);
      assert(hsl.isValid());
      assert(hsl.rgb().equals(rgb));
    });

    it('should convert color space to HSL when minimum component is green', () => {
      // setup
      const rgb = new Rgb(255, 0, 128, 0.5);

      // exercise
      const hsl = rgb.hsl();

      // verify
      assert(hsl instanceof Hsl);
      assert(hsl.isValid());
      assert(hsl.rgb().equals(rgb));
    });

    it('should convert color space to HSL when minimum component is blue', () => {
      // setup
      const rgb = new Rgb(128, 255, 0, 0.5);

      // exercise
      const hsl = rgb.hsl();

      // verify
      assert(hsl instanceof Hsl);
      assert(hsl.isValid());
      assert(hsl.rgb().equals(rgb));
    });

    it('should convert color space to HSL when the instance is grayscaled color', () => {
      // setup
      const rgb = new Rgb(128, 128, 128, 0.5);

      // exercise
      const hsl = rgb.hsl();

      // verify
      assert(hsl instanceof Hsl);
      assert(hsl.isValid());
      assert(hsl.equals(new Hsl(Hsl.MIN_H, Hsl.MIN_S, 128 / Rgb.MAX, rgb.a())));
    });
  });

  describe('.prototype.hsv()', () => {
    it('should convert color space to HSV', () => {
      // setup
      const rgb = new Rgb(92, 98, 168);

      // exercise
      const hsv = rgb.hsv();

      // verify
      assert(hsv instanceof Hsv);
      assert(hsv.isValid());
      assert(hsv.rgb().equals(rgb));
    });
  });

  describe('.prototype.hwb()', () => {
    it('should convert color space to HWB', () => {
      // setup
      const rgb = new Rgb(92, 98, 168);

      // exercise
      const hwb = rgb.hwb();

      // verify
      assert(hwb instanceof Hwb);
      assert(hwb.isValid());
      assert(hwb.rgb().equals(rgb));
    });
  });

  describe('.prototype.rgb()', () => {
    it('should create an instance which has same properties and values', () => {
      // setup
      const rgb = new Rgb(0, 128, 255);

      // exercise
      const converted = rgb.rgb();

      // verify
      assert(converted instanceof Rgb);
      assert(converted !== rgb);
      assert(converted.rgb().equals(rgb));
    });
  });
});
