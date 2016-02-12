import Color from './color';
import Lab   from './lab';
import Luv   from './luv';
import Rgb   from './rgb';
import Uvw   from './uvw';
import Yxy   from './yxy';

const NAME = Symbol.for('XYZ');
const KEYS = Object.freeze({
  X: Symbol.for('x'),
  Y: Symbol.for('y'),
  Z: Symbol.for('z')
});

export default class Xyz extends Color {
  constructor(x, y, z) {
    super(NAME, [[KEYS.X, x], [KEYS.Y, y], [KEYS.Z, z]]);
  }

  clone() {
    return new Xyz(...this.values());
  }

  cmy() {
    return this.rgb().cmy();
  }

  cmyk() {
    return this.rgb().cmyk();
  }

  hsl() {
    return this.rgb().hsl();
  }

  hsv() {
    return this.rgb().hsv();
  }

  hwb() {
    return this.rgb().hwb();
  }

  lab() {
    let x = this.x() / 95.047;
    let y = this.y() / 100.000;
    let z = this.z() / 108.883;

    [x, y, z] = [x, y, z].map((value) => {
      if (value > 0.008856) {
        return Math.pow(value, 1 / 3);
      }
      return 7.787 * value + 16 / 116;
    });
    return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z));
  }

  luv() {
    let [x, y, z] = this.values();

    let u = 4 * x / (x + 15 * y + 3 * z);
    let v = 9 * y / (x + 15 * y + 3 * z);

    y /= 100;
    if (y > 0.008856) {
      y = Math.pow(y, 1 / 3);
    } else {
      y = 7.787 * y + 16 / 116;
    }

    const l = 116 * y - 16;
    u = 13 * l * (u - 4 *  95.047 / (95.047 + 15 * 100.000 + 3 * 108.883));
    v = 13 * l * (v - 9 * 100.000 / (95.047 + 15 * 100.000 + 3 * 108.883));
    return new Luv(l, u, v);
  }

  rgb() {
    const [x, y, z] = this.values().map((value) => {
      return value / 100
    });

    let r = x *  3.2406 + y * -1.5372 + z * -0.4986;
    let g = x * -0.9689 + y *  1.8758 + z *  0.0425;
    let b = x *  0.0557 + y * -0.2040 + z *  1.0570;
    [r, g, b] = [r, g, b].map((value) => {
      if (value > 0.0031308) {
        value = 1.055 * Math.pow(value, 1 / 2.4) - 0.055;
      } else {
        value *= 12.92;
      }
      return Math.floor(0xFF * value);
    });

    return new Rgb(r, g, b);
  }

  uvw() {
    const [x, y, z] = this.values();

    const u = 2 / 3 * x;
    const v = y;
    const w = - 1 / 2 * x + 3 / 2 * y + 1 / 2 * z;
    return new Uvw(u, v, w);
  }

  xyz() {
    return this;
  }

  yuv() {
    return this.rgb().yuv();
  }

  yxy() {
    const [x, y, z] = this.values();
    return new Yxy(y, x / (x + y + z), y / (x + y + z));
  }
}
