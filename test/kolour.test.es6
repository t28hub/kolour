import assert from 'power-assert';
import kolour from '../src/kolour.es6';
import Color, { NO_ALPHA } from '../src/color/color.es6';
import Cmy from '../src/color/cmy.es6';
import Cmyk from '../src/color/cmyk.es6';
import Hsl from '../src/color/hsl.es6';
import Hsv from '../src/color/hsv.es6';
import Hwb from '../src/color/hwb.es6';
import Rgb from '../src/color/rgb.es6';

describe('kolour', () => {
  [
    {
      argument: 'black',
      expected: new Rgb(0, 0, 0),
    },
    {
      argument: 'white',
      expected: new Rgb(255, 255, 255),
    },
    {
      argument: 'limegreen',
      expected: new Rgb(50, 205, 50),
    },
    {
      argument: 'mediumvioletred',
      expected: new Rgb(199, 21, 133),
    },
    {
      argument: '#24D668',
      expected: new Rgb(36, 214, 104),
    },
    {
      argument: '#ABC',
      expected: new Rgb(170, 187, 204),
    },
    {
      argument: 'rgb(64, 92, 120)',
      expected: new Rgb(64, 92, 120),
    },
    {
      argument: 'rgba(64, 92, 120, 0.5)',
      expected: new Rgb(64, 92, 120, 0.5),
    },
    {
      argument: 'rgba(20%, 40%, 60%, 0.5)',
      expected: new Rgb(51, 102, 153, 0.5),
    },
    {
      argument: 'hsl(30, 50%, 25.4%)',
      expected: new Hsl(30, 0.5, 0.254),
    },
    {
      argument: 'hsla(30, 50%, 25.4%, 0.1)',
      expected: new Hsl(30, 0.5, 0.254, 0.1),
    },
    {
      argument: 'hwb(30, 50%, 12.5%)',
      expected: new Hwb(30, 0.5, 0.125),
    },
    {
      argument: 'hwb(30, 50%, 12.5%, 0.1)',
      expected: new Hwb(30, 0.5, 0.125, 0.1),
    },
    {
      argument: 'device-cmyk(80%, 0%, 51.4%, 16.1%)',
      expected: new Cmyk(0.8, 0.0, 0.514, 0.161),
    },
  ].forEach((test) => {
    const { argument, expected } = test;
    it(`should create ${expected.name} with ${argument}`, () => {
      // exercise
      const color = kolour(argument);

      // verify
      assert(color.isValid());
      assert(color.int() === expected.int());
    });
  });

  it('should create an invalid color with invalid string', () => {
    // exercise
    const color = kolour('invalid');

    // verify
    assert(color instanceof Color);
    assert(color.isValid() === false);
  });

  [
    {
      argument: { c: 0.2, m: 0.4, y: 0.6 },
      expected: new Cmy(0.2, 0.4, 0.6),
    },
    {
      argument: { c: 0.2, m: 0.4, y: 0.6, a: 0.5 },
      expected: new Cmy(0.2, 0.4, 0.6, 0.5),
    },
    {
      argument: { c: 0.2, m: 0.4, y: 0.6, k: 0.8 },
      expected: new Cmyk(0.2, 0.4, 0.6, 0.8),
    },
    {
      argument: { c: 0.2, m: 0.4, y: 0.6, k: 0.8, a: 0.5 },
      expected: new Cmyk(0.2, 0.4, 0.6, 0.8, 0.5),
    },
    {
      argument: { h: 120, s: 0.4, l: 0.6 },
      expected: new Hsl(120, 0.4, 0.6),
    },
    {
      argument: { h: 120, s: 0.4, l: 0.6, a: 0.5 },
      expected: new Hsl(120, 0.4, 0.6, 0.5),
    },
    {
      argument: { h: 120, s: 0.4, v: 0.6 },
      expected: new Hsv(120, 0.4, 0.6),
    },
    {
      argument: { h: 120, s: 0.4, v: 0.6, a: 0.5 },
      expected: new Hsv(120, 0.4, 0.6, 0.5),
    },
    {
      argument: { h: 120, w: 0.4, b: 0.6 },
      expected: new Hwb(120, 0.4, 0.6),
    },
    {
      argument: { h: 120, w: 0.4, b: 0.6, a: 0.5 },
      expected: new Hwb(120, 0.4, 0.6, 0.5),
    },
    {
      argument: { r: 32, g: 64, b: 96 },
      expected: new Rgb(32, 64, 96),
    },
    {
      argument: { r: 32, g: 64, b: 96, a: 0.5 },
      expected: new Rgb(32, 64, 96, 0.5),
    },
  ].forEach((test) => {
    const { argument, expected } = test;
    it(`should create ${expected.name} with ${JSON.stringify(argument)}`, () => {
      // exercise
      const color = kolour(argument);

      // verify
      assert(color.isValid());
      assert(color.equals(expected));
    });
  });

  it('should create an invalid color with an object contained non finite number', () => {
    // exercise
    const color = kolour({ r: 32, g: 64, b: NaN });

    // verify
    assert(color.isValid() === false);
  });

  it('should create an invalid color with an unsupported object', () => {
    // exercise
    const color = kolour({ a: 32, b: 64, c: 96 });

    // verify
    assert(color.isValid() === false);
  });

  it('should create a cloned color with an instance of Color', () => {
    // setup
    const rgb = new Rgb(192, 128, 64);

    // exercise
    const color = kolour(rgb);

    // verify
    assert(color instanceof Rgb);
    assert(color.isValid());
    assert(color.equals(rgb));
  });

  it('should create an invalid color with unsupported value', () => {
    // exercise
    const color = kolour(null);

    // verify
    assert(color instanceof Color);
    assert(color.isValid() === false);
  });
  
  describe('.cmy()', () => {
    it('should create a CMY color without alpha value', () => {
      // exercise
      const color = kolour.cmy(0.2, 0.4, 0.6);
      
      // verify
      assert(color instanceof Cmy);
      assert(color.c() === 0.2);
      assert(color.m() === 0.4);
      assert(color.y() === 0.6);
      assert(color.a() === NO_ALPHA);
    });
    
    it('should create a CMY color with alpha value', () => {
      // exercise
      const color = kolour.cmy(0.2, 0.4, 0.6, 0.5);

      // verify
      assert(color instanceof Cmy);
      assert(color.c() === 0.2);
      assert(color.m() === 0.4);
      assert(color.y() === 0.6);
      assert(color.a() === 0.5);
    });
  });
  
  describe('.cmyk()', () => {
    it('should create a CMYK color without alpha value', () => {
      // exercise
      const color = kolour.cmyk(0.2, 0.4, 0.6, 0.8);
      
      // verify
      assert(color instanceof Cmyk);
      assert(color.c() === 0.2);
      assert(color.m() === 0.4);
      assert(color.y() === 0.6);
      assert(color.k() === 0.8);
      assert(color.a() === NO_ALPHA);
    });
    
    it('should create a CMY color with alpha value', () => {
      // exercise
      const color = kolour.cmyk(0.2, 0.4, 0.6, 0.8, 0.5);

      // verify
      assert(color instanceof Cmyk);
      assert(color.c() === 0.2);
      assert(color.m() === 0.4);
      assert(color.y() === 0.6);
      assert(color.k() === 0.8);
      assert(color.a() === 0.5);
    });
  });
  
  describe('.hsl()', () => {
    it('should create a HSL color without alpha value', () => {
      // exercise
      const color = kolour.hsl(120, 0.4, 0.6);

      // verify
      assert(color instanceof Hsl);
      assert(color.h() === 120);
      assert(color.s() === 0.4);
      assert(color.l() === 0.6);
      assert(color.a() === NO_ALPHA);
    });

    it('should create a HSL color with alpha value', () => {
      // exercise
      const color = kolour.hsl(120, 0.4, 0.6, 0.5);

      // verify
      assert(color instanceof Hsl);
      assert(color.h() === 120);
      assert(color.s() === 0.4);
      assert(color.l() === 0.6);
      assert(color.a() === 0.5);
    });
  });
  
  describe('.hsv()', () => {
    it('should create a HSV color without alpha value', () => {
      // exercise
      const color = kolour.hsv(120, 0.4, 0.6);

      // verify
      assert(color instanceof Hsv);
      assert(color.h() === 120);
      assert(color.s() === 0.4);
      assert(color.v() === 0.6);
      assert(color.a() === NO_ALPHA);
    });

    it('should create a HSV color with alpha value', () => {
      // exercise
      const color = kolour.hsv(120, 0.4, 0.6, 0.5);

      // verify
      assert(color instanceof Hsv);
      assert(color.h() === 120);
      assert(color.s() === 0.4);
      assert(color.v() === 0.6);
      assert(color.a() === 0.5);
    });
  });
  
  describe('.hwb()', () => {
    it('should create a HWB color without alpha value', () => {
      // exercise
      const color = kolour.hwb(120, 0.4, 0.6);

      // verify
      assert(color instanceof Hwb);
      assert(color.h() === 120);
      assert(color.w() === 0.4);
      assert(color.b() === 0.6);
      assert(color.a() === NO_ALPHA);
    });

    it('should create a HWB color with alpha value', () => {
      // exercise
      const color = kolour.hwb(120, 0.4, 0.6, 0.5);

      // verify
      assert(color instanceof Hwb);
      assert(color.h() === 120);
      assert(color.w() === 0.4);
      assert(color.b() === 0.6);
      assert(color.a() === 0.5);
    });
  });
  
  describe('.rgb()', () => {
    it('should create a RGB color without alpha value', () => {
      // exercise
      const color = kolour.rgb(32, 64, 128);

      // verify
      assert(color instanceof Rgb);
      assert(color.r() === 32);
      assert(color.g() === 64);
      assert(color.b() === 128);
      assert(color.a() === NO_ALPHA);
    });

    it('should create a HWB color with alpha value', () => {
      // exercise
      const color = kolour.rgb(32, 64, 128, 0.5);

      // verify
      assert(color instanceof Rgb);
      assert(color.r() === 32);
      assert(color.g() === 64);
      assert(color.b() === 128);
      assert(color.a() === 0.5);
    });
  });
});
