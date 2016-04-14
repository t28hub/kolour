import Color, {NO_ALPHA} from './color.es6';

const MIN = 0x00;
const MAX = 0xFF;
const NAME = 'RGB';
const KEYS = Object.freeze({
  R: Symbol.for('r'),
  G: Symbol.for('g'),
  B: Symbol.for('b'),
  A: Symbol.for('a')
});

/**
 * Class representing a RGB color
 *
 * @extends Color
 */
export default class Rgb extends Color {
  /**
   * Creates a RGB color
   *
   * @param {number} r - The red value
   * @param {number} g - The green value
   * @param {number} b - The blue value
   * @param {number} [a] - The alpha value
   */
  constructor(r, g, b, a = NO_ALPHA) {
    super(NAME, [[KEYS.R, r], [KEYS.G, g], [KEYS.B, b], [KEYS.A, a]]);
  }

  /**
   * Provides an accessor for the red value
   *
   * @returns {function()} An accessor for the red value
   * @see red
   */
  get r() {
    return this.accessor(KEYS.R);
  }

  /**
   * Provides an accessor for the green value
   *
   * @returns {function()} An accessor for the green value
   * @see green
   */
  get g() {
    return this.accessor(KEYS.G);
  }

  /**
   * Provides an accessor for the blue value
   *
   * @returns {function()} An accessor for the blue value
   * @see blue
   */
  get b() {
    return this.accessor(KEYS.B);
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
   * Provides an accessor for the red value
   * 
   * @returns {function()} An accessor for the red value
   * @see r
   */
  get red() {
    return this.accessor(KEYS.R);
  }

  /**
   * Provides an accessor for the green value
   *
   * @returns {function()} An accessor for the green value
   * @see g
   */
  get green() {
    return this.accessor(KEYS.G);
  }

  /**
   * Provides an accessor for the blue value
   *
   * @returns {function()} An accessor for the blue value
   * @see b
   */
  get blue() {
    return this.accessor(KEYS.B);
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

    const [r, g, b] = [this.r(), this.g(), this.b()];
    return [r, g, b].every((value) => {
      if (!Number.isInteger(value)) {
        return false;
      }
      return MIN <= value && value <= MAX;
    });
  }

  /**
   * @override
   */
  css() {
    const [r, g, b, a] = [this.r(), this.g(), this.b(), this.a()];
    if (this.hasAlpha(KEYS.A)) {
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  }

  /**
   * @override
   */
  darken(factor) {
    super.darken(factor);
    const [r, g, b, a] = [this.r(), this.g(), this.b(), this.a()];
    const values = [r, g, b].map((value) => {
      value *= factor;
      value = Math.round(value);
      return Math.max(Math.min(value, MAX), MIN);
    });
    return new Rgb(...values, a);
  }

  /**
   * @override
   */
  lighten(factor) {
    super.lighten(factor);
    const [r, g, b, a] = [this.r(), this.g(), this.b(), this.a()];
    const values = [r, g, b].map((value) => {
      value /= factor;
      value = Math.round(value);
      return Math.max(Math.min(value, MAX), MIN);
    });
    return new Rgb(...values, a);
  }

  /**
   * @override
   */
  rgb() {
    //noinspection JSValidateTypes
    return this.clone();
  }

  /**
   * @return {number}
   */
  static get MIN() {
    return MIN;
  }

  /**
   * @return {number}
   */
  static get MAX() {
    return MAX;
  }
}