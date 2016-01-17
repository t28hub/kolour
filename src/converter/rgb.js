import Converter from './converter';
import Rgb from '../space/rgb';
import Hsl from '../space/hsl';

export default class RgbConverter extends Converter {
  convert(space) {
    super.convert(space);
    if (space instanceof Rgb) {
      return space;
    }

    if (space instanceof Hsl) {
      return fromHsl(space);
    }
    return null;
  }

  fromHsl(hsl) {
    let h = hsl.h();
    let s = hsl.s();
    let l = hsl.l();
    if (s === 0) {
      let value = Math.round(l * 0xFF);
      return new Rgb(value, value, value);
    }

    let m2 = 0;
    if (l < 0.5) {
      m2 = l * (s + 1);
    } else {
      m2 = l + s - l * s;
    }

    let m1 = 2 * l - m2;
    let r = Math.round(255 * Hsl.hueToRgb(m1, m2, h / 360 + 1 / 3));
    let g = Math.round(255 * Hsl.hueToRgb(m1, m2, h / 360));
    let b = Math.round(255 * Hsl.hueToRgb(m1, m2, h / 360 - 1 / 3));
    return new Rgb(r, g, b)
  }

  static hueToRgb(m1, m2, h) {
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }

    if (h * 6 < 1) {
      return m1 + (m2 - m1) * h * 6;
    } else if (h * 2 < 1) {
      return m2;
    } else if (h * 3 < 2) {
      return m1 + (m2 - m1) * (2 / 3 - h) * 6;
    }
    return m1;
  }
}
