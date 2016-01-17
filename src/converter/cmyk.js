import Converter from './conveter';
import Cmy from '../space/cmy';
import Cmyk from '../space/cmyk';

export default class CmykConverter extends Converter {
  convert(space) {
    super.convert(space);
    if (space instanceof Cmyk) {
      return space;
    }

    if (space instanceof Cmy) {
      return fromCmy(space);
    }
    return space.rgb().cmyk();
  }

  fromCmy(cmy) {
    let c = cmy.c();
    let m = cmy.m();
    let y = cmy.y();
    let k = 1;
    if (c < k) {
      k = c;
    } else if (m < k) {
      k = m;
    } else if (y < k) {
      k = y;
    }

    if (k === 1) {
      return new Cmyk(0, 0, 0, 0);
    }

    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);
    return new Cmyk(c, m, y, k);
  }
}
