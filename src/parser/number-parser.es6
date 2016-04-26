import Parser from './parser.es6';
import Color from '../color/color.es6';
import Rgb from '../color/rgb.es6';

/**
 * Class which creates color from an object
 * @extends Parser.<number>
 */
export default class NumberParser extends Parser {
  /**
   * Parses the specified number and creates a color
   * @param {number} number - The string to be parsed
   * @returns {Color} - The parsed color
   */
  parse(number) {
    if (!Number.isFinite(number)) {
      return Color.invalid();
    }
    return new Rgb(
      number >> 16 & Rgb.MAX,
      number >> 8 & Rgb.MAX,
      number & Rgb.MAX,
      (number >> 24 & Rgb.MAX) / Rgb.MAX
    );
  }
}
