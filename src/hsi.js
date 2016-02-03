import Color from './color';
import Rgb   from './rgb';

const NAME = Symbol.for('HSI');
const KEYS = Object.freeze({
  H: Symbol.for('H'),
  S: Symbol.for('S'),
  L: Symbol.for('L')
});

export default class Hsi extends Color {
  constructor(h, s, i) {
    super(NAME, [[KEYS.H, h], [KEYS.S, s], [KEYS.L, l]]);
  }

  clone() {
    return new Hsi(...this.values());
  }

  rgb() {
    let [h, s, i] = this.values();
    let [r, g, b] = [0, 0, 0];

    h *= 360;

    if (0 < h && h <= 120) {
      b = (1 - s) / 3;
      r = (1 + s * Math.cos(h)) / Math.cos(60 - h) / 3;
      g = 1 - (b + r);
    } else if (120 < h && h <= 240) {
      h -= 120;
      r = (1 - s) / 3;
      g = (1 + s * Math.cos(h)) / Math.cos(60 - h) / 3;
      b = 1 - (r + g);
    } else {
      h -= 240;
      g = (1 - s) / 3;
      b = (1 + s * Math.cos(h)) / Math.cos(60 - h) / 3;
      r = 1 - (g + b);
    }
  }
}
