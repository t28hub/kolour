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
    const [l, c, h] = this.values();

    const r = h / 180 * Math.PI;
    const a = Math.cos(r) * c;
    const b = Math.sin(r) * c;
    return new Lab(l, a, b);
  }

  lch() {
    return this;
  }
}
