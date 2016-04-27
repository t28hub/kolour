import * as math from '../utils/math.es6';

export const NO_NAME = 'NULL';
export const NO_VALUE = Number.POSITIVE_INFINITY;
export const NO_ALPHA = Number.POSITIVE_INFINITY;
export const MIN_ALPHA = 0;
export const MAX_ALPHA = 1;
export const DEFAULT_AMOUNT = 0.5;

/**
 * Class representing a Color
 */
export default class Color {
  /**
   * Creates a color with name and components
   * @protected
   * @param {string} name - The name of color space
   * @param {Iterable} components - The color components
   */
  constructor(name, components) {
    this.name = name;
    this.components = new Map(components);
  }

  /**
   * Provides accessor of the alpha value
   * @public
   * @abstract
   * @param {number} value - The new alpha value
   * @returns {Color|number} Either self or value of alpha
   * @see alpha
   */
  a(value = NO_ALPHA) {
  }

  /**
   * Provides accessor of the alpha value
   * @public
   * @abstract
   * @param {number} value - The new alpha value
   * @returns {Color|number} Either self or value of alpha
   * @see a
   */
  alpha(value = NO_ALPHA) {
  }

  /**
   * Returns a string representing an instance
   * @public
   * @returns {string} Representation of an instance
   */
  toString() {
    const object = Object.create(null);
    object.name = this.name;
    object.components = Array.from(this.components.entries())
      .reduce((previous, entry) => {
        const key = entry[0];
        const value = entry[1];

        const current = Object.create(null);
        current[Symbol.keyFor(key)] = value;

        return Object.assign(previous, current);
      }, Object.create(null));
    return JSON.stringify(object);
  }

  /**
   * Checks whether a property exists in the components or not
   * @protected
   * @param {Symbol} property - Key of property
   * @returns {boolean} <em>true</em> if the components has a specified property as a key.
   */
  has(property) {
    return this.components.has(property);
  }

  /**
   * Returns a value which is mapped to a specified property.
   * @protected
   * @param {Symbol} property - Key of property
   * @returns {number} A color value
   * @throws {TypeError} Argument property must exist in the component as a key.
   */
  get(property) {
    if (!this.has(property)) {
      const keys = Array.from(this.components).join(',');
      throw new TypeError(`Specified property does not exist in a component:${keys}`);
    }
    return this.components.get(property);
  }

  /**
   * Sets a value to a specified property
   * @protected
   * @param {Symbol} property - Key of property
   * @param {number} value - A color value
   * @returns {Color} Instance of self
   * @throws {TypeError} Argument property must exist in the components as a key.
   * @throws {TypeError} Argument value must be a finite number.
   */
  set(property, value) {
    if (!this.has(property)) {
      const keys = Array.from(this.components).join(',');
      throw new TypeError(`Specified property does not exist in a component:${keys}`);
    }
    if (!Number.isFinite(value)) {
      throw new TypeError('Specified value must be a finite number');
    }
    this.components.set(property, value);
    return this;
  }

  /**
   * Accesses the specified property
   * @protected
   * @param {Symbol} property - The property
   * @param {number} [value] - The new value of the specified key
   * @returns {Color|number} Either value of the specified key or self
   */
  access(property, value = NO_VALUE) {
    if (!Number.isFinite(value)) {
      return this.get(property);
    }
    return this.set(property, value);
  }

  /**
   * Clones an instance
   * @public
   * @returns {Color} A cloned instance
   */
  clone() {
    const cloned = new this.constructor();
    cloned.name = this.name;
    cloned.components = new Map(this.components);
    return cloned;
  }

  /**
   * Compares this instance with a specified value
   * @param {*} value - Any types of value
   * @returns {boolean} <em>true</em> if this instance is same as the value argument.
   */
  equals(value) {
    if (!(value instanceof Color)) {
      return false;
    }
    return this.hashCode() === value.hashCode();
  }

  /**
   * Checks whether the instance is valid or invalid.
   * @public
   * @returns {boolean} <em>true</em> if the instance is valid
   */
  isValid() {
    return false;
  }

  /**
   * Returns a hash code of the color
   * @public
   * @returns {number} A hass code
   */
  hashCode() {
    return NaN;
  }

  /**
   * Increases the saturation by a specified amount
   * @public
   * @param {number} amount - The percentage 0..1
   * @returns {Color} A saturated color
   * @see desaturate
   */
  saturate(amount) {
    const hsl = this.hsl();
    const saturation = (hsl.s() / 100 + amount) * 100;
    hsl.s(math.clamp(saturation, 0, 100));
    return hsl[this.name.toLowerCase()]();
  }

  /**
   * Decreases the saturation by a specified amount
   * @public
   * @param {number} amount - The percentage 0..1
   * @returns {Color} A desaturated color
   * @see saturate
   */
  desaturate(amount) {
    const hsl = this.hsl();
    const saturation = (hsl.s() / 100 - amount) * 100;
    hsl.s(math.clamp(saturation, 0, 100));
    return hsl[this.name.toLowerCase()]();
  }

  /**
   * Converts to grayscale
   * @public
   * @returns {Color} A grayscale color
   */
  grayscale() {
    return this.desaturate(1);
  }

  /**
   * Increases the luminance by a specified amount
   * @public
   * @param {number} amount - The percentage 0..1
   * @returns {Color} A lighten color
   * @see darken
   */
  lighten(amount) {
    const hsl = this.hsl();
    const luminance = (hsl.l() / 100 + amount) * 100;
    hsl.l(math.clamp(luminance, 0, 100));
    return hsl[this.name.toLowerCase()]();
  }

  /**
   * Decreases the luminance by a specified amount
   * @public
   * @param {number} amount - The percentage 0..1
   * @returns {Color} A darken color
   * @see lighten
   */
  darken(amount) {
    const hsl = this.hsl();
    const luminance = (hsl.l() / 100 - amount) * 100;
    hsl.l(math.clamp(luminance, 0, 100));
    return hsl[this.name.toLowerCase()]();
  }

  /**
   * Increases the whiteness by a specified amount
   * @public
   * @param {number} [amount] - The percentage 0..1
   * @returns {Color} A whiten color
   * @see blacken
   */
  whiten(amount = DEFAULT_AMOUNT) {
    const hwb = this.hwb();
    const whiteness = hwb.w() + amount;
    hwb.w(math.clamp(whiteness));
    return hwb[this.name.toLowerCase()]();
  }

  /**
   * Increases the blackness by a specified amount
   * @public
   * @param {number} [amount] - The percentage 0..1
   * @returns {Color} A blacken color
   * @see whiten
   */
  blacken(amount = DEFAULT_AMOUNT) {
    const hwb = this.hwb();
    const blackness = hwb.b() + amount;
    hwb.b(math.clamp(blackness));
    return hwb[this.name.toLowerCase()]();
  }

  /**
   * Create a inverted color
   * @public
   * @returns {Color} A inverted color
   * @see negate
   */
  invert() {
    const rgb = this.rgb();
    const [r, g, b] = [rgb.r(), rgb.g(), rgb.b()].map((value) => {
      return 0xFF - value;
    });
    rgb.r(r).g(g).b(b);
    return rgb[this.name.toLowerCase()]();
  }

  /**
   * Creates a negative color
   * @public
   * @returns {Color} A negative color
   * @see invert
   */
  negate() {
    return this.invert();
  }

  /**
   * Creates a rotated color
   * @public
   * @param degree - The degree
   * @returns {Color} A rotated color
   * @see spin
   */
  rotate(degree) {
    const hsl = this.hsl();
    let hue = (hsl.h() + degree) % 360;
    if (hue < 360) {
      hue += 360;
    }
    hsl.h(hue);
    return hsl[this.name.toLowerCase()]();
  }

  /**
   * Creates a rotated color
   * @public
   * @param degree - The degree
   * @returns {Color} A rotated color
   * @see rotate
   */
  spin(degree) {
    return this.rotate(degree);
  }

  /**
   * Creates a complementary color
   * @public
   * @returns {Color} A complementary color
   */
  complement() {
    return this.rotate(180);
  }

  /**
   * Increases the alpha by a specified amount
   * @public
   * @param amount - The percentage 0..1
   * @returns {Color} A color
   * @see fadeout
   */
  fadein(amount) {
    const oldAlpha = this.getAlphaOrDefault();
    const newAlpha = math.clamp(oldAlpha + amount);
    const cloned = this.clone();
    cloned.a(newAlpha);
    return cloned;
  }

  /**
   * Decreases the alpha by a specified amount
   * @public
   * @param amount - The percentage 0..1
   * @returns {Color} A color
   * @see fadein
   */
  fadeout(amount) {
    const oldAlpha = this.getAlphaOrDefault();
    const newAlpha = math.clamp(oldAlpha - amount);
    const cloned = this.clone();
    cloned.a(newAlpha);
    return cloned;
  }

  /**
   * Mixes a color
   * @public
   * @param {Color} color - The color to be mixed
   * @param {number} [amount] - The relative weight of each color
   * @returns {Color} A mixed color
   */
  mix(color, amount = DEFAULT_AMOUNT) {
    const rgb1 = this.rgb();
    const rgb2 = color.rgb();

    const weight1 = 1 - amount;
    const weight2 = amount;
    const values1 = [rgb1.r(), rgb1.g(), rgb1.b()];
    const values2 = [rgb2.r(), rgb2.g(), rgb2.b()];
    const [r, g, b] = values1.map((value1, index) => {
      const value2 = values2[index];
      const value = Math.round(value1 * weight1 + value2 * weight2);
      return math.clamp(value, 0x00, 0xFF);
    });

    const alpha1 = rgb1.getAlphaOrDefault();
    const alpha2 = rgb2.getAlphaOrDefault();
    const newAlpha = alpha1 * weight1 + alpha2 * weight2;
    const mixed = rgb1.r(r).g(g).b(b).a(newAlpha);
    return mixed[this.name.toLowerCase()]();
  }

  /**
   * Mixes with white by a specified amount
   * @public
   * @param {number} [amount] - The percentage 0..1
   * @returns {Color} A mixed color
   * @see shade
   */
  tint(amount = DEFAULT_AMOUNT) {
    const white = this.rgb().r(0xFF).g(0xFF).b(0xFF);
    return this.mix(white, amount);
  }

  /**
   * Mixes with black by a specified amount
   * @public
   * @param {number} [amount] - The percentage 0..1
   * @returns {Color} A mixed color
   * @see tint
   */
  shade(amount = DEFAULT_AMOUNT) {
    const black = this.rgb().r(0x00).g(0x00).b(0x00);
    return this.mix(black, amount);
  }

  /**
   * Converts color to a hex string
   * @public
   * @returns {string} A hex string
   */
  hex() {
    const rgb = this.rgb();
    const values = [rgb.r(), rgb.g(), rgb.b()].map((value) => {
      const string = value.toString(16);
      if (string.length === 1) {
        return `0${string.toUpperCase()}`;
      }
      return string.toLowerCase();
    });
    return `#${values.join('')}`.toUpperCase();
  }

  /**
   * Converts color to a css string
   * @public
   * @returns {string} A css string
   */
  css() {
    return '';
  }

  /**
   * Converts color space to CMY
   * @abstract
   * @public
   * @returns {Cmy} A CMY color
   */
  cmy() {
    throw new Error('This method must be implemented by a child class');
  }

  /**
   * Converts color space to CMYK
   * @abstract
   * @public
   * @returns {Cmyk} A CMYK color
   */
  cmyk() {
    throw new Error('This method must be implemented by a child class');
  }

  /**
   * Converts color space to HSL
   * @abstract
   * @public
   * @returns {Hsl} A HSL color
   */
  hsl() {
    throw new Error('This method must be implemented by a child class');
  }

  /**
   * Converts color space to HSV
   * @abstract
   * @public
   * @returns {Hsv} A HSV color
   */
  hsv() {
    throw new Error('This method must be implemented by a child class');
  }

  /**
   * Converts color space to HWB
   * @abstract
   * @public
   * @returns {Hwb} A HWB color
   */
  hwb() {
    throw new Error('This method must be implemented by a child class');
  }

  /**
   * Converts color space to RGB
   * @abstract
   * @public
   * @returns {Rgb} A converted RGB color
   */
  rgb() {
    throw new Error('This method must be implemented by a child class');
  }

  /**
   * Checks whether the alpha value is set or not
   * @protected
   * @param {Symbol} key - The key of alpha value
   * @returns {boolean} <em>true</em> if the alpha value is set
   * @see isValidAlpha
   */
  hasAlpha(key) {
    const value = this.components.get(key);
    return value !== NO_ALPHA;
  }

  /**
   * Checks whether the alpha value is set or not
   * @protected
   * @param {Symbol} key - The key of alpha value
   * @returns {boolean} <em>true</em> if the alpha value is valid
   * @see hasAlpha
   */
  isValidAlpha(key) {
    const value = this.components.get(key);
    return MIN_ALPHA <= value && value <= MAX_ALPHA;
  }

  /**
   * Returns the alpha value or default value
   * @private
   * @param {number} defaultAlpha - The default alpha value
   * @returns {number} - The alpha value
   */
  getAlphaOrDefault(defaultAlpha = 1) {
    const alpha = this.alpha();
    if (alpha === NO_ALPHA) {
      return defaultAlpha;
    }
    return alpha;
  }

  /**
   * Creates an invalid instance
   * @public
   * @static
   * @returns {Color} An invalid color
   */
  static invalid() {
    // noinspection JSValidateTypes
    return new class extends Color {
      constructor() {
        super(NO_NAME, []);
      }

      cmy() {
        return this;
      }

      cmyk() {
        return this;
      }

      hsl() {
        return this;
      }

      hsv() {
        return this;
      }

      hwb() {
        return this;
      }

      rgb() {
        return this;
      }
    };
  }
}
