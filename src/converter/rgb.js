import Converter from './converter';
import Rgb from '../space/rgb';
import Hsl from '../space/hsl';
import Hsv from '../space/hsv';
import Cmy from '../space/cmy';
import Cmyk from '../space/cmyk';

export default class RgbConverter extends Converter {
  convert(space) {
    super.convert(space);
    if (space instanceof Rgb) {
      return space;
    }

    if (space instanceof Hsl) {
      return fromHsl(space);
    }

    if (space instanceof Hsv) {
      return fromHsv(space);
    }

    if (space instanceof Cmy) {
      return fromCmy(space);
    }

    if (space instanceof Cmyk) {
      return fromCmyk(space);
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

  fromHsv(hsv) {
    let h = hsv.h();
    let s = hsv.s();
    let v = hsv.v();

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
    return new Rgb(
        Math.round(0xFF * (r + m)),
        Math.round(0xFF * (g + m)),
        Math.round(0xFF * (b + m))
    );
  }

  fromCmy(cmy) {
    return new Rgb(
      Math.round(0xFF * (1 - cmy.c())),
      Math.round(0xFF * (1 - cmy.m())),
      Math.round(0xFF * (1 - cmy.y()))
    );
  }

  fromCmyk(cmyk) {
    let k = cmyk.k();
    if (k === 1) {
      return new Rgb(0, 0, 0);
    }

    return new Rgb(
        0xFF * (1 - cmyk.c()) * (1 - k),
        0xFF * (1 - cmyk.m()) * (1 - k),
        0xFF * (1 - cmyk.y()) * (1 - k),
    );
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
