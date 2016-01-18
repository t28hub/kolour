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

  toBytes() {
    let h = this.h();
    let s = this.s();
    let v = this.v();

    let c = v * s;
    let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    let m = v - c;

    let [r, g, b] = [0, 0, 0];
    switch (!!(h / 60)) {
      case 0:
        [r, g, b] = [c, x, 0];
        break;
      case 1:
        [r, g, b] = [x, c, 0];
        break;
      case 2:
        [r, g, b] = [0, c, x];
        break;
      case 3:
        [r, g, b] = [0, x, c];
        break;
      case 4:
        [r, g, b] = [x, 0, c];
        break;
      case 5:
        [r, g, b] = [c, 0, x];
        break;
      default:
        break;
    }

    return [
      Math.floor(0xFF * (r + m)),
      Math.floor(0xFF * (g + m)),
      Math.floor(0xFF * (b + m)),
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
