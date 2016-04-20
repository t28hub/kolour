import assert from 'power-assert';
import Color from '../../src/color/color.es6';
import Rgb from '../../src/color/rgb.es6';

const NAME = 'TEST';
const KEYS = Object.freeze({
  A: Symbol.for('a'),
  B: Symbol.for('b'),
  C: Symbol.for('c'),
});

describe('Color', () => {
  describe('.constructor(name, components)', () => {
    it('should create an instance with name and components', () => {
      // exercise
      const color = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // verify
      assert(color !== null);
      assert(color.name === NAME);
      assert(color.components, new Map([[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]));
    });
  });

  describe('.prototype.toString()', () => {
    it('should return a JSON string which contains name and components', () => {
      // setup
      const color = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // exercise
      const string = color.toString();

      // verify
      assert(string === '{"name":"TEST","components":{"a":10,"b":20,"c":30}}');
    });
  });

  describe('.prototype.has(property)', () => {
    it('should return true when a specified property exists', () => {
      // setup
      const color = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // exercise
      const has = color.has(KEYS.A);

      // verify
      assert(has === true);
    });

    it('should return false when a specified property does not exist', () => {
      // setup
      const color = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // exercise
      const has = color.has(Symbol.for('x'));

      // verify
      assert(has === false);
    });
  });

  describe('.prototype.get(property)', () => {
    it('should return value which is mapped a specified property', () => {
      // setup
      const color = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // exercise
      const value = color.get(KEYS.A);

      // verify
      assert(value === 10);
    });

    it('should throw TypeError when a specified property does not exist', () => {
      // setup
      const color = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // verify
      assert.throws(() => {
        // exercise
        color.get(null);
      }, TypeError);
    });
  });

  describe('.prototype.set(property, value)', () => {
    it('should set value to a specified property', () => {
      // setup
      const color = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // exercise
      color.set(KEYS.A, 100);

      // verify
      assert(color.get(KEYS.A) === 100);
    });

    it('should throw TypeError when a specified property does not exist', () => {
      // setup
      const color = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // verify
      assert.throws(() => {
        // exercise
        color.set(null, 100);
      }, TypeError);
    });

    it('should throw TypeError when a value is not finite', () => {
      // setup
      const color = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // verify
      assert.throws(() => {
        // exercise
        color.set(KEYS.A, Number.NaN);
      }, TypeError);
    });
  });

  describe('.prototype.access(property)', () => {
    it('access should return a value without value', () => {
      // setup
      const color = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // exercise
      const value = color.access(KEYS.A);

      // verify
      assert(value === 10);
    });

    it('access should set a value with value', () => {
      // setup
      const color = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // exercise
      color.access(KEYS.A, 100);

      // verify
      assert(color.get(KEYS.A) === 100);
    });
  });

  describe('.prototype.clone()', () => {
    it('should return another instance', () => {
      // setup
      const color = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // exercise
      const cloned = color.clone();

      // verify
      assert(cloned !== color);
      assert(cloned.equals(color));
    });

    it('should return another instance when an instance is a child class of Color', () => {
      // setup
      class TestColor extends Color {
        constructor(a, b, c) {
          super(NAME, [[KEYS.A, a], [KEYS.B, b], [KEYS.C, c]]);
        }
      }
      const color = new TestColor(10, 20, 30);

      // exercise
      const cloned = color.clone();

      // verify
      assert(cloned !== color);
      assert(cloned.equals(color));
    });
  });

  describe('.prototype.equals(value)', () => {
    it('should return true when a value is same class and has same components', () => {
      // setup
      const color1 = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);
      const color2 = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // exercise
      const equals = color1.equals(color2);

      // verify
      assert(equals);
    });

    it('should return false when a value is not instance of Color', () => {
      // setup
      const color = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // exercise
      const equals = color.equals({});

      // verify
      assert(!equals);
    });

    it('should return false when a value does not have same name', () => {
      // setup
      const color1 = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);
      const color2 = new Color('TEST2', [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // exercise
      const equals = color1.equals(color2);

      // verify
      assert(!equals);
    });

    it('should return false when a value does not have components which does not have same size', () => {
      // setup
      const color1 = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);
      const color2 = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20]]);

      // exercise
      const equals = color1.equals(color2);

      // verify
      assert(!equals);
    });
  });

  describe('.prototype.isValid()', () => {
    it('should always return false', () => {
      // setup
      const color = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // exercise
      const isValid = color.isValid();

      // verify
      assert(!isValid);
    });
  });

  describe('.prototype.hex()', () => {
    it('should return a hex string', () => {
      // setup
      const color = new class extends Color {
        rgb() {
          return new Rgb(0, 255, 255);
        }
      };
      
      // exercise
      const hex = color.hex();
      
      // verify
      assert(hex === '#00FFFF');
    });   
  });
  
  describe('.prototype.int()', () => {
    it('should return 0', () => {
      // setup
      const color = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // exercise
      const int = color.int();

      // verify
      assert(int === 0);
    });
  });

  describe('.prototype.css()', () => {
    it('should return empty string', () => {
      // setup
      const color = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // exercise
      const css = color.css();

      // verify
      assert(css === '');
    });
  });

  describe('.prototype.cmy()', () => {
    it('should throw Error', () => {
      // setup
      const color = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // verify
      assert.throws(() => {
        // exercise
        color.cmy();
      }, Error);
    });
  });

  describe('.prototype.cmyk()', () => {
    it('should throw Error', () => {
      // setup
      const color = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // verify
      assert.throws(() => {
        // exercise
        color.cmyk();
      }, Error);
    });
  });

  describe('.prototype.hsl()', () => {
    it('should throw Error', () => {
      // setup
      const color = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // verify
      assert.throws(() => {
        // exercise
        color.hsl();
      }, Error);
    });
  });

  describe('.prototype.hsv()', () => {
    it('should throw Error', () => {
      // setup
      const color = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // verify
      assert.throws(() => {
        // exercise
        color.hsv();
      }, Error);
    });
  });

  describe('.prototype.hwb()', () => {
    it('should throw Error', () => {
      // setup
      const color = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // verify
      assert.throws(() => {
        // exercise
        color.hwb();
      }, Error);
    });
  });

  describe('.prototype.rgb()', () => {
    it('should throw Error', () => {
      // setup
      const color = new Color(NAME, [[KEYS.A, 10], [KEYS.B, 20], [KEYS.C, 30]]);

      // verify
      assert.throws(() => {
        // exercise
        color.rgb();
      }, Error);
    });
  });

  describe('.invalid()', () => {
    it('should return invalid instance', () => {
      // exercise
      const color = Color.invalid();

      // verify
      assert(color.isValid() === false);
      assert(color.cmy() === color);
      assert(color.cmyk() === color);
      assert(color.hsl() === color);
      assert(color.hsv() === color);
      assert(color.hwb() === color);
      assert(color.rgb() === color);
    });
  });
});
