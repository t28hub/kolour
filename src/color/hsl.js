import Color from './color';
import {HSL} from './space';
import toRgb from '../converter/rgb';
import toHsv from '../converter/hsv';
import toCmy from '../converter/cmy';
import toCmyk from '../converter/cmyk';

const KEY = Object.freeze({
  'H': Symbol.for('h'),
  'S': Symbol.for('s'),
  'L': Symbol.for('l')
});

export default class Hsl extends Color {
  constructor(h, s, l) {
    super(HSL, [[KEY.H, h], [KEY.S, s], [KEY.L, l]]);
  }

  toString() {
    return `hsl(${this.h()}, ${this.s()}%, ${this.l()}%)`;
  }

  toBytes() {
    let h = this.h();
    let s = this.s();
    let l = this.l();
    if (s === 0) {
      let value = Math.floor(0xFF * l);
      return [value, value, value, 0];
    }

    let m2 = 0;
    if (l < 0.5) {
      m2 = l * (s + 1);
    } else {
      m2 = l + s - l * s;
    }

    let m1 = 2 * l - m2;
    return [
      Math.floor(0xFF * Hsl.hueToRgb(m1, m2, h / 360 + 1 / 3)),
      Math.floor(0xFF * Hsl.hueToRgb(m1, m2, h / 360)),
      Math.floor(0xFF * Hsl.hueToRgb(m1, m2, h / 360 - 1 / 3)),
      0
    ];
  }

  isValid() {
    let h = this.h();
    if (!Number.isFinite(h) || h < 0 || h > 360) {
      return false;
    }

    let s = this.s();
    if (!Number.isFinite(s) || s < 0 || s > 1) {
      return false;
    }

    let l = this.l();
    if (!Number.isFinite(l) || l < 0 || l > 1) {
      return false;
    }
    return true;
  }

  rgb() {
    return toRgb(this);
  }

  hsl() {
    return this;
  }

  hsv() {
    return toHsv(this);
  }

  cmy() {
    return toCmy(this);
  }

  cmyk() {
    return toCmyk(this);
  }

  h(value = null) {
    return this.access(KEY.H, value);
  }

  s(value = null) {
    return this.access(KEY.S, value);
  }

  l(value = null) {
    return this.access(KEY.L, value);
  }

  static hueToRgb(m1, m2, h) {
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
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
