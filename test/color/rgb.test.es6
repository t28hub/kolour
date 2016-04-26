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
  
  describe('.prototype.r()', () => {
    it('should return the red value without new value', () => {
      // setup
      const rgb = new Rgb(32, 64, 128);
      
      // exercise
      const red = rgb.r();
      
      assert(red === 32);
    });
    
    it('should set new red value with a value', () => {
      // setup
      const rgb = new Rgb(32, 64, 128);

      // exercise
      const self = rgb.r(96);

      assert(self === rgb);
      assert(rgb.r() === 96);
    });
  });

  describe('.prototype.g()', () => {
    it('should return the green value without new value', () => {
      // setup
      const rgb = new Rgb(32, 64, 128);

      // exercise
      const green = rgb.g();

      assert(green === 64);
    });

    it('should set new green value with a value', () => {
      // setup
      const rgb = new Rgb(32, 64, 128);

      // exercise
      const self = rgb.g(96);

      assert(self === rgb);
      assert(rgb.g() === 96);
    });
  });

  describe('.prototype.b()', () => {
    it('should return the blue value without new value', () => {
      // setup
      const rgb = new Rgb(32, 64, 128);

      // exercise
      const blue = rgb.b();

      assert(blue === 128);
    });

    it('should set new blue value with a value', () => {
      // setup
      const rgb = new Rgb(32, 64, 128);

      // exercise
      const self = rgb.b(96);

      assert(self === rgb);
      assert(rgb.b() === 96);
    });
  });

  describe('.prototype.a()', () => {
    it('should return the alpha value without new value', () => {
      // setup
      const rgb = new Rgb(32, 64, 128, 0.5);

      // exercise
      const alpha = rgb.a();

      assert(alpha === 0.5);
    });

    it('should set new alpha value with a value', () => {
      // setup
      const rgb = new Rgb(32, 64, 128, 0.5);

      // exercise
      const self = rgb.a(0.8);

      assert(self === rgb);
      assert(rgb.a() === 0.8);
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

  describe('.prototype.cmy()', () => {
    it('should convert color space to CMY', () => {
      // setup
      const rgb = new Rgb(0, 128, 255);

      // exercise
      const cmy = rgb.cmy();

      // verify
      assert(cmy instanceof Cmy);
      assert(cmy.isValid());
      assert(cmy.int() === rgb.int());
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
      assert(cmyk.int() === rgb.int());
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
      assert(hsl.int() === rgb.int());
    });

    it('should convert color space to HSL when max value is red', () => {
      // setup
      const rgb = new Rgb(255, 0, 128, 0.5);

      // exercise
      const hsl = rgb.hsl();

      // verify
      assert(hsl instanceof Hsl);
      assert(hsl.isValid());
      assert(hsl.int() === rgb.int());
    });

    it('should convert color space to HSL when max value is green', () => {
      // setup
      const rgb = new Rgb(128, 255, 0, 0.5);

      // exercise
      const hsl = rgb.hsl();

      // verify
      assert(hsl instanceof Hsl);
      assert(hsl.isValid());
      assert(hsl.int() === rgb.int());
    });

    it('should convert color space to HSL when max value is blue', () => {
      // setup
      const rgb = new Rgb(0, 128, 255, 0.5);

      // exercise
      const hsl = rgb.hsl();

      // verify
      assert(hsl instanceof Hsl);
      assert(hsl.isValid());
      assert(hsl.int() === rgb.int());
    });

    it('should convert color space to HSL when the instance is grayscaled color', () => {
      // setup
      const rgb = new Rgb(128, 128, 128, 0.5);

      // exercise
      const hsl = rgb.hsl();

      // verify
      assert(hsl instanceof Hsl);
      assert(hsl.isValid());
      assert(hsl.int() === new Hsl(0, 0, 50, rgb.a()).int());
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
      assert(hsv.int() === rgb.int());
    });

    it('should return a HSV color when a color is black', () => {
      // setup
      const rgb = new Rgb(0, 0, 0);

      // exercise
      const hsv = rgb.hsv();

      // verify
      assert(hsv instanceof Hsv);
      assert(hsv.isValid());
      assert(hsv.h() === 0);
      assert(hsv.s() === 0);
      assert(hsv.v() === 0);
      assert(hsv.a() === NO_ALPHA);
    });
    
    it('should return a HSV color when red value is max', () => {
      // setup
      const rgb = new Rgb(128, 64, 32);

      // exercise
      const hsv = rgb.hsv();

      // verify
      assert(hsv instanceof Hsv);
      assert(hsv.isValid());
      assert(hsv.int() === rgb.int());
    });

    it('should return a HSV color when green value is max', () => {
      // setup
      const rgb = new Rgb(32, 128, 64);

      // exercise
      const hsv = rgb.hsv();

      // verify
      assert(hsv instanceof Hsv);
      assert(hsv.isValid());
      assert(hsv.int() === rgb.int());
    });
    
    it('should return a HSV color when blue value is max', () => {
      // setup
      const rgb = new Rgb(64, 32, 128);

      // exercise
      const hsv = rgb.hsv();

      // verify
      assert(hsv instanceof Hsv);
      assert(hsv.isValid());
      assert(hsv.int() === rgb.int());
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
      assert(hwb.int() === rgb.int());
    });
  });

  describe('.prototype.rgb()', () => {
    it('should create an instance which has same properties and values', () => {
      // setup
      const rgb = new Rgb(0, 128, 255);

      // exercise
      const converted = rgb.rgb();

      // verify
      assert(converted !== rgb);
      assert(converted instanceof Rgb);
      assert(converted.isValid());
      assert(converted.int() === rgb.int());
    });
  });
});
