import Utils from './utils';
import Color from './color';
import Cmy from './cmy';
import Hsl from './hsl';
import Hsv from './hsv';
import Xyz from './xyz';

const NAME = Symbol.for('RGB');
const KEYS = Object.freeze({
  R: Symbol.for('r'),
  G: Symbol.for('g'),
  B: Symbol.for('b'),
});

export default class Rgb extends Color {
  constructor(r, g, b) {
    super(NAME, [[KEYS.R, r], [KEYS.G, g], [KEYS.B, b]]);
  }

  clone() {
    return new Rgb(...this.values());
  }

  cmy() {
    let [c, m, y] = this.values().map(value => {
      return 1 - value / 0xFF;
    });
    return new Cmy(c, m, y);
  }

  cmyk() {
    return this.cmy().cmyk();
  }

  hsl() {
    let [r, g, b] = this.values().map(value => value / 0xFF);

    let max   = Math.max(r, g, b);
    let min   = Math.min(r, g, b);
    let delta = max - min;
    if (delta === 0) {
      return new Hsl(0, 0, max);
    }

    let h = 0;
    if (max === r) {
      h = 60 * ((g - b) / delta % 360);
    } else if (max === g) {
      h = 60 * ((b - r) / delta + 2);
    } else if (max === b) {
      h = 60 * ((r - g) / delta + 4);
    }
    let l = (max + min) / 2;
    let s = delta / (1 - Math.abs(2 * l - 1));
    return new Hsl(h, s, l);
  }

  hsv() {
    let [r, g, b] = this.values().map(value => value / 0xFF);

    let max   = Math.max(r, g, b);
    let min   = Math.min(r, g, b);
    let delta = max - min;
    if (delta === 0) {
      return new Hsv(0, 0, max);
    }
  
    let h = 0;
    if (max === r) {
      h = 60 * ((g - b) / delta % 6);
    } else if (max === g) {
      h = 60 * ((b - r) / delta + 2);
    } else if (max === b) {
      h = 60 * ((r - g) / delta + 4);
    }
  
    let s = 0;
    if (max !== 0) {
      s = delta / max;
    }
  
    let v = max;
    return new Hsv(h, s, v);
  }

  rgb() {
    return this;
  }

  xyz() {
    let [r, g, b] = this.values().map(value => {
      value /= 0xFF;
      if (value > 0.04045) {
        value = Math.pow((value + 0.055) / 1.055, 2.4);
      } else {
        value /= 12.92;
      }
      return value * 100;
    });

    let x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    let y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    let z = r * 0.0193 + g * 0.1192 + b * 0.9505;
    return new Xyz(x, y, z);
  }

  static from(value) {
    if (Utils.isObject(value)) {
      return Rgb.fromObject(value);
    }
    return null;
  }

  static fromObject(object) {
    if (object instanceof Rgb) {
      return object.clone();
    }

    let keysA = Object.keys(object).sort();
    let keysB = Object.keys(KEYS).sort();
    if (keysA.join('').toLowerCase() === keysB.join('').toLowerCase()) {
      return new Rgb(object.r, object.g, object.b);
    }
    return null;
  }
}
