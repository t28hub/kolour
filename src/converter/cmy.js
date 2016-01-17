import Converter from './converter';
import Cmy from '../space/cmy';
import Cmyk from '../space/cmyk';

export default class CmyConverter extends Converter {
  convert(space) {
    super.convert(space);

    if (space instanceof Cmy) {
      return space;
    }

    if (space instanceof Cmyk) {
      let k = space.k();
      return new Cmy(
          c * (1 - k) + k,
          m * (1 - k) + k,
          y * (1 - k) + k
      );
    }

    let rgb = space.rgb();
    return new Rgb(
        1 - (rgb.r() / 0xFF),
        1 - (rgb.g() / 0xFF),
        1 - (rgb.b() / 0xFF)
    );
  }
}
