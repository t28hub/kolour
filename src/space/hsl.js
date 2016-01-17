import Space from './space';

const KEY = Object.freeze({
  'H': Symbol.for('h'),
  'S': Symbol.for('s'),
  'L': Symbol.for('l')
});

export default class Hsl extends Space {
}

/*
export default class Hsl extends Space {
  constructor(h, s, l) {
    super([[KEY.H, h], [KEY.S, s], [KEY.L, l]]);
  }

  toString() {
    return `hsl(${this.h()}, ${this.s()}%, ${this.l()}%)`;
  }

  isValid() {
    let h = this.h();
    if (!Number.isFinite(h) || h < 0 || h > 360) {
      return false;
    }

    let s = this.s();
    if (!Number.isFinite(s) || s < 0 || s > 100) {
      return false;
    }

    let l = this.l();
    if (!Number.isFinite(l) || l < 0 || l > 100) {
      return false;
    }
    return true;
  }

  h(value = null) {
    return this.getOrSet(KEY.H, value);
  }

  s(value = null) {
    return this.getOrSet(KEY.S, value);
  }

  l(value = null) {
    return this.getOrSet(KEY.L, value);
  }
}
*/
