import Color from './color';
import Hsv   from './hsv';

const NAME = Symbol.for('HWB');
const KEYS = Object.freeze({
  H: Symbol.for('h'),
  W: Symbol.for('w'),
  B: Symbol.for('b')
});

/**
 * https://en.wikipedia.org/wiki/HWB_color_model
 */
export default class Hwb extends Color {
  constructor(h, w, b) {
    super(NAME, [[KEYS.H, h], [KEYS.W, w], [KEYS.B, b]]);
  }

  clone() {
    return new Hwb(...this.values());
  }

  hsv() {
    let [h, s, v] = this.values();
    return new Hsv(h, 1 - 1 / (1 - b), 1 - b);
  }
}
