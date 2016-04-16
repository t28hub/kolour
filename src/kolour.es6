import Color, {NO_ALPHA} from './color/color.es6';
import Cmy  from './color/cmy.es6';
import Cmyk from './color/cmyk.es6';
import Hsl  from './color/hsl.es6';
import Hsv  from './color/hsv.es6';
import Hwb  from './color/hwb.es6';
import Rgb  from './color/rgb.es6';
import StringParser from './parser/string-parser.es6';
import isObject from './utils/is-object.es6';
import isString from './utils/is-string.es6';

/**
 * Creates a color
 *
 * @param {*} value - The value to convert a color
 * @returns {Color} A color
 */
function kolour(value) {
  if (isObject(value)) {
    
  }
  if (isString(value)) {
    return StringParser.defaults().parse(value);
  }

  if (value instanceof Color) {
    return value.clone();
  }
  return Color.invalid();
}

/**
 * Version of kolour
 *
 * @constant
 * @type {string}
 * @default
 */
kolour.VERSION = '1.0.0';

/**
 * Creates a CMY color from values
 *
 * @param {number} c - The cyan value
 * @param {number} m - The magenta value
 * @param {number} y - The yellow value
 * @param {number} [a] - The alpha value
 * @returns {Cmy} A CMY color
 */
kolour.cmy = (c, m, y, a = NO_ALPHA) => {
  return new Cmy(c, m, y, a);
};

/**
 * Creates a CMYK color
 *
 * @param {number} c - The cyan value
 * @param {number} m - The magenta value
 * @param {number} y - The yellow value
 * @param {number} k - The black value
 * @param {number} [a] - The alpha value
 * @returns {Cmyk} A CMYK color
 */
kolour.cmyk = (c, m, y, k, a = NO_ALPHA) => {
  return new Cmyk(c, m, y, k, a);
};

/**
 * Creates a HSL color from values
 *
 * @param {number} h - The hue value
 * @param {number} s - The saturation value
 * @param {number} l - The lightness value
 * @param {number} [a] - The alpha value
 * @returns {Hsl} A HSL color
 */
kolour.hsl = (h, s, l, a = NO_ALPHA) => {
  return new Hsl(h, s, l, a);
};

/**
 * Creates a HSV color from values
 *
 * @param {number} h - The hue value
 * @param {number} s - The saturation value
 * @param {number} v - The value value
 * @param {number} [a] - The alpha value
 * @returns {Hsv} A HSV color
 */
kolour.hsv = (h, s, v, a = NO_ALPHA) => {
  return new Hsv(h, s, v, a);
};

/**
 * Creates a HWB color from values
 *
 * @param {number} h - The hue value
 * @param {number} w - The whiteness value
 * @param {number} b - The blackness value
 * @param {number} [a] - The alpha value
 */
kolour.hwb = (h, w, b, a = NO_ALPHA) => {
  return new Hwb(h, w, b, a);
};

/**
 * Creates a RGB color from values
 *
 * @param {number} r - The red value
 * @param {number} g - The green value
 * @param {number} b - The blue value
 * @param {number} [a] - The alpha value
 * @returns {Rgb} A Rgb color
 */
kolour.rgb = (r, g, b, a = NO_ALPHA) => {
  return new Rgb(r, g, b, a);
};

export default kolour;