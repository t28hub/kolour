import assert from 'power-assert';
import Cmy from '../../src/color/cmy.es6';
import Cmyk from '../../src/color/cmyk.es6';
import Hsl from '../../src/color/hsl.es6';
import Hsv from '../../src/color/hsv.es6';
import Hwb from '../../src/color/hwb.es6';
import Rgb from '../../src/color/rgb.es6';

describe('Hwb', () => {
  describe('.constructor(h, w, b, a)', () => {
    it('should create an instance with hue, whiteness and blackness', () => {
      // exercise
      const hwb = new Hwb(180, 1, 1);

      // verify
      assert(hwb instanceof Hwb);
      assert(hwb.isValid() === true);
    });

    it('should create an instance with hue, whiteness blackness and alpha', () => {
      // exercise
      const hwb = new Hwb(180, 1, 1, 0.5);

      // verify
      assert(hwb instanceof Hwb);
      assert(hwb.isValid() === true);
    });
  });

  describe('.prototype.isValid()', () => {
    it('should return true when all values are valid', () => {
      // setup
      const hwb = new Hwb(180, 1, 1, 0.5);

      // exercise
      const isValid = hwb.isValid();

      // verify
      assert(isValid === true);
    });

    [
      { argument: [120, 0, NaN] },
      { argument: [-120, 0, 0] },
      { argument: [480, 0, 0] },
      { argument: [120, -1, 0] },
      { argument: [120, 1.1, 0] },
      { argument: [120, 0, -1] },
      { argument: [120, 0, 1.1] },
      { argument: [120, 0, 1, NaN] },
    ].forEach((test) => {
      const [h, w, b, a] = test.argument;

      it(`should return false when value is {h:${h}, w:${w}, b:${b}, a:${a}`, () => {
        // setup
        const hwb = new Hwb(h, w, b, a);

        // exercise
        const isValid = hwb.isValid();

        // verify
        assert(isValid === false);
      });
    });
  });

  describe('.prototype.darken(factor)', () => {
    it('should return a darken color', () => {
      // setup
      const hwb = new Hwb(30, 0, 0);

      // exercise
      const darken = hwb.darken(0.1);

      // verify
      assert(darken instanceof Hwb);
      assert(darken.int() === new Hwb(30, 0, 0.2).int())
    });
  });

  describe('.prototype.lighten(factor)', () => {
    it('should return a lighten color', () => {
      // setup
      const hwb = new Hwb(30, 0, 0);

      // exercise
      const lighten = hwb.lighten(0.1);

      // verify
      assert(lighten instanceof Hwb);
      assert(lighten.int() === new Hwb(30, 0.2, 0).int())
    });
  });

  describe('.prototype.int()', () => {
    it('should return an integer representing the color', () => {
      // setup
      const hwb = new Hwb(180, 0, 0);

      // exercise
      const int = hwb.int();

      // verify
      assert(int === 0x00FFFFFF);
    });
  });

  describe('.prototype.css()', () => {
    it('should return a css style color', () => {
      // setup
      const hwb = new Hwb(180, 0.5, 0);
      
      // exercise
      const css = hwb.css();
      
      // verify
      assert(css === 'hwb(180, 50%, 0%)');
    });
    
    it('should return a css style color when the alpha value is contained', () => {
      // setup
      const hwb = new Hwb(180, 0.5, 0, 0.25);

      // exercise
      const css = hwb.css();

      // verify
      assert(css === 'hwb(180, 50%, 0%, 0.25)');
    });
  });
  
  describe('.prototype.cmy()', () => {
    it('should convert color to CMY', () => {
      // setup
      const hwb = new Hwb(180, 1, 1);

      // exercise
      const cmy = hwb.cmy();

      // verify
      assert(cmy instanceof Cmy);
      assert(cmy.int() === hwb.int());
    });
  });

  describe('.prototype.cmyk()', () => {
    it('should convert color to CMYK', () => {
      // setup
      const hwb = new Hwb(180, 1, 1);

      // exercise
      const cmyk = hwb.cmyk();

      // verify
      assert(cmyk instanceof Cmyk);
      assert(cmyk.int() === hwb.int());
    });
  });

  describe('.prototype.hsl()', () => {
    it('should convert color to HSL', () => {
      // setup
      const hwb = new Hwb(180, 1, 1);

      // exercise
      const hsl = hwb.hsl();

      // verify
      assert(hsl instanceof Hsl);
      assert(hsl.int() === hwb.int());
    });
  });

  describe('.prototype.hsv()', () => {
    it('should convert color to HSV', () => {
      // setup
      const hwb = new Hwb(180, 1, 1);

      // exercise
      const hsv = hwb.hsv();

      // verify
      assert(hsv instanceof Hsv);
      assert(hsv.int() === hwb.int());
    });
  });

  describe('.prototype.hwb()', () => {
    it('should return new HWB color', () => {
      // setup
      const hwb = new Hwb(180, 1, 1);

      // exercise
      const converted = hwb.hwb();

      // verify
      assert(converted instanceof Hwb);
      assert(converted !== hwb);
      assert(converted.int() === hwb.int());
    });
  });

  describe('.prototype.rgb()', () => {
    it('should convert color to RGB', () => {
      // setup
      const hwb = new Hwb(180, 1, 1);

      // exercise
      const rgb = hwb.rgb();

      // verify
      assert(rgb instanceof Rgb);
      assert(rgb.int() === rgb.int());
    });
  });
});