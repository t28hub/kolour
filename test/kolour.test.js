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

  [
    {object: {r: 255, g: 255, b: 255}, expected: {class: Rgb, name: 'Rgb'}}
  ].forEach(test => {

    let object   = test.object;
    let expected = test.expected;
    it(`should create an instance of ${expected.name} when value is ${JSON.stringify(object)}`, () => {
      let color = kolour(object);
      assert(color !== null);
      assert(color instanceof expected.class);
      assert.deepEqual(color.values(), Object.keys(object).map(key => object[key]));
    });

  });

});
