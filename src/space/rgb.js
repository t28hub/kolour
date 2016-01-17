import Space from './space';
console.log(Space);

const KEY = Object.freeze({
  'R': Symbol.for('r'),
  'G': Symbol.for('g'),
  'B': Symbol.for('b')
});

export default class Rgb extends Space {
  constructor(r, g, b) {
    super([[KEY.R, r], [KEY.G, g], [KEY.B, b]]);
  }

  toString() {
    return `rgb(${this.r()}, ${this.g()}, ${this.b()})`;
  }

  isValid() {
    let values = this.values();
    for (let value of values) {
      if (value < 0x00 || value > 0xFF) {
        return false;
      }
    }
    return true;
  }

  r(value = null) {
    return this.getOrSet(KEY.R, value);
  }

  g(value = null) {
    return this.getOrSet(KEY.G, value);
  }

  b(value = null) {
    return this.getOrSet(KEY.B, value);
  }
}
