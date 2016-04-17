import Color, { NO_ALPHA } from './color.es6';
import Hsv from './hsv.es6';

const MIN_H = 0;
const MAX_H = 360;
const MIN_W = 0;
const MAX_W = 1;
const MIN_B = 0;
const MAX_B = 1;

const NAME = 'HWB';
const KEYS = Object.freeze({
  H: Symbol.for('h'),
  W: Symbol.for('w'),
  B: Symbol.for('b'),
  A: Symbol.for('a'),
});

/**
 * Class representing a HSB color
 * @extends Color
 */
export default class Hwb extends Color {
  /**
   * Creates a HWB color
   * @param {number} h - The hue value
   * @param {number} w - The whiteness value
   * @param {number} b - The blackness value
   * @param {number} [a] - The alpha value
   */
  constructor(h, w, b, a = NO_ALPHA) {
    super(NAME, [[KEYS.H, h], [KEYS.W, w], [KEYS.B, b], [KEYS.A, a]]);
  }

  /**
   * Provides an accessor for the hue value
   * @returns {function()} An accessor for the hue value
   * @see hue
   */
  get h() {
    return this.accessor(KEYS.H);
  }

  /**
   * Provides an accessor for the whiteness value
   * @returns {function()} An accessor for the whiteness value
   * @see whiteness
   */
  get w() {
    return this.accessor(KEYS.W);
  }

  /**
   * Provides an accessor for the blackness value
   * @returns {function()} An accessor for the blackness value
   * @see blackness
   */
  get b() {
    return this.accessor(KEYS.B);
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
   * Provides an accessor for the hue value
   * @returns {function()} An accessor for the hue value
   * @see h
   */
  get hue() {
    return this.accessor(KEYS.H);
  }

  /**
   * Provides an accessor for the whiteness value
   * @returns {function()} An accessor for the whiteness value
   * @see w
   */
  get whiteness() {
    return this.accessor(KEYS.W);
  }

  /**
   * Provides an accessor for the blackness value
   * @returns {function()} An accessor for the blackness value
   * @see b
   */
  get blackness() {
    return this.accessor(KEYS.B);
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

    return [
      { min: MIN_H, max: MAX_H, value: this.h() },
      { min: MIN_W, max: MAX_W, value: this.w() },
      { min: MIN_B, max: MAX_B, value: this.b() },
    ].every((object) => {
      const { min, max, value } = object;
      if (!Number.isFinite(value)) {
        return false;
      }
      return min <= value && value <= max;
    });
  }

  /**
   * @override
   */
  css() {
    const [h, w, b, a] = [this.h(), this.w(), this.b(), this.a()];
    if (a === NO_ALPHA) {
      return `hwb(${h}, ${w * 100}%, ${b * 100}%)`;
    }
    return `hwb(${h}, ${w * 100}%, ${b * 100}%, ${a})`;
  }

  /**
   * @override
   */
  cmy() {
    return this.hsv().cmy();
  }

  /**
   * @override
   */
  cmyk() {
    return this.hsv().cmyk();
  }

  /**
   * @override
   */
  hsl() {
    return this.hsv().hsl();
  }

  /**
   * @override
   */
  hsv() {
    const [h, w, b] = [this.h(), this.w(), this.b()];
    const s = 1 - w / (1 - b);
    const v = 1 - b;
    return new Hsv(h, s, v, this.a());
  }

  /**
   * @override
   */
  hwb() {
    // noinspection JSValidateTypes
    return this.clone();
  }

  /**
   * @override
   */
  rgb() {
    return this.hsv().rgb();
  }
}
