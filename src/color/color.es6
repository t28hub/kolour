export const NO_NAME = 'NULL';
export const NO_VALUE = Number.POSITIVE_INFINITY;
export const NO_ALPHA = Number.POSITIVE_INFINITY;
export const MIN_ALPHA = 0;
export const MAX_ALPHA = 1;

const DEFAULT_AMOUNT = 0.5;

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

    if (value.name !== this.name) {
      return false;
    }

    if (this.components.size !== value.components.size) {
      return false;
    }

    const entries = Array.from(this.components.entries());
    return entries.every((entry) => {
      const key = entry[0];
      return value.get(key) === entry[1];
    });
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
   * Increases the saturation by a specified amount
   * @public
   * @abstract
   * @param {number} amount - The percentage 0..1
   * @returns {Color} A saturated color
   * @see desaturate
   */
  saturate(amount) {
  }

  /**
   * Decreases the saturation by a specified amount
   * @public
   * @abstract
   * @param {number} amount - The percentage 0..1
   * @returns {Color} A desaturated color
   * @see saturate
   */
  desaturate(amount) {
  }

  /**
   * Converts to grayscale
   * @public
   * @abstract
   * @returns {Color} A grayscale color
   */
  grayscale() {
  }

  /**
   * Increases the luminance by a specified amount
   * @public
   * @abstract
   * @param {number} amount - The percentage 0..1
   * @returns {Color} A lighten color
   * @see darken
   */
  lighten(amount) {
  }

  /**
   * Decreases the luminance by a specified amount
   * @public
   * @abstract
   * @param {number} amount - The percentage 0..1
   * @returns {Color} A darken color
   * @see lighten
   */
  darken(amount) {
  }

  /**
   * Increases the whiteness by a specified amount
   * @public
   * @abstract
   * @param {number} [amount] - The percentage 0..1
   * @returns {Color} A whiten color
   * @see blacken
   */
  whiten(amount = DEFAULT_AMOUNT) {
  }

  /**
   * Increases the blackness by a specified amount
   * @public
   * @abstract
   * @param {number} [amount] - The percentage 0..1
   * @returns {Color} A blacken color
   * @see whiten
   */
  blaken(amount = DEFAULT_AMOUNT) {
  }

  /**
   * Create a inverted color
   * @public
   * @abstract
   * @returns {Color} A inverted color
   * @see negate
   */
  invert() {
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
   * @abstract
   * @param amount - The percentage 0..1
   * @returns {Color} A rotated color
   * @see spin
   */
  rotate(amount) {
  }

  /**
   * Creates a rotated color
   * @public
   * @param amount - The percentage 0..1
   * @returns {Color} A rotated color
   * @see rotate
   */
  spin(amount) {
    return this.rotate(amount);
  }

  /**
   * Creates a complementary color
   * @public
   * @abstract
   * @returns {Color} A complementary color
   */
  complement() {
  }

  /**
   * Increases the alpha by a specified amount
   * @public
   * @abstract
   * @param amount - The percentage 0..1
   * @returns {Color} A color
   * @see fadeout
   */
  fadein(amount) {
  }

  /**
   * Decreases the alpha by a specified amount
   * @public
   * @abstract
   * @param amount - The percentage 0..1
   * @returns {Color} A color
   * @see fadein
   */
  fadeout(amount) {
  }

  /**
   * Mixes a color
   * @public
   * @abstract
   * @param {Color} color - The color to be mixed
   * @param {number} [amount] - The relative weight of each color
   * @returns {Color} A mixed color
   */
  mix(color, amount = DEFAULT_AMOUNT) {
  }

  /**
   * Mixes with white by a specified amount
   * @public
   * @abstract
   * @param {number} [amount] - The percentage 0..1
   * @returns {Color} A mixed color
   * @see shade
   */
  tint(amount = DEFAULT_AMOUNT) {
  }

  /**
   * Mixes with black by a specified amount
   * @public
   * @abstract
   * @param {number} [amount] - The percentage 0..1
   * @returns {Color} A mixed color
   * @see tint
   */
  shade(amount = DEFAULT_AMOUNT) {
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
   * Converts color to an integer
   * @public
   * @returns {number} An integer
   */
  int() {
    return 0;
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
