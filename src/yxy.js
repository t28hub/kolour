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
    const x = this.x() * (this.Y() / this.y());
    const y = this.Y();
    const z = (1 - this.x() - this.y()) * (this.Y() / this.y());
    return new Xyz(x, y, z);
  }

  yxy() {
    return this;
  }

  static fromObject(object) {
    const keys1 = Object.keys(object).sort();
    const keys2 = Object.keys(KEYS).sort();
    if (keys1.join('') !== keys2.join('')) {
      return null;
    }

    const Y = object.Y;
    const x = object.x;
    const y = object.y;
    return new Yxy(Y, x, y);
  }
}
