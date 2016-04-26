import assert from 'power-assert';
import Cmy from '../../src/color/cmy.es6';
import Cmyk from '../../src/color/cmyk.es6';
import Hsl from '../../src/color/hsl.es6';
import Hsv from '../../src/color/hsv.es6';
import Hwb from '../../src/color/hwb.es6';
import Rgb from '../../src/color/rgb.es6';

describe('Hsl', () => {
  describe('.constructor(h, s, l, a)', () => {
    it('should create an instance with hue, saturation and lightness', () => {
      // exercise
      const hsl = new Hsl(120, 50, 20);
      
      // verify
      assert(hsl instanceof Hsl);
      assert(hsl.isValid() === true);
    });
    
    it('should create an instance with hue, saturation, lightness and alpha', () => {
      // exercise
      const hsl = new Hsl(120, 50, 20, 0.5);

      // verify
      assert(hsl instanceof Hsl);
      assert(hsl.isValid() === true);
    });
  });
  
  describe('.prototype.isValid()', () => {
    it('should return true when all values are valid', () => {
      // setup
      const hsl = new Hsl(120, 50, 20);
      
      // exercise
      const isValid = hsl.isValid();
      
      // verify
      assert(isValid === true);
    });
    
    [
      { arguments: [120, 50, NaN] },
      { arguments: [-120, 50, 20] },
      { arguments: [480, 50, 20] },
      { arguments: [120, -1, 20] },
      { arguments: [120, 101, 20] },
      { arguments: [120, 50, -1] },
      { arguments: [120, 50, 101] },
      { arguments: [120, 50, 100, NaN] },
    ].forEach((test) => {
      const [h, s, l, a] = test.arguments;

      it(`should return false when value is {h:${h}, s:${s}, l:${l}, a:${a}`, () => {
        // setup
        const hsl = new Hsl(h, s, l, a);

        // exercise
        const isValid = hsl.isValid();

        // verify
        assert(isValid === false);
      });
    });
  });
  
  describe('.prototype.hashCode()', () => {
    it('should return an integer representing the color', () => {
      // setup
      const hsl = new Hsl(180, 100, 50);
      
      // exercise
      const int = hsl.hashCode();
      
      // verify
      assert(int === 0xFF00FFFF);
    });
  });
  
  describe('.prototype.css()', () => {
    it('should return a css style color', () => {
      // setup
      const hsl = new Hsl(180, 100, 50);

      // exercise
      const css = hsl.css();

      // verify
      assert(css === 'hsl(180, 100%, 50%)');
    });
    
    it('should return a css style color when the alpha value is contained', () => {
      // setup
      const hsl = new Hsl(180, 100, 50, 0.5);

      // exercise
      const css = hsl.css();

      // verify
      assert(css === 'hsla(180, 100%, 50%, 0.5)');
    });
  });
  
  describe('.prototype.cmy()', () => {
    it('should convert color to CMY', () => {
      // setup
      const hsl = new Hsl(180, 100, 50);

      // exercise
      const cmy = hsl.cmy();

      // verify
      assert(cmy instanceof Cmy);
      assert(cmy.hashCode() === hsl.hashCode());
    });
  });
  
  describe('.prototype.cmyk()', () => {
    it('should convert color to CMYK', () => {
      // setup
      const hsl = new Hsl(180, 100, 50);

      // exercise
      const cmyk = hsl.cmyk();

      // verify
      assert(cmyk instanceof Cmyk);
      assert(cmyk.hashCode() === hsl.hashCode());
    });
  });
  
  describe('.prototype.hsl()', () => {
    it('should return HSL', () => {
      // setup
      const hsl = new Hsl(180, 100, 50);

      // exercise
      const converted = hsl.hsl();

      // verify
      assert(converted instanceof Hsl);
      assert(converted !== hsl);
      assert(converted.hashCode() === hsl.hashCode());
    });
  });

  describe('.prototype.hsv()', () => {
    it('should convert color to HSV', () => {
      // setup
      const hsl = new Hsl(180, 100, 50);

      // exercise
      const hsv = hsl.hsv();

      // verify
      assert(hsv instanceof Hsv);
      assert(hsv.hashCode() === hsl.hashCode());
    });
  });
  
  describe('.prototype.hwb()', () => {
    it('should convert color to HWB', () => {
      // setup
      const hsl = new Hsl(180, 100, 50);

      // exercise
      const hwb = hsl.hwb();

      // verify
      assert(hwb instanceof Hwb);
      assert(hwb !== hsl);
      assert(hwb.hashCode() === hsl.hashCode());
    });
  });

  describe('.prototype.rgb()', () => {
    [
      {
        argument: [0, 50, 50],
        expected: 0xFFBF4040,
      },
      {
        argument: [30, 50, 50],
        expected: 0xFFBF8040,
      },
      {
        argument: [120, 50, 50],
        expected: 0xFF40BF40,
      },
      {
        argument: [180, 50, 50],
        expected: 0xFF40BFBF,
      },
      {
        argument: [300, 50, 50],
        expected: 0xFFBF40BF,
      },
      {
        argument: [60, 0, 50],
        expected: 0xFF808080,
      },
      {
        argument: [90, 50, 0],
        expected: 0xFF000000,
      },
    ].forEach((test) => {
      const { argument, expected } = test;
      
      it(`should convert color to RGB when values are ${JSON.stringify(argument)}`, () => {
        // setup
        const hsl = new Hsl(...argument);

        // exercise
        const rgb = hsl.rgb();

        // verify
        assert(rgb instanceof Rgb);
        assert(rgb.hashCode() === expected);
      });
    });
  });
});