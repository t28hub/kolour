import Color from './color';

const NAME = Symbol.for('CIE L*u*v*');
const KEYS = Object.freeze({
  L: Symbol.for('l'),
  U: Symbol.for('u'),
  V: Symbol.for('v')
});

export default class Luv extends Color {
  constructor(l, u, v) {
    super(NAME, [[KEYS.L, l], [KEYS.U, u], [KEYS.V, v]]);
  }
}
