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
   * @param {number} r  The red component
   * @param {number} g  The green component
   * @param {number} b  The blue component
   * @param {number} [a] The alpha component
   */
  constructor(r, g, b, a = NO_ALPHA) {
    super(NAME, [[KEYS.R, r], [KEYS.G, g], [KEYS.B, b], [KEYS.A, a]]);
  }

  /**
   * Alias method for the {@see Rgb#red}
   * @returns {function()} An accessor for the red component
   */
  get r() {
    return this.accessor(KEYS.R);
  }

  /**
   * Alias method for the {@see Rgb#green}
   * @returns {function()} An accessor for the green component
   */
  get g() {
    return this.accessor(KEYS.G);
  }

  /**
   * Alias method for the {@see Rgb#green}
   * @returns {function()} An accessor for the blue component
   */
  get b() {
    return this.accessor(KEYS.B);
  }

  /**
   * Alias method for the {@see Rgb#alpha}
   * @returns {function()} An accessor for the alpha component
   */
  get a() {
    return this.accessor(KEYS.A);
  }

  /**
   * Returns an accessor for the red component
   * @returns {function()}
   */
  get red() {
    return this.accessor(KEYS.R);
  }

  /**
   * Returns an accessor for the green component
   * @returns {function()}
   */
  get green() {
    return this.accessor(KEYS.G);
  }

  /**
   * Returns an accessor for the blue component
   * @returns {function()}
   */
  get blue() {
    return this.accessor(KEYS.B);
  }

  /**
   * Returns an accessor for the alpha component
   * @returns {function()}
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