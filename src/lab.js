import Color from './color';

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
}
