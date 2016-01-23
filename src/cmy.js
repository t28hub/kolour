import Color from './color';
import Cmyk from './Cmyk';
import Rgb from './rgb';

const SPACE = 'CMY';
const KEY_C = 'c';
const KEY_M = 'm';
const KEY_Y = 'y';

export default class Cmy extends Color {
  constructor(c, m, y) {
    super(SPACE, [[KEY_C, c], [KEY_M, m], [KEY_Y, y]]);
  }

  cmy() {
    return this;
  }

  cmyk() {
    let [c, m, y] = this.values();

    let k = Math.min(c, m, y);
    if (k === 1) {
      return new Cmyk(0, 0, 0, k);
    }

    let delta = 1 - k;
    [c, m, y] = [c, m, y].map(value => {
      return (value - k) / delta;
    });
    return new Cmyk(c, m, y, k);
  }

  hsl() {
    return this.rgb().hsl();
  }

  hsv() {
    return this.rgb().hsv();
  }

  rgb() {
    let [r, g, b] = this.values().map(value => {
      return Math.floor(0xFF * (1 - value));
    });
    return new Rgb(r, g, b);
  }

  xyz() {
    return this.rgb().xyz();
  }
}
