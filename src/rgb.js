import Color from './color';
import Cmy   from './cmy';
import Hsi   from './hsi';
import Hsl   from './hsl';
import Hsv   from './hsv';
import Xyz   from './xyz';
import Yiq   from './yiq';
import Yuv   from './yuv';

const NAME = Symbol.for('RGB');
const KEYS = Object.freeze({
  R: Symbol.for('r'),
  G: Symbol.for('g'),
  B: Symbol.for('b'),
});

const HEX_PATTERN = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i;
const INT_PATTERN = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i;
const PCT_PATTERN = /^rgb\(\s*(\d{1,3}|\d{1,2}\.\d+)%\s*,\s*(\d{1,3}|\d{1,2}\.\d+)%\s*,\s*(\d{1,3}|\d{1,2}\.\d+)%\s*\)$/i;

export default class Rgb extends Color {
  constructor(r, g, b) {
    super(NAME, [[KEYS.R, r], [KEYS.G, g], [KEYS.B, b]]);
  }

  clone() {
    return new Rgb(...this.values());
  }

  isValid() {
    return this.values().every(value => {
      if (!Number.isInteger(value)) {
        return false;
      }
      return 0x00 <= value && value <= 0xFF;
    });
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

  hsi() {
    let [r, g, b] = this.values();

    let i = (r + g + b) / 3;
    let s = 1 - (3 / (r + g + b)) * Math.min(r, g, b);
    let h = Math.acos((0.5 * (r - g) + (r - b)) / Math.pow(r - g, 2) + (r - b) * Math.pow(g - b, 0.5));

    if (b > g) {
      h = 360 - h;
    }
    return new Hsi(h, s, i);
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

  hwb() {
    return this.hsv().hwb();
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

  yiq() {
    let [r, g, b] = this.values().map(value => value /= 0xFF);

    let y = 0.299 * r + 0.587 * g + 0.114 * b;
    let i = 0.596 * r - 0.274 * g - 0.322 * b;
    let q = 0.211 * r - 0.523 * g + 0.312 * b;
    return new Yiq(y, i, q);
  }

  yuv() {
    let [r, g, b] = this.values().map(value => value /= 0xFF);

    let y =  0.29900 * r + 0.58700 * g + 0.11400 * b;
    let u = -0.14713 * r - 0.28886 * g + 0.43600 * b;
    let v =  0.61500 * r - 0.51499 * g - 0.10001 * b;
    return new Yuv(y, u, v);
  }

  yxy() {
    return this.xyz().yxy();
  }

  static fromObject(object) {
    let keysA = Object.keys(object).sort();
    let keysB = Object.keys(KEYS).sort();
    if (keysA.join('').toLowerCase() === keysB.join('').toLowerCase()) {
      return new Rgb(object.r, object.g, object.b);
    }
    return null;
  }

  static fromString(string) {
    let matches = string.match(HEX_PATTERN);
    if (matches) {
      let matched = matches[1];
      let integer = Number.parseInt(matched, 16);
      if (matched.length === 6) {
        return new Rgb(integer >> 16 & 0xFF, integer >>  8 & 0xFF, integer >>  0 & 0xFF);
      }
      return new Rgb((integer >> 8 & 0xF) * 17, (integer >> 4 & 0xF) * 17, (integer >> 0 & 0xF) * 17);
    }
  }
}
