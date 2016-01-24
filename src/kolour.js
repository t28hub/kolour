import Cmy  from './cmy';
import Cmyk from './cmyk';
import Hsl  from './hsl';
import Hsv  from './hsv';
import Rgb  from './rgb';
import Xyz  from './xyz';

const COLORS = [
  Cmy, Cmyk, Hsl, Hsv, Rgb, Xyz
];

export default function kolor(value) {
  for (let clazz of COLORS) {
    let color = clazz.from(value);
    if (!color) {
      continue;
    }
    return color;
  }  
};
