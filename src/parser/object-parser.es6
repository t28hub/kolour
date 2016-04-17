import Parser from './parser.es6';
import Color, { NO_ALPHA } from '../color/color.es6';
import Cmy from '../color/cmy.es6';
import Cmyk from '../color/cmyk.es6';
import Hsl from '../color/hsl.es6';
import Hsv from '../color/hsv.es6';
import Hwb from '../color/hwb.es6';
import Rgb from '../color/rgb.es6';

const KEY_ALPHA = 'a';

/**
 * Class which creates a color from an object
 * @abstract
 */
export class Factory {
  /**
   * Creates a factory
   * @param {...string} keys - The required keys
   */
  constructor(...keys) {
    this.keys = keys;
  }

  /**
   * Checks whether the object is acceptable or not
   * @protected
   * @param {Object} object - The object to be checked
   * @returns {boolean} <em>true</em> if the object is acceptable
   */
  isAcceptable(object) {
    const keys = Object.keys(object).filter((key) => {
      return key !== KEY_ALPHA;
    });

    if (this.keys.length !== keys.length) {
      return false;
    }

    return this.keys.every((required) => {
      return keys.indexOf(required) >= 0;
    });
  }

  /**
   * Creates a color from the specified object
   * @public
   * @abstract
   * @param {Object} object - The object can be parsed
   * @returns {Color} A color
   */
  create(object) {
    throw new Error('This method must be implemented by a child class');
  }
}

const DEFAULTS = new Set();

// CMY
DEFAULTS.add(new class extends Factory {
  constructor() {
    super('c', 'm', 'y');
  }

  create(object) {
    const { c, m, y, a = NO_ALPHA } = object;
    return new Cmy(c, m, y, a);
  }
});

// CMYK
DEFAULTS.add(new class extends Factory {
  constructor() {
    super('c', 'm', 'y', 'k');
  }

  create(object) {
    const { c, m, y, k, a = NO_ALPHA } = object;
    return new Cmyk(c, m, y, k, a);
  }
});

// HSL
DEFAULTS.add(new class extends Factory {
  constructor() {
    super('h', 's', 'l');
  }

  create(object) {
    const { h, s, l, a = NO_ALPHA } = object;
    return new Hsl(h, s, l, a);
  }
});

// HSV
DEFAULTS.add(new class extends Factory {
  constructor() {
    super('h', 's', 'v');
  }

  create(object) {
    const { h, s, v, a = NO_ALPHA } = object;
    return new Hsv(h, s, v, a);
  }
});

// HWB
DEFAULTS.add(new class extends Factory {
  constructor() {
    super('h', 'w', 'b');
  }

  create(object) {
    const { h, w, b, a = NO_ALPHA } = object;
    return new Hwb(h, w, b, a);
  }
});

// RGB
DEFAULTS.add(new class extends Factory {
  constructor() {
    super('r', 'g', 'b');
  }

  create(object) {
    const { r, g, b, a = NO_ALPHA } = object;
    return new Rgb(r, g, b, a);
  }
});

/**
 * Class which creates color from an object
 * @extends Parser.<string>
 */
export default class ObjectParser extends Parser {
  /**
   * Creates a ObjectParser with factories
   * @public
   * @param {Iterable.<Factory>} factories - The supported factories
   */
  constructor(factories) {
    super();
    this.factories = new Set(factories);
  }

  /**
   * Parses the specified object and creates a color
   * @param {Object} object - The object to be parsed
   * @returns {Color} - A parsed color
   */
  parse(object) {
    if (!this.isAcceptable(object)) {
      return Color.invalid();
    }

    const iterator = this.factories.values();
    for (const factory of iterator) {
      if (!factory.isAcceptable(object)) {
        continue;
      }
      // noinspection JSValidateTypes
      return factory.create(object);
    }
    return Color.invalid();
  }

  /**
   * Checks whether the specified object is acceptable
   * @private
   * @param {object} object - The object to be checked
   * @returns {boolean} <em>true</em> if the specified object is acceptable
   */
  isAcceptable(object) {
    return Object.keys(object).every((key) => {
      const value = object[key];
      return Number.isFinite(value);
    });
  }

  /**
   * Creates a default ObjectParser
   * @returns {ObjectParser} The default ObjectParser
   */
  static defaults() {
    return new ObjectParser(DEFAULTS);
  }
}

