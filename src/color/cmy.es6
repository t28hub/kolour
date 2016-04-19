import Color, { NO_ALPHA, NO_VALUE } from './color.es6';
import Cmyk from './cmyk.es6';
import Rgb from './rgb.es6';

const MIN = 0;
const MAX = 1;
const NAME = 'CMY';
const KEYS = Object.freeze({
  C: Symbol.for('c'),
  M: Symbol.for('m'),
  Y: Symbol.for('y'),
  A: Symbol.for('a'),
});

/**
 * Class representing a CMY color
 * @extends Color
 */
export default class Cmy extends Color {
  /**
   * Creates a CMY color
   * @param {number} c - The cyan value
   * @param {number} m - The magenta value
   * @param {number} y - The yellow value
   * @param {number} [a] - The alpha value
   */
  constructor(c, m, y, a = NO_ALPHA) {
    super(NAME, [[KEYS.C, c], [KEYS.M, m], [KEYS.Y, y], [KEYS.A, a]]);
  }

  /**
   * Provides an access for the cyan value
   * @param {number} [value] - The new value
   * @returns {Cmy|number}
   * @see cyan
   */
  c(value = NO_VALUE) {
    return this.access(KEYS.C, value);
  }

  /**
   * Provides an access for the magenta value
   * @param {number} [value] - The new value
   * @returns {Cmy|number}
   * @see magenta
   */
  m(value = NO_VALUE) {
    return this.access(KEYS.M, value);
  }

  /**
   * Provides an access for the yellow value
   * @param {number} [value] - The new value
   * @returns {Cmy|number}
   * @see yellow
   */
  y(value = NO_VALUE) {
    return this.access(KEYS.Y, value);
  }

  /**
   * Provides an access for the alpha value
   * @param {number} [value] - The new value
   * @returns {Cmy|number}
   * @see alpha
   */
  a(value = NO_VALUE) {
    return this.access(KEYS.A, value);
  }

  /**
   * Provides an access for the cyan value
   * @param {number} [value] - The new value
   * @returns {Cmy|number}
   * @see c
   */
  cyan(value = NO_VALUE) {
    return this.access(KEYS.C, value);
  }

  /**
   * Provides an access for the magenta value
   * @param {number} [value] - The new value
   * @returns {Cmy|number}
   * @see m
   */
  magenta(value = NO_VALUE) {
    return this.access(KEYS.M, value);
  }

  /**
   * Provides an access for the yellow value
   * @param {number} [value] - The new value
   * @returns {Cmy|number}
   * @see y
   */
  yellow(value = NO_VALUE) {
    return this.access(KEYS.Y, value);
  }

  /**
   * Provides an access for the alpha value
   * @param {number} [value] - The new value
   * @returns {Cmy|number}
   * @see a
   */
  alpha(value = NO_VALUE) {
    return this.access(KEYS.A, value);
  }

  /**
   * @override
   */
  isValid() {
    if (this.hasAlpha(KEYS.A) && !this.isValidAlpha(KEYS.A)) {
      return false;
    }

    return [this.c(), this.m(), this.y()].every((value) => {
      if (!Number.isFinite(value)) {
        return false;
      }
      return MIN <= value && value <= MAX;
    });
  }

  /**
   * @override
   */
  darken(factor) {
    return this.rgb().darken(factor).cmy();
  }

  /**
   * @override
   */
  lighten(factor) {
    return this.rgb().lighten(factor).cmy();
  }

  /**
   * @override
   */
  int() {
    return this.rgb().int();
  }

  /**
   * @override
   */
  cmy() {
    // noinspection JSValidateTypes
    return this.clone();
  }

  /**
   * @override
   */
  cmyk() {
    const [c, m, y, a] = [this.c(), this.m(), this.y(), this.a()];
    const black = [c, m, y].reduce((previous, value) => {
      if (value < previous) {
        return value;
      }
      return previous;
    }, Cmyk.MAX);

    if (black === Cmyk.MAX) {
      return new Cmyk(Cmyk.MIN, Cmyk.MIN, Cmyk.MIN, black, a);
    }

    const white = Cmyk.MAX - black;
    const values = [c, m, y].map((value) => {
      const newValue = (value - black) / white;
      return Math.max(Math.min(newValue, Cmyk.MAX), Cmyk.MIN);
    });
    return new Cmyk(...values, black, a);
  }

  /**
   * @override
   */
  hsl() {
    return this.rgb().hsl();
  }

  /**
   * @override
   */
  hsv() {
    return this.rgb().hsv();
  }

  /**
   * @override
   */
  hwb() {
    return this.rgb().hwb();
  }

  /**
   * @override
   */
  rgb() {
    const [c, m, y, a] = [this.c(), this.m(), this.y(), this.a()];
    const [r, g, b] = [c, m, y].map((value) => {
      const newValue = Rgb.MAX * (MAX - value);
      return Math.round(newValue);
    });
    return new Rgb(r, g, b, a);
  }

  /**
   * @returns {number}
   */
  static get MIN() {
    return MIN;
  }

  /**
   * @returns {number}
   */
  static get MAX() {
    return MAX;
  }
}
