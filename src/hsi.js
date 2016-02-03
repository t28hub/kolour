import Color from './color';

const NAME = Symbol.for('HSI');
const KEYS = Object.freeze({
  H: Symbol.for('H'),
  S: Symbol.for('S'),
  L: Symbol.for('L')
});

export default class Hsi extends Color {
  constructor(h, s, i) {
    super(NAME, [[KEYS.H, h], [KEYS.S, s], [KEYS.L, l]]);
  }

  clone() {
    return new Hsi(...this.values());
  }
}
