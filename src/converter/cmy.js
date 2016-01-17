import Converter from './converter';
import Cmy from '../space/cmy';

export default class CmyConverter extends Converter {
  convert(space) {
    super.convert(space);

    if (space instanceof Cmy) {
      return space;
    }

    let rgb = space.rgb();
    return new Rgb(
        1 - (rgb.r() / 0xFF),
        1 - (rgb.g() / 0xFF),
        1 - (rgb.b() / 0xFF)
    );
  }
}
