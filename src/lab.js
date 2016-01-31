import Color from './color';
import Xyz   from './xyz';

const NAME = Symbol.for('CIE L*a*b*');
const KEYS = Object.freeze({
  L: Symbol.for('l'),
  A: Symbol.for('a'),
  B: Symbol.for('b')
});

export default class Lab extends Color {
  constructor(l, a, b) {
    super(NAME, [[KEYS.L, l], [KEYS.A, a], [KEYS.B, b]]);
  }

  clone() {
    return new Lab(NAME, ...this.values());
  }

  lab() {
    return this;
  }

  xyz() {
    let y = this.l() + 16 / 116;
    let x = this.a() / 500 + y;
    let z = y - this.b() / 200;

    [x, y, z] = [x, y, z].map(value => {
      let cubed = Math.pow(value, 3);
      if (cubed > 0.008856) {
        return cubed;
      }
      return ((value - 16) / 116) / 7.787;
    });
    return new Xyz(95.047 * x, 100.000 * y, 108.883 * z);
  }
}
