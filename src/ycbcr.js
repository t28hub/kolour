import Color from './color';
import Rgb   from './rgb';

const NAME = Symbol.for('YCbCr');
const KEYS = Object.freeze({
  Y:  Symbol.for('Y'),
  CB: Symbol.for('Cb'),
  CR: Symbol.for('Cr')
});

export default class YCbCr extends Color {
  constructor(y, cb, cr) {
    super(NAME, [[KEYS.Y, y], [KEYS.CB, cb], [KEYS.CR, cr]]);
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
