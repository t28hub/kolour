import Color, {NO_ALPHA} from './color.es6';
import Cmyk from './cmyk.es6';
import Rgb  from './rgb.es6';

const MIN = 0;
const MAX = 1;
const NAME = 'CMY';
const KEYS = Object.freeze({
  C: Symbol.for('c'),
  M: Symbol.for('m'),
  Y: Symbol.for('y'),
  A: Symbol.for('a')
});

/**
 * Class representing a CMY color
 *
 * @extends Color
 */
export default class Cmy extends Color {
  /**
   * Creates a CMY color
   *
   * @param {number} c - The cyan value
   * @param {number} m - The magenta value
   * @param {number} y - The yellow value
   * @param {number} [a] - The alpha value
   */
  constructor(c, m, y, a = NO_ALPHA) {
    super(NAME, [[KEYS.C, c], [KEYS.M, m], [KEYS.Y, y], [KEYS.A, a]]);
  }

  /**
   * Provides an accessor for the cyan value
   *
   * @returns {function()} An accessor for the cyan value
   * @see cyan
   */
  get c() {
    return this.accessor(KEYS.C);
  }

  /**
   * Provides an accessor for the magenta value
   *
   * @returns {function()} An accessor for the magenta value
   * @see magenta
   */
  get m() {
    return this.accessor(KEYS.M);
  }

  /**
   * Provides an accessor for the yellow value
   *
   * @returns {function()} An accessor for the yellow value
   * @see yellow
   */
  get y() {
    return this.accessor(KEYS.Y);
  }

  /**
   * Provides an accessor for the alpha value
   *
   * @returns {function()} An accessor for the alpha value
   * @see alpha
   */
  get a() {
    return this.accessor(KEYS.A);
  }

  /**
   * Provides an accessor for the cyan value
   *
   * @returns {function()} An accessor for the cyan value
   * @see c
   */
  get cyan() {
    return this.accessor(KEYS.C);
  }

  /**
   * Provides an accessor for the magenta value
   *
   * @returns {function()} An accessor for the magenta value
   * @see m
   */
  get magenta() {
    return this.accessor(KEYS.M);
  }

  /**
   * Provides an accessor for the yellow value
   *
   * @returns {function()} An accessor for the yellow value
   * @see y
   */
  get yellow() {
    return this.accessor(KEYS.Y);
  }

  /**
   * Provides an accessor for the alpha value
   *
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
  cmy() {
    //noinspection JSValidateTypes
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
      value = (value - black) / white;
      return Math.max(Math.min(value, Cmyk.MAX), Cmyk.MIN);
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
      return Math.round(Rgb.MAX * (MAX - value));
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