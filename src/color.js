import Utils from './utils';

export default class Color {
  constructor(space, components) {
    this.space      = space;
    this.components = new Map(components);
    this.components.forEach((value, key) => {
      let name = Symbol.keyFor(key);
      Object.defineProperty(this, name, {
        get: () => {
          return function(value = null) {
            if (value === null) {
              return this.get(key);
            }
            this.set(key, value);
            return this;
          }.bind(this);
        }
      });
    });
  }

  has(key) {
    return this.components.has(key);
  }

  get(key) {
    if (!this.has(key)) {
      throw new TypeError();
    }
    return this.components.get(key);
  }

  set(key, value) {
    if (!this.has(key)) {
      throw new TypeError();
    }
    this.components.set(key, value);
    return this;
  }

  keys() {
    return Array.from(this.components.keys());
  }

  values() {
    return Array.from(this.components.values());
  }

  cmy() {
  }

  cmyk() {
  }

  hsl() {
  }

  hsv() {
  }

  rgb() {
  }

  xyz() {
  }

  static from(value) {
    return null;
  }
}
