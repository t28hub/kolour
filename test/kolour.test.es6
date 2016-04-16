import assert from 'power-assert';
import kolour from '../src/kolour.es6';
import Color  from '../src/color/color.es6';
import Cmy    from '../src/color/cmy.es6';
import Cmyk   from '../src/color/cmyk.es6';
import Hsl    from '../src/color/hsl.es6';
import Hsv    from '../src/color/hsv.es6';
import Hwb    from '../src/color/hwb.es6';
import Rgb    from '../src/color/rgb.es6';
import metadata from '../package.json';

describe('kolour', () => {

  it('should create a RGB color with rgb()', () => {
    // exercise
    const color = kolour('rgb(64, 92, 120)');

    // verify
    assert(color instanceof Rgb);
    assert(color.isValid());
    assert(color.equals(new Rgb(64, 92, 120)));
  });

  it('should create a RGB color with rgba()', () => {
    // exercise
    const color = kolour('rgba(64, 92, 120, 0.5)');

    // verify
    assert(color instanceof Rgb);
    assert(color.isValid());
    assert(color.equals(new Rgb(64, 92, 120, 0.5)));
  });

  it('should create a RGB color with rgba()', () => {
    // exercise
    const color = kolour('rgba(20%, 40%, 60%, 0.5)');

    // verify
    assert(color instanceof Rgb);
    assert(color.isValid());
    assert(color.equals(new Rgb(51, 102, 153, 0.5)));
  });

  it('should create a RGB color with #RRGGBB', () => {
    // exercise
    const color = kolour('#24D668');

    // verify
    assert(color instanceof Rgb);
    assert(color.isValid());
    assert(color.equals(new Rgb(36, 214, 104)));
  });

  it('should create a RGB color with #RGB', () => {
    // exercise
    const color = kolour('#ABC');

    // verify
    assert(color instanceof Rgb);
    assert(color.isValid());
    assert(color.equals(new Rgb(170, 187, 204)));
  });

  it('should create a HSL color with hsl()', () => {
    // exercise
    const color = kolour('hsl(30, 50%, 25.4%)');

    // verify
    assert(color instanceof Hsl);
    assert(color.isValid());
    assert(color.equals(new Hsl(30, 0.5, 0.254)));
  });

  it('should create a HSL color with hsla()', () => {
    // exercise
    const color = kolour('hsla(30, 50%, 25.4%, 0.1)');

    // verify
    assert(color instanceof Hsl);
    assert(color.isValid());
    assert(color.equals(new Hsl(30, 0.5, 0.254, 0.1)));
  });

  it('should create a HWB color with hwb()', () => {
    // exercise
    const color = kolour('hwb(30, 50%, 12.5%)');

    // verify
    assert(color instanceof Hwb);
    assert(color.isValid());
    assert(color.equals(new Hwb(30, 0.5, 0.125)));
  });

  it('should create a HWB color with hwb() contained alpha', () => {
    // exercise
    const color = kolour('hwb(30, 50%, 12.5%, 0.1)');

    // verify
    assert(color instanceof Hwb);
    assert(color.isValid());
    assert(color.equals(new Hwb(30, 0.5, 0.125, 0.1)));
  });

  it('should create a CMYK color with device-cmyk()', () => {
    // exercise
    const color = kolour('device-cmyk(80%, 0%, 51.4%, 16.1%)');

    // verify
    assert(color instanceof Cmyk);
    assert(color.isValid());
    assert(color.equals(new Cmyk(0.8, 0.0, 0.514, 0.161)));
  });

  it('should create an invalid color with invalid string', () => {
    // exercise
    const color = kolour('invalid');

    // verify
    assert(color instanceof Color);
    assert(color.isValid() === false);
  });

  [
    {argument: {c: 0.2, m: 0.4, y: 0.6},                expected: new Cmy(0.2, 0.4, 0.6)},
    {argument: {c: 0.2, m: 0.4, y: 0.6, a: 0.5},        expected: new Cmy(0.2, 0.4, 0.6, 0.5)},
    {argument: {c: 0.2, m: 0.4, y: 0.6, k: 0.8},        expected: new Cmyk(0.2, 0.4, 0.6, 0.8)},
    {argument: {c: 0.2, m: 0.4, y: 0.6, k:0.8, a: 0.5}, expected: new Cmyk(0.2, 0.4, 0.6, 0.8, 0.5)},
    {argument: {h: 120, s: 0.4, l: 0.6},                expected: new Hsl(120, 0.4, 0.6)},
    {argument: {h: 120, s: 0.4, l: 0.6, a: 0.5},        expected: new Hsl(120, 0.4, 0.6, 0.5)},
    {argument: {h: 120, s: 0.4, v: 0.6},                expected: new Hsv(120, 0.4, 0.6)},
    {argument: {h: 120, s: 0.4, v: 0.6, a: 0.5},        expected: new Hsv(120, 0.4, 0.6, 0.5)},
    {argument: {h: 120, w: 0.4, b: 0.6},                expected: new Hwb(120, 0.4, 0.6)},
    {argument: {h: 120, w: 0.4, b: 0.6, a: 0.5},        expected: new Hwb(120, 0.4, 0.6, 0.5)},
    {argument: {r: 32, g: 64, b: 96},                   expected: new Rgb(32, 64, 96)},
    {argument: {r: 32, g: 64, b: 96, a: 0.5},           expected: new Rgb(32, 64, 96, 0.5)}
  ].forEach((test) => {

    const {argument, expected} = test;
    
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
    const color = kolour({r: 32, g: 64, b: NaN});

    // verify
    assert(color.isValid() === false);
  });

  it('should create an invalid color with an unsupported object', () => {
    // exercise
    const color = kolour({a: 32, b: 64, c: 96});

    // verify
    assert(color.isValid() === false);
  });

  it ('should create a cloned color with an instance of Color', () => {
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

  describe('.VERSION', () => {

    it('should be equal to version defined in the package.json', () => {
      assert(kolour.VERSION === metadata.version);
    });

  });

});