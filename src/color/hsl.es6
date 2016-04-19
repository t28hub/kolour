import Color, { NO_ALPHA, NO_VALUE } from './color.es6';
import Rgb from './rgb.es6';

const MIN_H = 0;
const MAX_H = 360;
const MIN_S = 0;
const MAX_S = 100;
const MIN_L = 0;
const MAX_L = 100;

const NAME = 'HSL';
const KEYS = Object.freeze({
  H: Symbol.for('h'),
  S: Symbol.for('s'),
  L: Symbol.for('l'),
  A: Symbol.for('a'),
});

/**
 * Class representing a HSL color
 * @extends Color
 */
export default class Hsl extends Color {
  /**
   * Creates a HSL color
   * @param {number} h - The hue value
   * @param {number} s - The saturation value
   * @param {number} l - The lightness value
   * @param {number} [a] - The alpha value
   */
  constructor(h, s, l, a = NO_ALPHA) {
    super(NAME, [[KEYS.H, h], [KEYS.S, s], [KEYS.L, l], [KEYS.A, a]]);
  }

  /**
   * Provides an access for the hue value
   * @param {number} [value] - The new value
   * @returns {Rgb|number}
   * @see hue
   */
  h(value = NO_VALUE) {
    return this.access(KEYS.H, value);
  }

  /**
   * Provides an access for the saturation value
   * @param {number} [value] - The new value
   * @returns {Rgb|number}
   * @see saturation
   */
  s(value = NO_VALUE) {
    return this.access(KEYS.S, value);
  }

  /**
   * Provides an access for the lightness value
   * @param {number} [value] - The new value
   * @returns {Rgb|number}
   * @see lightness
   */
  l(value = NO_VALUE) {
    return this.access(KEYS.L, value);
  }

  /**
   * Provides an access for the alpha value
   * @param {number} [value] - The new value
   * @returns {Rgb|number}
   * @see alpha
   */
  a(value = NO_VALUE) {
    return this.access(KEYS.A, value);
  }

  /**
   * Provides an access for the hue value
   * @param {number} [value] - The new value
   * @returns {Rgb|number}
   * @see h
   */
  hue(value = NO_VALUE) {
    return this.access(KEYS.H, value);
  }

  /**
   * Provides an access for the saturation value
   * @param {number} [value] - The new value
   * @returns {Rgb|number}
   * @see s
   */
  saturation(value = NO_VALUE) {
    return this.access(KEYS.S, value);
  }

  /**
   * Provides an access for the lightness value
   * @param {number} [value] - The new value
   * @returns {Rgb|number}
   * @see l
   */
  lightness(value = NO_VALUE) {
    return this.access(KEYS.L, value);
  }

  /**
   * Provides an access for the alpha value
   * @param {number} [value] - The new value
   * @returns {Rgb|number}
   * @see  a
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

    const [h, s, l] = [this.h(), this.s(), this.l()];
    return [
      { min: MIN_H, max: MAX_H, value: h },
      { min: MIN_S, max: MAX_S, value: s },
      { min: MIN_L, max: MAX_L, value: l },
    ].every(({ min, max, value }) => {
      if (!Number.isFinite(value)) {
        return false;
      }
      return min <= value && value <= max;
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
    const [h, s, l, a] = [this.h(), this.s(), this.l(), this.a()];
    if (this.hasAlpha(KEYS.A)) {
      return `hsla(${h}, ${s * 100}%, ${l * 100}%, ${a})`;
    }
    return `hsla(${h}, ${s * 100}%, ${l * 100}%)`;
  }

  /**
   * @override
   */
  cmy() {
    return this.rgb().cmy();
  }

  /**
   * @override
   */
  cmyk() {
    return this.rgb().cmyk();
  }

  /**
   * @override
   */
  hsl() {
    // noinspection JSValidateTypes
    return this.clone();
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
    const h = this.h();
    const s = this.s() / MAX_S;
    const l = this.l() / MAX_L;
    if (s === MIN_S) {
      const value = Math.round(l * Rgb.MAX);
      return new Rgb(value, value, value, this.alpha());
    }

    let m2;
    if (l < 0.5) {
      m2 = l * (1 + s);
    } else {
      m2 = (l + s) - (s * l);
    }
    const m1 = 2 * l - m2;

    const [r, g, b] = [120, 0, -120].map((degree) => {
      const value = Hsl.hueToRgb(m1, m2, h + degree);
      return Math.round(Rgb.MAX * value);
    });
    return new Rgb(r, g, b, this.alpha());
  }

  /**
   * Converts the hue value to a RGB value
   * @private
   */
  static hueToRgb(m1, m2, h) {
    let hue = h;
    if (hue < MIN_H) {
      hue += MAX_H;
    }
    if (hue > MAX_H) {
      hue -= MAX_H;
    }
    hue /= MAX_H;

    if (6 * hue < 1) {
      return m1 + (m2 - m1) * 6 * hue;
    }
    if (2 * hue < 1) {
      return m2;
    }
    if (3 * hue < 2) {
      return m1 + (m2 - m1) * (2 / 3 - hue) * 6;
    }
    return m1;
  }

  /**
   * @returns {number}
   */
  static get MIN_H() {
    return MIN_H;
  }

  /**
   * @returns {number}
   */
  static get MAX_H() {
    return MAX_H;
  }

  /**
   * @returns {number}
   */
  static get MIN_S() {
    return MIN_S;
  }

  /**
   * @returns {number}
   */
  static get MAX_S() {
    return MAX_S;
  }

  /**
   * @returns {number}
   */
  static get MAX_L() {
    return MAX_L;
  }
}
