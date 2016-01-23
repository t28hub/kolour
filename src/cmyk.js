import Color from './color';
import Cmy from './cmy';

const NAME = Symbol.for('CMYK');
const KEYS = Object.freeze({
  C: Symbol.for('c'), 
  M: Symbol.for('m'), 
  Y: Symbol.for('y'), 
  K: Symbol.for('k')
});

export default class Cmyk extends Color {
  constructor(c, m, y, k) {
    super(NAME, [[KEYS.C, c], [KEYS.M, m], [KEYS.Y, y], [KEYS.K, k]]);
  }

  cmy() {
    let [c, m, y, k] = this.values();
    let delta = 1 - k;
    [c, m, y] = this.values().map(value => {
      return value * delta + k;
    });
    return new Cmy(c, m, y);
  }

  cmyk() {
    return this;
  }

  hsl() {
    return this.cmy().hsl();
  }

  hsv() {
    return this.cmy().hsv();
  }

  rgb() {
    return this.cmy().rgb();
  }

  xyz() {
    return this.cmy().rgb().xyz();
  }
}
