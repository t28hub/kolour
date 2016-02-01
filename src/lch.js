import Color from './color';
import Lab   from './lab';

const NAME = Symbol.for('CIE LCH');
const KEYS = Object.freeze({
  L: Symbol.for('l'),
  C: Symbol.for('c'),
  H: Symbol.for('h')
});

export default class Lch extends Color {
  constructor(l, c, h) {
    super(NAME, [[KEYS.L, l], [KEYS.C, c], [KEYS.H, h]]);
  }

  lab() {
    let [l, c, h] = this.values();

    let r = h / 180 * Math.PI;
    let a = Math.cos(r) * c;
    let b = Math.sin(r) * c;
    return new Lab(l, a, b);
  }

  lch() {
    return this;
  }
}
