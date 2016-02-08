import Color from './color';

const NAME = Symbol.for('YPbPr');
const KEYS = Object.freeze({
  Y:  Symbol.for('y'),
  PB: Symbol.for('pb'),
  PR: Symbol.for('pr')
});

export default class YPbPr extends Color {
  constructor(y, pb, pr) {
    super(NAME, [[KEYS.Y, y], [KEYS.PB, pb], [KEYS.PR, pr]]);
  }
}
