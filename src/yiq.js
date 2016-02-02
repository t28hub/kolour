import Color from './color';
import Rgb   from './rgb';

const NAME = Symbol.for('YIQ');
const KEYS = Object.freeze({
  Y: Symbol.for('y'),
  I: Symbol.for('i'),
  Q: Symbol.for('q')
});

/**
 * https://en.wikipedia.org/wiki/YIQ
 */
export default class Yiq extends Color {
  constructor(y, i, q) {
    super(NAME, [[KEYS.Y, y], [KEYS.I, i], [KEYS.Q, q]]);
  }

  clone() {
    return new Yiq(...this.values());
  }

  rgb() {
    let [y, i, q] = this.values();

    let r = 1 * y + 0.956 * i + 0.621 * q;
    let g = 1 * y - 0.272 * i - 0.647 * q;
    let b = 1 * y - 1.106 * i + 1.703 * q;

    [r, g, b] = [r, g, b].map(value => {
      value = Math.max(value, 0);
      value = Math.min(value, 1);
      Math.round(value * 0xFF);
    });

    return new Rgb(r, g, b);
  }
}
