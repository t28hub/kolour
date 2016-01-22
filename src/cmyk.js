import Color from './color';
import Cmy from './cmy';

const SPACE = 'CMYK';
const KEY_C = 'c';
const KEY_M = 'm';
const KEY_Y = 'y';
const KEY_K = 'k';

export default class Cmyk extends Color {
  constructor(c, m, y, k) {
    super(SPACE, [[KEY_C, c], [KEY_M, m], [KEY_Y, y], [KEY_K, k]]);
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
