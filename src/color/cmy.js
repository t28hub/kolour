import Color from './color';
import {CMY} from './space';
import toRgb from '../converter/rgb';
import toHsl from '../converter/hsl';
import toHsv from '../converter/hsv';
import toCmyk from '../converter/cmyk';

const KEY = Object.freeze({
  'C': Symbol.for('c'),
  'M': Symbol.for('m'),
  'Y': Symbol.for('y')
});

export default class Cmy extends Color {
  constructor(c, m, y) {
    super(CMY, [[KEY.C, c], [KEY.M, m], [KEY.Y, y]]);
  }

  toBytes() {
    return [
      Math.floor(0xFF * (1 - this.c())),
      Math.floor(0xFF * (1 - this.m())),
      Math.floor(0xFF * (1 - this.y())),
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
    return this;
  }

  cmyk() {
    return toCmyk(this);
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
}
