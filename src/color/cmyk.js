import Color from './color';
import {CMYK} from './space';
import toRgb from '../converter/rgb';
import toHsl from '../converter/hsl';
import toHsv from '../converter/hsv';
import toCmy from '../converter/cmy';

const KEY = Object.freeze({
  'C': Symbol.for('c'),
  'M': Symbol.for('m'),
  'Y': Symbol.for('y'),
  'K': Symbol.for('k')
});

export default class Cmyk extends Color {
  constructor(c, m, y, k) {
    super(CMYK, [[KEY.C, c], [KEY.M, m], [KEY.Y, y], [KEY.K, k]]);
  }

  toBytes() {
    let k = this.k();
    if (k === 1) {
      return [0, 0, 0, 0];
    }
    return [
      Math.floor(0xFF * (1 - this.c()) * (1 - k)),
      Math.floor(0xFF * (1 - this.m()) * (1 - k)),
      Math.floor(0xFF * (1 - this.y()) * (1 - k)),
      0
    ];
  }

  isValid() {
    for (let value of this.values()) {
      if (!Number.isFinite(value)) {
        return false;
      }
      if (value < 0 || value > 1) {
        return false;
      }
    }
    return true;
  }

  rgb() {
    return toRgb(this);
  }

  hsl() {
    return toHsl(this);
  }

  hsv() {
    return toHsv(this);
  }

  cmy() {
    return toCmy(this);
  }

  cmyk() {
    return this;
  }

  c(value = null) {
    return this.access(KEY.C, value);
  }

  m(value = null) {
    return this.access(KEY.M, value);
  }

  y(value = null) {
    return this.access(KEY.Y, value);
  }

  k(value = null) {
    return this.access(KEY.K, value);
  }
}
