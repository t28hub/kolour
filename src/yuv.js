import Color from './color';

const NAME = Symbol.for('YUV');
const KEYS = Object.freeze({
  Y: Symbol.for('y'),
  U: Symbol.for('u'),
  V: Symbol.for('v')
});

/**
 * https://en.wikipedia.org/wiki/YUV
 */
export default class Yuv extends Color {
  constructor(y, u, v) {
    super(NAME, [[KEYS.Y, y], [KEYS.U, u], [KEYS.V, v]]);
  }
}
