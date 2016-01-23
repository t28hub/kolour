import Color from './color';
import Rgb from './rgb';

const SPACE = 'XYZ';
const KEY_X = 'x';
const KEY_Y = 'y';
const KEY_Z = 'z';

export default class Xyz extends Color {
  constructor(x, y, z) {
    super(SPACE, [[KEY_X, x], [KEY_Y, y], [KEY_Z, z]]);
  }

  cmy() {
    return this.rgb().cmy();
  }

  cmyk() {
    return this.rgb().cmy().cmyk();
  }

  hsl() {
    return this.rgb().hsl();
  }

  hsv() {
    return this.rgb().hsv();
  }

  rgb() {
    let [x, y, z] = this.values().map(value => value / 100);

    let r = x *  3.2406 + y * -1.5372 + z * -0.4986;
    let g = x * -0.9689 + y *  1.8758 + z *  0.0425;
    let b = x *  0.0557 + y * -0.2040 + z *  1.0570;
    [r, g, b] = [r, g, b].map(value => {
      if (value > 0.0031308) {
        value = 1.055 * Math.pow(value, 1 / 2.4) - 0.055;
      } else {
        value *= 12.92;
      }
      return Math.floor(0xFF * value);
    });

    return new Rgb(r, g, b);
  }

  xyz() {
    return this;
  }
}
