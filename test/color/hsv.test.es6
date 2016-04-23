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

  describe('.prototype.int()', () => {
    it('should return an integer representing the color', () => {
      // setup
      const hsv = new Hsv(180, 1, 1);

      // exercise
      const int = hsv.int();

      // verify
      assert(int === 0x00FFFFFF);
    });
  });

  describe('.prototype.darken(factor)', () => {
    it('should return a darken color', () => {
      // setup
      const hsv = new Hsv(60, 0.8, 1);

      // exercise
      const darken = hsv.darken(0.2);

      // verify
      assert(darken instanceof Hsv);
      assert(darken.int() === new Hsv(60, 1, 0.8).int())
    });
  });

  describe('.prototype.lighten(factor)', () => {
    it('should return a lighten color', () => {
      // setup
      const hsv = new Hsv(60, 0.8, 1);

      // exercise
      const lighten = hsv.lighten(0.2);

      // verify
      assert(lighten instanceof Hsv);
      assert(lighten.int() === new Hsv(60, 0.4, 1).int())
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
      assert(cmy.int() === hsv.int());
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
      assert(cmyk.int() === hsv.int());
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
      assert(hsl.int() === hsv.int());
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
      assert(converted.int() === hsv.int());
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
      assert(hwb.int() === hsv.int());
    });
  });

  describe('.prototype.rgb()', () => {
    [
      {
        argument: [0, 1, 1],
        expected: 0xFF0000FF,
      },
      {
        argument: [30, 1, 1],
        expected: 0xFF8000FF,
      },
      {
        argument: [60, 1, 1],
        expected: 0xFFFF00FF,
      },
      {
        argument: [90, 1, 1],
        expected: 0x80FF00FF,
      },
      {
        argument: [120, 1, 1],
        expected: 0x00FF00FF,
      },
      {
        argument: [150, 1, 1],
        expected: 0x00FF80FF,
      },
      {
        argument: [180, 1, 1],
        expected: 0x00FFFFFF,
      },
      {
        argument: [210, 1, 1],
        expected: 0x0080FFFF,
      },
      {
        argument: [240, 1, 1],
        expected: 0x0000FFFF,
      },
      {
        argument: [270, 1, 1],
        expected: 0x8000FFFF,
      },
      {
        argument: [300, 1, 1],
        expected: 0xFF00FFFF,
      },
      {
        argument: [330, 1, 1],
        expected: 0xFF0080FF,
      },
      {
        argument: [360, 1, 1],
        expected: 0xFF0000FF,
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
        assert(rgb.int() === expected);
      });
    });
  });
});