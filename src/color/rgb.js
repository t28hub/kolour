import Color from './color';
import {RGB} from './space'; 
import toHsl from '../converter/hsl';
import toHsv from '../converter/hsv';
import toCmy from '../converter/cmy';
import toCmyk from '../converter/cmyk';

const KEY = Object.freeze({
  'R': Symbol.for('r'),
  'G': Symbol.for('g'),
  'B': Symbol.for('b')
});

export default class Rgb extends Color {
  constructor(r, g, b) {
    super(RGB, [[KEY.R, r], [KEY.G, g], [KEY.B, b]]);
  }

  toString() {
    return `rgb(${this.r()}, ${this.g()}, ${this.b()})`;
  }

  toBytes() {
    return [this.r(), this.g(), this.b(), 0];
  }

  isValid() {
    let values = this.values();
    for (let value of values) {
      if (!Number.isFinite(value)) {
        return false;
      }
      if (value < 0x00 || value > 0xFF) {
        return false;
      }
    }
    return true;
  }

  rgb() {
    return this;
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
    return toCmyk(this);
  }

  r(value = null) {
    return this.access(KEY.R, value);
  }

  g(value = null) {
    return this.access(KEY.G, value);
  }

  b(value = null) {
    return this.access(KEY.B, value);
  }
}
