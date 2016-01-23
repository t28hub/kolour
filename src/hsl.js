import Color from './color';
import Rgb from './rgb';

const NAME = Symbol.for('HSL');
const KEYS = Object.freeze({
  H: Symbol.for('h'), 
  S: Symbol.for('s'), 
  L: Symbol.for('l')
});

export default class Hsl extends Color {
  constructor(h, s, l) {
    super(NAME, [[KEYS.H, h], [KEYS.S, s], [KEYS.L, l]]);
  }

  hsl() {
    return this;
  }

  hsv() {
    return this.rgb().hsv();
  }

  rgb() {
    let [h, s, l] = this.values();
    if (s === 0) {
      let value = Math.floor(0xFF * l);
      return [value, value, value];
    }

    let m2 = 0;
    if (l < 0.5) {
      m2 = l * (s + 1);
    } else {
      m2 = l + s - l * s;
    }

    let m1 = 2 * l - m2;
    return new Rgb(
        Math.floor(0xFF * Hsl.hueToRgb(m1, m2, h / 360 + 1 / 3)),
        Math.floor(0xFF * Hsl.hueToRgb(m1, m2, h / 360)),
        Math.floor(0xFF * Hsl.hueToRgb(m1, m2, h / 360 - 1 / 3))
    );
  }

  cmy() {
    return this.rgb().cmy();
  }

  cmyk() {
    return this.rgb().cmy().cmyk();
  }

  xyz() {
    return this.rgb().xyz();
  }

  static hueToRgb(m1, m2, h) {
    if (h < 0) {
      h += 1;
    }
    if (h > 1) {
      h -= 1;
    }

    if (h * 6 < 1) {
      return m1 + (m2 - m1) * h * 6;
    } else if (h * 2 < 1) {
      return m2;
    } else if (h * 3 < 2) {
      return m1 + (m2 - m1) * (2 / 3 - h) * 6;
    }
    return m1;
  }
}
