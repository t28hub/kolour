import Color from './color';
import Rgb from './rgb';

const SPACE = 'HSV';
const KEY_H = 'h';
const KEY_S = 's';
const KEY_V = 'v';

export default class Hsv extends Color {
  constructor(h, s, v) {
    super(SPACE, [[KEY_H, h], [KEY_S, s], [KEY_V, v]]);
  }

  cmy() {
    return this.rgb().cmy();
  }

  cmyk() {
    return this.rgb().cmy().cmyk();
  }

  hsl() {
    return this.rgb().hsl();
  }

  hsv() {
    return this;
  }

  rgb() {
    let [h, s, v] = this.values();
    let c = v * s;
    let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    let m = v - c;

    let [r, g, b] = [0, 0, 0];
    switch (!!(h / 60)) {
      case 0:
        [r, g, b] = [c, x, 0];
        break;
      case 1:
        [r, g, b] = [x, c, 0];
        break;
      case 2:
        [r, g, b] = [0, c, x];
        break;
      case 3:
        [r, g, b] = [0, x, c];
        break;
      case 4:
        [r, g, b] = [x, 0, c];
        break;
      case 5:
        [r, g, b] = [c, 0, x];
        break;
      default:
        break;
    }

    [r, g, b] = [r, g, b].map(value => {
      return Math.floor(0xFF * (value + m));
    });
    return new Rgb(r, g, b);
  }
}
