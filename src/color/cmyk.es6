import Color, { NO_ALPHA, NO_VALUE } from './color.es6';
import Cmy from './cmy.es6';
import Rgb from './rgb.es6';

const MIN = 0;
const MAX = 1;
const NAME = 'CMYK';
const KEYS = Object.freeze({
  C: Symbol.for('c'),
  M: Symbol.for('m'),
  Y: Symbol.for('y'),
  K: Symbol.for('k'),
  A: Symbol.for('a'),
});

/**
 * Class representing a CMYK color
 * @extends Color
 */
export default class Cmyk extends Color {
  /**
   * Creates a CMYK color
   * @param {number} c - The cyan value
   * @param {number} m - The magenta value
   * @param {number} y - The yellow value
   * @param {number} k - The black value
   * @param {number} [a] - The alpha value
   */
  constructor(c, m, y, k, a = NO_ALPHA) {
    super(NAME, [[KEYS.C, c], [KEYS.M, m], [KEYS.Y, y], [KEYS.K, k], [KEYS.A, a]]);
  }

  /**
   * Provides an access for the cyan value
   * @param {number} [value] - The new value
   * @returns {Cmyk|number}
   * @see cyan
   */
  c(value = NO_VALUE) {
    return this.cyan(value);
  }

  /**
   * Provides an access for the magenta value
   * @param {number} [value] - The new value
   * @returns {Cmyk|number}
   * @see magenta
   */
  m(value = NO_VALUE) {
    return this.magenta(value);
  }

  /**
   * Provides an access for the yellow value
   * @param {number} [value] - The new value
   * @returns {Cmyk|number}
   * @see yellow
   */
  y(value = NO_VALUE) {
    return this.yellow(value);
  }

  /**
   * Provides an access for the black value
   * @param {number} [value] - The new value
   * @returns {Cmyk|number}
   * @see black
   */
  k(value = NO_VALUE) {
    return this.black(value);
  }

  /**
   * Provides an access for the alpha value
   * @param {number} [value] - The new value
   * @returns {Cmyk|number}
   * @see alpha
   */
  a(value = NO_VALUE) {
    return this.alpha(value);
  }

  /**
   * Provides an access for the cyan value
   * @param {number} [value] - The new value
   * @returns {Cmyk|number}
   * @see c
   */
  cyan(value = NO_VALUE) {
    return this.access(KEYS.C, value);
  }

  /**
   * Provides an access for the magenta value
   * @param {number} [value] - The new value
   * @returns {Cmyk|number}
   * @see m
   */
  magenta(value = NO_VALUE) {
    return this.access(KEYS.M, value);
  }

  /**
   * Provides an access for the yellow value
   * @param {number} [value] - The new value
   * @returns {Cmyk|number}
   * @see y
   */
  yellow(value = NO_VALUE) {
    return this.access(KEYS.Y, value);
  }

  /**
   * Provides an access for the black value
   * @param {number} [value] - The new value
   * @returns {Cmyk|number}
   * @see k
   */
  black(value = NO_VALUE) {
    return this.access(KEYS.K, value);
  }

  /**
   * Provides an access for the alpha value
   * @param {number} [value] - The new value
   * @returns {Cmyk|number}
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

    return [this.c(), this.m(), this.y(), this.k()].every((value) => {
      if (!Number.isFinite(value)) {
        return false;
      }
      return MIN <= value && value <= MAX;
    });
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
  css() {
    const [c, m, y, k, a] = [this.c(), this.m(), this.y(), this.k(), this.a()];
    if (a === NO_ALPHA) {
      return `device-cmyk(${c * 100}%, ${m * 100}%, ${y * 100}%, ${k * 100}%)`;
    }
    return `device-cmyk(${c * 100}%, ${m * 100}%, ${y * 100}%, ${k * 100}%, ${a * 100}%)`;
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
  cmy() {
    const black = this.k();
    const white = MAX - black;
    const values = [this.c(), this.m(), this.y()].map((value) => {
      const newValue = value * white + black;
      return Math.max(Math.min(newValue, Cmy.MAX), Cmy.MIN);
    });
    return new Cmy(...values, this.a());
  }

  /**
   * @override
   */
  cmyk() {
    // noinspection JSValidateTypes
    return this.clone();
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
    const white = MAX - this.k();
    const values = [this.c(), this.m(), this.y()].map((value) => {
      const newValue = Rgb.MAX * (MAX - value) * white;
      return Math.round(newValue);
    });
    return new Rgb(...values, this.a());
  }

  /**
   * @return {number}
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
