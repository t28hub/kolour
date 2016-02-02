import Color from './color';

const NAME = Symbol.for('YIQ');
const KEYS = Object.freeze({
  Y: Symbol.for('y'),
  I: Symbol.for('i'),
  Q: Symbol.for('q')
});

/**
 * https://en.wikipedia.org/wiki/YIQ
 */
export default class Yiq extends Color {
  constructor(y, i, q) {
    super(NAME, [[KEYS.Y, y], [KEYS.I, i], [KEYS.Q, q]]);
  }
}
