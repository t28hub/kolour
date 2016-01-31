import assert from 'power-assert';
import kolour from '../src/kolour';
import Cmy    from '../src/cmy';
import Cmyk   from '../src/cmyk';
import Hsl    from '../src/hsl';
import Hsv    from '../src/hsv';
import Rgb    from '../src/rgb';
import Xyz    from '../src/xyz';
import Yxy    from '../src/yxy';

describe('kolour', () => {

  [
    undefined,
    null,
    true,
    false,
    1024,
    /^regexp$/,
    new Error(),
    Symbol
  ].forEach(value => {

    it(`should throw TypeError when value is ${value}`, () => {
      assert.throws(() => {
        kolour(value);
      }, TypeError);
    });

  });

  [
    new Cmy(0.0, 0.0, 0.0),
    new Cmyk(0.2, 0.4, 0.6, 0.8),
    new Hsl(120, 0.5, 0.5),
    new Hsv(120, 0.5, 0.5),
    new Rgb(255, 255, 255),
    new Xyz(95.050, 100.000, 108.900),
    new Yxy(100.000, 0.31272, 0.32900),
  ].forEach(value => {

    it(`should clone an instance when value(${value}) is instanceof Color`, () => {
      let color = kolour(value);
      assert(color !== null);
      assert(color !== value);
      assert.deepEqual(color, value);
    });

  });

});
