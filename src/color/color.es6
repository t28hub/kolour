export const NO_NAME = 'NULL';
export const NO_ALPHA = Number.POSITIVE_INFINITY;

const MIN_ALPHA = 0;
const MAX_ALPHA = 1;

/**
 * Class representing a Color
 */
export default class Color {
  /**
   * Creates a color
   *
   * @protected
   * @param {string} name - The name of color space
   * @param {Iterable} components - The color components
   */
  constructor(name, components) {
    this.name = name;
    this.components = new Map(components);
  }

  /**
   * Returns a string representing an instance
   *
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
        previous[Symbol.keyFor(key)] = value;
        return previous;
      }, Object.create(null));
    return JSON.stringify(object);
  }

  /**
   * Checks whether a property exists in the components or not
   *
   * @protected
   * @param {Symbol} property - Key of property
   * @returns {boolean} <em>true</em> if the components has a specified property as a key.
   */
  has(property) {
    return this.components.has(property);
  }

  /**
   * Returns a value which is mapped to a specified property.
   *
   * @protected
   * @param {Symbol} property - Key of property
   * @returns {number} A color value
   * @throws {TypeError} Argument property must exist in the component as a key.
   */
  get(property) {
    if (!this.has(property)) {
      throw new TypeError("Specified property does not exist in a component:" + this.components);
    }
    return this.components.get(property);
  }

  /**
   * Sets a value to a specified property
   *
   * @protected
   * @param {Symbol} property - Key of property
   * @param {number} value - A color value
   * @returns {Color} Instance of self
   * @throws {TypeError} Argument property must exist in the components as a key.
   * @throws {TypeError} Argument value must be a finite number.
   */
  set(property, value) {
    if (!this.has(property)) {
      throw new TypeError("Specified property does not exist in a component:" + this.components);
    }
    if (!Number.isFinite(value)) {
      throw new TypeError("Specified value must be a finite number");
    }
    this.components.set(property, value);
    return this;
  }

  /**
   * Creates an accessor for a specific property
   *
   * @protected
   * @param {Symbol} property - Key of property
   * @returns {function()} An accessor for a specified property
   */
  accessor(property) {
    // The below anonymous function works as a setter and a getter.
    return (value) => {
      if (!Number.isFinite(value)) {
        return this.get(property);
      }
      return this.set(property, value);
    };
  }

  /**
   * Clones an instance
   *
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
   *
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
   *
   * @public
   * @returns {boolean} <em>true</em> if the instance is valid
   */
  isValid() {
    return false;
  }

  /**
   * Creates a new color which is darker than the current color.
   *
   * @public
   * @param {number} factor
   * @throws {TypeError} Argument factor must be within range 0 and 1
   */
  darken(factor) {
    if (!Number.isFinite(factor)) {
      throw new TypeError(`Argument factor(${factor}) must be a finite number`);
    }
  }

  /**
   * Creates a new color which is lighter than the current color.
   *
   * @public
   * @param {number} factor
   * @throws {TypeError} Argument factor must be within range 0 and 1
   */
  lighten(factor) {
    if (!Number.isFinite(factor)) {
      throw new TypeError("Factor(" + factor + ") must be a finite number");
    }
    if (factor === 0) {
      throw new TypeError("Factor(" + factor + ") must not be zero");
    }
  }

  /**
   * Converts color to a hex string
   *
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
    return `#${values.join('')}`;
  }

  /**
   * Converts color to a css string
   *
   * @public
   * @returns {string} A css string
   */
  css() {
    return '';
  }

  /**
   * Converts color space to CMY
   *
   * @abstract
   * @public
   * @returns {Cmy} A CMY color
   */
  cmy() {
    throw new Error('This method must be implemented by a child class');
  }

  /**
   * Converts color space to CMYK
   *
   * @abstract
   * @public
   * @returns {Cmyk} A CMYK color
   */
  cmyk() {
    throw new Error('This method must be implemented by a child class');
  }

  /**
   * Converts color space to HSL
   *
   * @abstract
   * @public
   * @returns {Hsl} A HSL color
   */
  hsl() {
    throw new Error('This method must be implemented by a child class');
  }

  /**
   * Converts color space to HSV
   *
   * @abstract
   * @public
   * @returns {Hsv} A HSV color
   */
  hsv() {
    throw new Error('This method must be implemented by a child class');
  }

  /**
   * Converts color space to HWB
   *
   * @abstract
   * @public
   * @returns {Hwb} A HWB color
   */
  hwb() {
    throw new Error('This method must be implemented by a child class');
  }

  /**
   * Converts color space to RGB
   *
   * @abstract
   * @public
   * @returns {Rgb} A converted RGB color
   */
  rgb() {
    throw new Error('This method must be implemented by a child class');
  }

  /**
   * Checks whether the alpha value is set or not
   *
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
   *
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
   *
   * @public
   * @static
   * @returns {Color} An invalid color
   */
  static invalid() {
    //noinspection JSValidateTypes
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