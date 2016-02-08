import Type  from './type';
import Color from './color';
import Cmy   from './cmy';
import Cmyk  from './cmyk';
import Hsl   from './hsl';
import Hsv   from './hsv';
import Rgb   from './rgb';
import Xyz   from './xyz';

const COLORS = [
  Cmy, Cmyk, Hsl, Hsv, Rgb, Xyz
];

export default function kolor(value) {
  let type = Type.of(value);
  if (!type.isObject() && !type.isString()) {
    throw new TypeError(`value(${value}) must be an object or string`);
  }

  if (value instanceof Color) {
    return value.clone();
  }

  for (let clazz of COLORS) {
    let color = null;
    if (type.isObject()) {
      color = clazz.fromObject(value);
    } else {
      color = clazz.fromString(value);
    }
    if (!color) {
      continue;
    }
    return color;
  }  
}
