import Color from './color';
import Rgb   from './rgb';

const NAME = Symbol.for('YCbCr');
const KEYS = Object.freeze({
  Y:  Symbol.for('Y'),
  PB: Symbol.for('Pb'),
  PR: Symbol.for('Pr')
});

export default class YCbCr extends Color {
  constructor(y, pb, pr) {
    super(NAME, [[KEYS.Y, y], [KEYS.PB, pb], [KEYS.PR, pr]]);
  }

  clone() {
    return new YCbCr(...this.values());
  }

  rgb() {
    const [y, cb, cr] = this.values();

    const r = Math.round(y + (cr - 128) * 1.403);
    const g = Math.round(y - (cb - 128) * 0.344 - (cr - 128) * 0.714);
    const b = Math.round(y + (cb - 128) * 1.773);
    return new Rgb(r, g, b);
  }
}
