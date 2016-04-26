import assert from 'power-assert';
import Cmy from '../../src/color/cmy.es6';
import Cmyk from '../../src/color/cmyk.es6';
import Hsl from '../../src/color/hsl.es6';
import Hsv from '../../src/color/hsv.es6';
import Hwb from '../../src/color/hwb.es6';
import Rgb from '../../src/color/rgb.es6';

describe('Hsv', () => {
  describe('.constructor(h, s, v, a)', () => {
    it('should create an instance with hue, saturation and value', () => {
      // exercise
      const hsv = new Hsv(120, 1, 1);

      // verify
      assert(hsv instanceof Hsv);
      assert(hsv.isValid() === true);
    });

    it('should create an instance with hue, saturation, value and alpha', () => {
      // exercise
      const hsv = new Hsv(120, 1, 1, 0.5);

      // verify
      assert(hsv instanceof Hsv);
      assert(hsv.isValid() === true);
    });
  });

  describe('.prototype.isValid()', () => {
    it('should return true when all values are valid', () => {
      // setup
      const hsv = new Hsv(120, 1, 0, 0.5);

      // exercise
      const isValid = hsv.isValid();

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
      const [h, s, v, a] = test.argument;

      it(`should return false when value is {h:${h}, s:${s}, l:${v}, a:${a}`, () => {
        // setup
        const hsv = new Hsv(h, s, v, a);

        // exercise
        const isValid = hsv.isValid();

        // verify
        assert(isValid === false);
      });
    });
  });

  describe('.prototype.hashCode()', () => {
    it('should return an integer representing the color', () => {
      // setup
      const hsv = new Hsv(180, 1, 1);

      // exercise
      const int = hsv.hashCode();

      // verify
      assert(int === 0xFF00FFFF);
    });
  });

  describe('.prototype.cmy()', () => {
    it('should convert color to CMY', () => {
      // setup
      const hsv = new Hsv(180, 1, 1);

      // exercise
      const cmy = hsv.cmy();

      // verify
      assert(cmy instanceof Cmy);
      assert(cmy.hashCode() === hsv.hashCode());
    });
  });
  
  describe('.prototype.cmyk()', () => {
    it('should convert color to CMYK', () => {
      // setup
      const hsv = new Hsv(180, 1, 1);

      // exercise
      const cmyk = hsv.cmyk();

      // verify
      assert(cmyk instanceof Cmyk);
      assert(cmyk.hashCode() === hsv.hashCode());
    });
  });

  describe('.prototype.hsl()', () => {
    it('should convert color to HSL', () => {
      // setup
      const hsv = new Hsv(180, 1, 1);

      // exercise
      const hsl = hsv.hsl();

      // verify
      assert(hsl instanceof Hsl);
      assert(hsl.hashCode() === hsv.hashCode());
    });
  });

  describe('.prototype.hsv()', () => {
    it('should return HSV', () => {
      // setup
      const hsv = new Hsv(180, 1, 1);

      // exercise
      const converted = hsv.hsv();

      // verify
      assert(converted instanceof Hsv);
      assert(converted.hashCode() === hsv.hashCode());
    });
  });

  describe('.prototype.hwb()', () => {
    it('should convert color to HWB', () => {
      // setup
      const hsv = new Hsv(180, 1, 1);

      // exercise
      const hwb = hsv.hwb();

      // verify
      assert(hwb instanceof Hwb);
      assert(hwb.hashCode() === hsv.hashCode());
    });
  });

  describe('.prototype.rgb()', () => {
    [
      {
        argument: [0, 1, 1],
        expected: 0xFFFF0000,
      },
      {
        argument: [30, 1, 1],
        expected: 0xFFFF8000,
      },
      {
        argument: [60, 1, 1],
        expected: 0xFFFFFF00,
      },
      {
        argument: [90, 1, 1],
        expected: 0xFF80FF00,
      },
      {
        argument: [120, 1, 1],
        expected: 0xFF00FF00,
      },
      {
        argument: [150, 1, 1],
        expected: 0xFF00FF80,
      },
      {
        argument: [180, 1, 1],
        expected: 0xFF00FFFF,
      },
      {
        argument: [210, 1, 1],
        expected: 0xFF0080FF,
      },
      {
        argument: [240, 1, 1],
        expected: 0xFF0000FF,
      },
      {
        argument: [270, 1, 1],
        expected: 0xFF8000FF,
      },
      {
        argument: [300, 1, 1],
        expected: 0xFFFF00FF,
      },
      {
        argument: [330, 1, 1],
        expected: 0xFFFF0080,
      },
      {
        argument: [360, 1, 1],
        expected: 0xFFFF0000,
      },
    ].forEach((test) => {
      const { argument, expected } = test;

      it(`should convert color to RGB when values are ${JSON.stringify(argument)}`, () => {
        // setup
        const hsv = new Hsv(...argument);

        // exercise
        const rgb = hsv.rgb();

        // verify
        assert(rgb instanceof Rgb);
        assert(rgb.hashCode() === expected);
      });
    });
  });
});