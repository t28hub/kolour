import Color from './color';
import {HSV} from './space'
import RgbConverter from './converter/rgb';
import HslConverter from './converter/hsl';

const KEY = Object.freeze({
  'H': Symbol.for('h'),
  'S': Symbol.for('s'),
  'V': Symbol.for('v')
});

export default class Hsv extends Color {
  constructor(h, s, v) {
    super(HSV, [[KEY.H, h], [KEY.S, s], [KEY.V, v]]);
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

    let v = this.v();
    if (!Number.isFinite(v) || v < 0 || v > 1) {
      return false;
    }
    return true;
  }

  rgb() {
    return new RgbConverter().convert(this);
  }

  hsl() {
    return new HslConverter().convert(this);
  }

  hsv() {
    return this;
  }

  h(value = null) {
    return this.access(KEY.H, value);
  }

  s(value = null) {
    return this.access(KEY.S, value);
  }

  v(value = null) {
    return this.access(KEY.V, value);
  }
}
