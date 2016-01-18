import Converter from './converter';
import Hsv from '../color/hsv';

export default class HsvConverter extends Converter {
  to(r, g, b, a) {
    r /= 0xFF;
    g /= 0xFF;
    b /= 0xFF;

    let max   = Math.max(r, g, b);
    let min   = Math.min(r, g, b);
    let delta = max - min;
    if (delta === 0) {
      return new Hsv(0, 0, max);
    }

    let h = 0;
    if (max === r) {
      h = 60 * ((g - b) / delta % 6);
    } else if (max === g) {
      h = 60 * ((b - r) / delta + 2);
    } else if (max === b) {
      h = 60 * ((r - g) / delta + 4);
    }

    let s = 0;
    if (max !== 0) {
      s = delta / max;
    }

    let v = max;
    return new Hsv(h, s, v);
  }
}
