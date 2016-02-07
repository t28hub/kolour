import Color from './color';
import Xyz   from './xyz';

const NAME = Symbol.for('CIEUVW');
const KEYS = Object.freeze({
  U: Symbol.for('u'),
  V: Symbol.for('v'),
  W: Symbol.for('w')
});

export default class Uvw extends Color {
  constructor(u, v, w) {
    super(NAME, [[KEYS.U, u], [KEYS.V, v], [KEYS.W, w]]);
  }

  xyz() {
    let [u, v, w] = this.values();
    
    let x = 1.5 * u;
    let y = v;
    let z = 1.5 * u - 3 * v + 2 * w;
    return new Xyz(x, y, z);
  }
}
