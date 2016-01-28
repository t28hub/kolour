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

  clone() {
    return new Cmyk(...this.values());
  }

  isValid() {
    return this.values().every(value => {
      if (!Number.isFinite(value)) {
        return false;
      }
      return 0 <= value && value <= 1;
    });
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
    return this.cmy().xyz();
  }

  yxy() {
    return this.cmy().yxy();
  }

  static fromObject(object) {
    let keys1 = Object.keys(object).sort();
    let keys2 = Object.keys(KEYS).sort();
    if (keys1.join('').toLowerCase() !== keys2.join('').toLowerCase()) {
      return null;
    }
    let c = object.c || object.C;
    let m = object.m || object.M;
    let y = object.y || object.Y;
    let k = object.k || object.K;
    return new Cmyk(c, m, y, k);
  }
}
