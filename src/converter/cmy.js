import Converter from './converter';
import Cmy from '../color/cmy';

export default class CmyConverter extends Converter {
  to(r, g, b, a) {
    return new Cmy(1 - (r / 0xFF), 1 - (g / 0xFF), 1 - (b / 0xFF));
  }
}
