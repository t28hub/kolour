import Color from './color';
import {CMYK} from './space';

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
