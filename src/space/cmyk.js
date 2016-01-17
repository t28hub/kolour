import Space from './space';

const KEY = Object.freeze({
  'C': Symbol.for('c'),
  'M': Symbol.for('m'),
  'Y': Symbol.for('y'),
  'K': Symbol.for('k')
});

export default class Cmyk extends Space {
  constructor(c, m, y, k) {
    super([[KEY.C, c], [KEY.M, m], [KEY.Y, y], [KEY.K, k]]);
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
    return this.getOrSet(KEY.C, value);
  }

  m(value = null) {
    return this.getOrSet(KEY.M, value);
  }

  y(value = null) {
    return this.getOrSet(KEY.Y, value);
  }

  k(value = null) {
    return this.getOrSet(KEY.K, value);
  }
}
