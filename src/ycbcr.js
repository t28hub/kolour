import Color from './color';

const NAME = Symbol.name('YCbCr');
const KEYS = Object.freeze({
  Y:  Symbol.for('Y'),
  PB: Symbol.for('Pb'),
  PR: Symbol.for('Pr')
});

export default class YCbCr extends Color {
  constructor(y, pb, pr) {
    super(NAME, [[KEYS.Y, y], [KEYS.PB, pb], [KEYS.PR, pr]]);
  }
}
