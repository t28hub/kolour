import Color from './color';
import Rgb   from './rgb';

const NAME = Symbol.for('YUV');
const KEYS = Object.freeze({
  Y: Symbol.for('y'),
  U: Symbol.for('u'),
  V: Symbol.for('v')
});

/**
 * https://en.wikipedia.org/wiki/YUV
 */
export default class Yuv extends Color {
  constructor(y, u, v) {
    super(NAME, [[KEYS.Y, y], [KEYS.U, u], [KEYS.V, v]]);
  }

  rgb() {
    let [y, u, v] = this.values();

    let r = y +           u + 1.13983 * v;
    let g = y - 0.39465 * u - 0.58060 * v;
    let b = y + 2.03211 * u +           v;
    return new Rgb(r, g, b);
  }
}
