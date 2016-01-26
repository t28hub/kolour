import Color from './color';
import Cmy   from './cmy';
import Cmyk  from './cmyk';
import Hsl   from './hsl';
import Hsv   from './hsv';
import Rgb   from './rgb';
import Xyz   from './xyz';
import Utils from './utils';

const COLORS = [
  Cmy, Cmyk, Hsl, Hsv, Rgb, Xyz
];

export default function kolor(value) {
  let isObject = Utils.isObject(value);
  let isString = Utils.isString(value);
  if (!isObject && !isString) {
    throw new TypeError(`value(${value}) must be an object or string`);
  }

  if (value instanceof Color) {
    return value.clone();
  }

  for (let clazz of COLORS) {
    let color = null;
    if (isObject) {
      color = clazz.fromObject(value);
    }
    if (isString) {
      color = clazz.fromString(value);
    }
    if (!color) {
      continue;
    }
    return color;
  }  
};
