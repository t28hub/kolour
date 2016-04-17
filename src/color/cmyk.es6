import Color, { NO_ALPHA } from './color.es6';
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
   * Provides an accessor for the cyan value
   * @returns {function()} An accessor for the cyan value
   * @see cyan
   */
  get c() {
    return this.accessor(KEYS.C);
  }

  /**
   * Provides an accessor for the magenta value
   * @returns {function()} An accessor for the magenta value
   * @see magenta
   */
  get m() {
    return this.accessor(KEYS.M);
  }

  /**
   * Provides an accessor for the yellow value
   * @returns {function()} An accessor for the yellow value
   * @see yellow
   */
  get y() {
    return this.accessor(KEYS.Y);
  }

  /**
   * Provides an accessor for the black value
   * @returns {function()} An accessor for the black value
   * @see black
   */
  get k() {
    return this.accessor(KEYS.K);
  }

  /**
   * Provides an accessor for the alpha value
   * @returns {function()} An accessor for the alpha value
   * @see alpha
   */
  get a() {
    return this.accessor(KEYS.A);
  }

  /**
   * Provides an accessor for the cyan value
   * @returns {function()} An accessor for the cyan value
   * @see c
   */
  get cyan() {
    return this.accessor(KEYS.C);
  }

  /**
   * Provides an accessor for the magenta value
   * @returns {function()} An accessor for the magenta value
   * @see m
   */
  get magenta() {
    return this.accessor(KEYS.M);
  }

  /**
   * Provides an accessor for the yellow value
   * @returns {function()} An accessor for the yellow value
   * @see y
   */
  get yellow() {
    return this.accessor(KEYS.Y);
  }

  /**
   * Provides an accessor for the black value
   * @returns {function()} An accessor for the black value
   * @see k
   */
  get black() {
    return this.accessor(KEYS.K);
  }

  /**
   * Provides an accessor for the alpha value
   * @returns {function()} An accessor for the alpha value
   * @see a
   */
  get alpha() {
    return this.accessor(KEYS.A);
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
  css() {
    const [c, m, y, k, a] = [this.c(), this.m(), this.y(), this.k(), this.a()];
    if (a === NO_ALPHA) {
      return `device-cmyk(${c * 100}%, ${m * 100}%, ${y * 100}%, ${k * 100}%)`;
    }
    return `device-cmyk(${c * 100}%, ${m * 100}%, ${y * 100}%, ${k * 100}%, a)`;
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
