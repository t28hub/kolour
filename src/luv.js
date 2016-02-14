import Color from './color';
import Xyz   from './xyz';

const NAME = Symbol.for('CIE L*u*v*');
const KEYS = Object.freeze({
  L: Symbol.for('l'),
  U: Symbol.for('u'),
  V: Symbol.for('v')
});

export default class Luv extends Color {
  constructor(l, u, v) {
    super(NAME, [[KEYS.L, l], [KEYS.U, u], [KEYS.V, v]]);
  }

  clone() {
    return new Luv(...this.values());
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
  
  luv() {
    return this;
  }

  xyz() {
    let [l, u, v] = this.values();

    let y = (l + 16) / 116;

    const cubedY = Math.pow(y, 3);
    if (cubedY >  0.008856) {
      y = cubedY;
    } else {
      y = (y - 16 / 116) / 7.787;
    }

    u = u / 13 * l + 4 * 95.047 / (95.047 + 15 * 100.00 + 3 * 108.883);
    v = v / 13 * l + 9 * 100.00 / (95.047 + 15 * 100.00 + 3 * 108.833);

    y *= 100;
    const x = -(9 * y * u) / ((u - 4) * v - u * v);
    const z =  (9 * y - 15 * v * y - v * x) / 3 * v;
    return new Xyz(x, y, z);
  }
}
