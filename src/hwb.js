import Color from './color';

const NAME = Symbol.for('HWB');
const KEYS = Object.freeze({
  H: Symbol.for('h'),
  W: Symbol.for('w'),
  B: Symbol.for('b')
});

export default class Hwb extends Color {
  constructor(h, w, b) {
    super(NAME, [[KEYS.H, h], [KEYS.W, w], [KEYS.B, b]]);
  }

  clone() {
    return new Hwb(...this.values());
  }
}
