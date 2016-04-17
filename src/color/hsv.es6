import Color, { NO_ALPHA } from './color.es6';
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
   * Provides an accessor for the hue value
   * @returns {function()} An accessor for the hue value
   * @see hue
   */
  get h() {
    return this.accessor(KEYS.H);
  }

  /**
   * Provides an accessor for the saturation value
   * @returns {function()} An accessor for the saturation value
   * @see saturation
   */
  get s() {
    return this.accessor(KEYS.S);
  }

  /**
   * Provides an accessor for the value value
   * @returns {function()} An accessor for the value value
   * @see value
   */
  get v() {
    return this.accessor(KEYS.V);
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
   * Provides an accessor for the saturation value
   * @returns {function()} An accessor for the saturation value
   * @see s
   */
  get saturation() {
    return this.accessor(KEYS.S);
  }

  /**
   * Provides an accessor for the value value
   * @returns {function()} An accessor for the value value
   * @see v
   */
  get value() {
    return this.accessor(KEYS.V);
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
