import Converter from './converter';
import Rgb from '../color/rgb';

export default class RgbConverter extends Converter {
  to(r, g, b, a) {
    return new Rgb(r, g, b);
  }
}
