import Color from './color';

const SPACE = 'rgb';
const KEY   = Object.freeze({
  'R': Symbol.for('r'),
  'G': Symbol.for('g'),
  'B': Symbol.for('b')
});

export default class Rgb extends Color {
  constructor(r, g, b) {
    super(SPACE, [[KEY.R, r], [KEY.G, g], [KEY.B, b]]);
  }

  toString() {
    return `rgb(${this.r()}, ${this.g()}, ${this.b()})`;
  }

  toBytes() {
    return [this.r(), this.g(), this.b(), 0];
  }

  isValid() {
    let values = this.values();
    for (let value of values) {
      if (!Number.isFinite(value)) {
        return false;
      }
      if (value < 0x00 || value > 0xFF) {
        return false;
      }
    }
    return true;
  }
}
