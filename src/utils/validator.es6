import Color from '../color/color.es6';
import isNumber from './is-number.es6';

export class Validator {
  constructor(value, name) {
    this.value = value;
    this.name = name;
  }

  isNotNull() {
    if (this.value === null) {
      throw new TypeError(`${this.name} must not be null`);
    }
    return this;
  }
}

export class NumberValidator extends Validator {
  constructor(value, name) {
    super(value, name);
  }

  isFinite() {
    if (!Number.isFinite(this.value)) {
      throw new TypeError(`${this.name} must be a finite number`);
    }
    return this;
  }

  inRange(min, max) {
    if (this.value < min || this.value > max) {
      throw new TypeError(`${this.name} must be within range ${min}..${max}:${this.value}`);
    }
    return this;
  }
}

export class ColorValidator extends Validator {
  constructor(value, name) {
    super(value, name);
  }

  isValid() {
    this.isNotNull();
    if (!this.value.isValid()) {
      throw new TypeError(`${this.name} must be a valid:${this.value}`);
    }
    return this;
  }
}

/**
 * Creates a validator with value and name
 * @param {*} value - The value to be validated
 * @param {string} name - The name of value
 * @returns {Validator} A validator
 */
export default function (value, name) {
  if (value instanceof Color) {
    return new ColorValidator(value, name);
  }
  if (isNumber(value)) {
    return new NumberValidator(value, name);
  }
  return new Validator(value, name);
}
