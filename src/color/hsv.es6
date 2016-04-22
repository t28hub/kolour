import Color, { NO_ALPHA, NO_VALUE } from './color.es6';
import Hwb from './hwb.es6';
import Rgb from './rgb.es6';

const MIN_H = 0;
const MAX_H = 360;
const MIN_S = 0;
const MAX_S = 1;
const MIN_V = 0;
const MAX_V = 1;

const NAME = 'HSV';
const KEYS = Object.freeze({
  H: Symbol.for('h'),
  S: Symbol.for('s'),
  V: Symbol.for('v'),
  A: Symbol.for('a'),
});

/**
 * Class representing a HSV color
 * @extends Color
 */
export default class Hsv extends Color {
  /**
   * Creates a HSV color
   * @param {number} h - The hue value
   * @param {number} s - The saturation value
   * @param {number} v - The value value
   * @param {number} [a] - The alpha value
   */
  constructor(h, s, v, a = NO_ALPHA) {
    super(NAME, [[KEYS.H, h], [KEYS.S, s], [KEYS.V, v], [KEYS.A, a]]);
  }

  /**
   * Provides an access for the hue value
   * @param {number} [value] - The new value
   * @returns {Hsv|number}
   * @see hue
   */
  h(value = NO_VALUE) {
    return this.hue(value);
  }

  /**
   * Provides an access for the saturation value
   * @param {number} [value] - The new value
   * @returns {Hsv|number}
   * @see saturation
   */
  s(value = NO_VALUE) {
    return this.saturation(value);
  }

  /**
   * Provides an access for the value value
   * @param {number} [value] - The new value
   * @returns {Hsv|number}
   * @see value
   */
  v(value = NO_VALUE) {
    return this.value(value);
  }

  /**
   * Provides an access for the alpha value
   * @param {number} [value] - The new value
   * @returns {Hsv|number}
   * @see alpha
   */
  a(value = NO_VALUE) {
    return this.alpha(value);
  }

  /**
   * Provides an access for the hue value
   * @param {number} [value] - The new value
   * @returns {Hsv|number}
   * @see h
   */
  hue(value = NO_VALUE) {
    return this.access(KEYS.H, value);
  }

  /**
   * Provides an access for the saturation value
   * @param {number} [value] - The new value
   * @returns {Hsv|number}
   * @see s
   */
  saturation(value = NO_VALUE) {
    return this.access(KEYS.S, value);
  }

  /**
   * Provides an access for the value value
   * @param {number} [value] - The new value
   * @returns {Hsv|number}
   * @see v
   */
  value(value = NO_VALUE) {
    return this.access(KEYS.V, value);
  }

  /**
   * Provides an access for the alpha value
   * @param {number} [value] - The new value
   * @returns {Hsv|number}
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
      { min: MIN_H, max: MAX_H, value: this.h() },
      { min: MIN_S, max: MAX_S, value: this.s() },
      { min: MIN_V, max: MAX_V, value: this.v() },
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
  int() {
    return this.rgb().int();
  }

  /**
   * @override
   */
  darken(factor) {
    super.darken(factor);
    let v = this.v() * factor;
    v = Math.min(Math.max(v, MIN_V), MAX_V);
    return new Hsv(this.h(), this.s(), v, this.a());
  }

  /**
   * @override
   */
  lighten(factor) {
    super.lighten(factor);
    let v = this.v() / factor;
    v = Math.min(Math.max(v, MIN_V), MAX_V);
    return new Hsv(this.h(), this.s(), v, this.a());
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
    return this.rgb().hsl();
  }

  /**
   * @override
   */
  hsv() {
    // noinspection JSValidateTypes
    return this.clone();
  }

  /**
   * @override
   */
  hwb() {
    const [h, s, v, a] = [this.h(), this.s(), this.v(), this.a()];
    const w = (1 - s) * v;
    const b = 1 - v;
    return new Hwb(h, w, b, a);
  }

  /**
   * @override
   */
  rgb() {
    const [h, s, v] = [this.h(), this.s(), this.v()];
    const c = v * s;
    const x = c * (1 - Math.abs(h / 60 % 2 - 1));
    const m = v - c;

    let [r, g, b] = [0, 0, 0];
    switch (~~(h / 60)) {
      case 0:
        [r, g, b] = [c, x, 0];
        break;
      case 1:
        [r, g, b] = [x, c, 0];
        break;
      case 2:
        [r, g, b] = [0, c, x];
        break;
      case 3:
        [r, g, b] = [0, x, c];
        break;
      case 4:
        [r, g, b] = [x, 0, c];
        break;
      case 5:
      default:
        [r, g, b] = [c, 0, x];
        break;
    }

    const values = [r, g, b].map((value) => {
      return Math.round(Rgb.MAX * (value + m));
    });
    return new Rgb(...values, this.a());
  }
}
