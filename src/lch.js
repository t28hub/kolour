import Color from './color';

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

  lch() {
    return this;
  }
}
