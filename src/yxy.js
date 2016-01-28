import Color from './color';
import Xyz   from './xyz';

const NAME = Symbol.for('Yxy');
const KEYS = Object.freeze({
  Y: Symbol.for('Y'),
  x: Symbol.for('x'),
  y: Symbol.for('y')
});

export default class Yxy extends Color {
  constructor(Y, x, y) {
    super(NAME, [[KEYS.Y, Y], [KEYS.x, x], [KEYS.y, y]]);
  }

  clone() {
    return new Yxy(...this.values());
  }

  isValid() {
    return false;
  }

  cmy() {
    return this.xyz().cmy();
  }

  cmyk() {
    return this.xyz().cmyk();
  }

  hsl() {
    return this.xyz().hsl();
  }

  hsv() {
    return this.xyz().hsv();
  }

  rgb() {
    return this.xyz().rgb();
  }

  xyz() {
    // Not implemented yet
    return null;
  }

  yxy() {
    return this;
  }

  static fromObject(object) {
    let keys1 = Object.keys(object).sort();
    let keys2 = Object.keys(KEYS).sort();
    if (keys1.join('') !== keys2.join('')) {
      return null;
    }

    let Y = object.Y;
    let x = object.x;
    let y = object.y;
    return new Yxy(Y, x, y);
  }
}
