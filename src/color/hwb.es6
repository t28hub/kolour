import Color, { NO_ALPHA, NO_VALUE } from './color.es6';
import Hsv from './hsv.es6';
import * as func from '../utils/func.es6';

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
   * Provides an access for the hue value
   * @param {number} [value] - The new value
   * @returns {Hwb|number}
   * @see hue
   */
  h(value = NO_VALUE) {
    return this.access(KEYS.H, value);
  }

  /**
   * Provides an access for the whiteness value
   * @param {number} [value] - The new value
   * @returns {Hwb|number}
   * @see whiteness
   */
  w(value = NO_VALUE) {
    return this.access(KEYS.W, value);
  }

  /**
   * Provides an access for the blackness value
   * @param {number} [value] - The new value
   * @returns {Hwb|number}
   * @see blackness
   */
  b(value = NO_VALUE) {
    return this.access(KEYS.B, value);
  }

  /**
   * Provides an access for the alpha value
   * @param {number} [value] - The new value
   * @returns {Hwb|number}
   * @see alpha
   */
  a(value = NO_VALUE) {
    return this.access(KEYS.A, value);
  }

  /**
   * Provides an access for the hue value
   * @param {number} [value] - The new value
   * @returns {Hwb|number}
   * @see h
   */
  hue(value = NO_VALUE) {
    return this.access(KEYS.H, value);
  }

  /**
   * Provides an access for the whiteness value
   * @param {number} [value] - The new value
   * @returns {Hwb|number}
   * @see w
   */
  whiteness(value = NO_VALUE) {
    return this.access(KEYS.W, value);
  }

  /**
   * Provides an access for the blackness value
   * @param {number} [value] - The new value
   * @returns {Hwb|number}
   * @see b
   */
  blackness(value = NO_VALUE) {
    return this.access(KEYS.B, value);
  }

  /**
   * Provides an access for the alpha value
   * @param {number} [value] - The new value
   * @returns {Hwb|number}
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

    return [
      { min: Number.NEGATIVE_INFINITY, max: Number.POSITIVE_INFINITY, value: this.h() },
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
  hashCode() {
    return this.rgb().hashCode();
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
    const [h, w, b] = [func.normalizedHue(this.h()), this.w(), this.b()];
    let s;
    let v;
    if (w + b >= 1) {
      s = 0;
      v = w / (w + b);
    } else {
      s = 1 - w / (1 - b);
      v = 1 - b;
    }
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
