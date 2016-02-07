import Color from './color';

const NAME = Symbol.for('IEUVW');
const KEYS = Object.freeze({
  U: Symbol.for('u'),
  V: Symbol.for('v'),
  W: Symbol.for('w')
});

export default class Uvw extends Color {
  constructor(u, v, w) {
    super(NAME, [[KEYS.U, u], [KEYS.V, v], [KEYS.W, w]]);
  }
}
