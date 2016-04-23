import assert from 'power-assert';
import Cmy from '../../src/color/cmy.es6';
import Cmyk from '../../src/color/cmyk.es6';
import Hsl from '../../src/color/hsl.es6';
import Hsv from '../../src/color/hsv.es6';
import Hwb from '../../src/color/hwb.es6';
import Rgb from '../../src/color/rgb.es6';

describe('Cmyk', () => {
  describe('.constructor(c, m, y, k, a)', () => {
    it('should create an instance with cyan, magenta, yellow and black values', () => {
      // exercise
      const cmyk = new Cmyk(0.2, 0.4, 0.6, 0.8);
      
      // verify
      assert(cmyk instanceof Cmyk);
      assert(cmyk.isValid());
    });
    
    it('should create an instance with cyan, magenta, yellow, alpha and black values', () => {
      // exercise
      const cmyk = new Cmyk(0.2, 0.4, 0.6, 0.8, 0.5);

      // verify
      assert(cmyk instanceof Cmyk);
      assert(cmyk.isValid());
    });
  });
  
  describe('.prototype.isValid()', () => {
    it('should return true when all values range in value from 0 to 1', () => {
      // setup
      const cmyk = new Cmyk(0.2, 0.4, 0.6, 0.8, 1);
      
      // exercise
      const isValid = cmyk.isValid();

      // verify
      assert(isValid === true);
    });
    
    it('should return false when a value is not finite number', () => {
      // setup
      const cmyk = new Cmyk(0.2, 0.4, 0.6, NaN);
      
      // exercise
      const isValid = cmyk.isValid();
      
      // verify
      assert(isValid === false);
    });
    
    it('should return false when a value is negative number', () => {
      // setup
      const cmyk = new Cmyk(0.2, 0.4, 0.6, -0.8);

      // exercise
      const isValid = cmyk.isValid();

      // verify
      assert(isValid === false);
    });
    
    it('should return false when a value is greater than 1', () => {
      // setup
      const cmyk = new Cmyk(0.2, 0.4, 0.6, 1.1);

      // exercise
      const isValid = cmyk.isValid();

      // verify
      assert(isValid === false);
    });
    
    it('should return false when the alpha value is invalid', () => {
      // setup
      const cmyk = new Cmyk(0.2, 0.4, 0.6, 0.8, NaN);

      // exercise
      const isValid = cmyk.isValid();

      // verify
      assert(isValid === false);
    });
  });

  describe('.prototype.darken(factor)', () => {
    it('should return a darken color', () => {
      // setup
      const cmyk = new Cmyk(1, 0.25, 0, 0);

      // exercise
      const darken = cmyk.darken(0.1);

      // verify
      assert(darken instanceof Cmyk);
      assert(darken.int() === new Cmyk(1, 0.25, 0, 0.2).int())
    });
  });

  describe('.prototype.lighten(factor)', () => {
    it('should return a lighten color', () => {
      // setup
      const cmyk = new Cmyk(1, 0.25, 0, 0);

      // exercise
      const lighten = cmyk.lighten(0.1);

      // verify
      assert(lighten instanceof Cmyk);
      assert(lighten.int() === new Cmyk(0.8, 0.2, 0, 0).int())
    });
  });

  describe('.prototype.int()', () => {
    it('should return an integer value', () => {
      // setup
      const cmyk = new Cmyk(1, 0, 0, 0);
      
      // exercise
      const int = cmyk.int();
      
      // verify
      assert(int === 0x00FFFFFF);
    });
  });
  
  describe('.prototype.css()', () => {
    it('should return a css color', () => {
      // setup
      const cmyk = new Cmyk(0.2, 0.4, 0.6, 0.8);
      
      // exercise
      const css = cmyk.css();
      
      // verify
      assert(css === 'device-cmyk(20%, 40%, 60%, 80%)');
    });

    it('should return a css color when the alpha value is set', () => {
      // setup
      const cmyk = new Cmyk(0.2, 0.4, 0.6, 0.8, 1);

      // exercise
      const css = cmyk.css();

      // verify
      assert(css === 'device-cmyk(20%, 40%, 60%, 80%, 100%)');
    });
  });
  
  describe.skip('.prototype.darken(factor)', () => {
    // TODO: Write tests
  });
  
  describe.skip('.prototype.lighten(factor)', () => {
    // TODO: Write tests
  });
  
  describe('.prototype.cmy()', () => {
    it('should convert the color to CMY', () => {
      // setup
      const cmyk = new Cmyk(0.2, 0.4, 0.6, 0.8, 1);

      // exercise
      const cmy = cmyk.cmy();

      // verify
      assert(cmy instanceof Cmy);
      assert(cmy.isValid());
      assert(cmy.int() === cmyk.int());
    });
  });
  
  describe('.prototype.cmyk()', () => {
    it('should clone the color', () => {
      // setup
      const cmyk = new Cmyk(0.2, 0.4, 0.6, 0.8, 1);

      // exercise
      const converted = cmyk.cmyk();

      // verify
      assert(converted instanceof Cmyk);
      assert(converted.isValid());
      assert(converted.int() === cmyk.int());
    });
  });

  describe('.prototype.hsl()', () => {
    it('should convert the color to HSL', () => {
      // setup
      const cmyk = new Cmyk(0.2, 0.4, 0.6, 0.8, 1);

      // exercise
      const hsl = cmyk.hsl();

      // verify
      assert(hsl instanceof Hsl);
      assert(hsl.isValid());
      assert(hsl.int() === cmyk.int());
    });
  });
  
  describe('.prototype.hsv()', () => {
    it('should convert the color to HSV', () => {
      // setup
      const cmyk = new Cmyk(0.2, 0.4, 0.6, 0.8, 1);

      // exercise
      const hsv = cmyk.hsv();

      // verify
      assert(hsv instanceof Hsv);
      assert(hsv.isValid());
      assert(hsv.int() === cmyk.int());
    });
  });

  describe('.prototype.hwb()', () => {
    it('should convert the color to HWB', () => {
      // setup
      const cmyk = new Cmyk(0.2, 0.4, 0.6, 0.8, 1);

      // exercise
      const hwb = cmyk.hwb();

      // verify
      assert(hwb instanceof Hwb);
      assert(hwb.isValid());
      assert(hwb.int() === cmyk.int());
    });
  });
  
  describe('.prototype.rgb()', () => {
    it('should convert the color to RGB', () => {
      // setup
      const cmyk = new Cmyk(0.2, 0.4, 0.6, 0.8, 1);

      // exercise
      const rgb = cmyk.rgb();

      // verify
      assert(rgb instanceof Rgb);
      assert(rgb.isValid());
      assert(rgb.int() === cmyk.int());
    });
  });
});