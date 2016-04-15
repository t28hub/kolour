import {NO_ALPHA} from './color/color.es6';
import Hsv from './color/hsv.es6';
import Rgb from './color/rgb.es6';

function kolour(value) {
}

kolour.VERSION = '1.0.0';

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