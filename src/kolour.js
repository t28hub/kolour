import Cmy  from './cmy';
import Cmyk from './cmyk';
import Hsl  from './hsl';
import Hsv  from './hsv';
import Rgb  from './rgb';
import Xyz  from './xyz';

export default class Kolour {
  constructor(color) {
    if (!color) {
      throw new TypeError('color must not be null');
    }
    this.color = color;
  }

  static from(object) {
    // not implemented yet...
  }
}
