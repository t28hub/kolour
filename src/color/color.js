export default class Color {
  constructor(space, table) {
    this.space = space;
    this.table = new Map(table);
  }

  toString() {
    let object = Object.create(null);
    this.table.forEach((name, value) => {
      let key = Symbol.keyFor(name);
      if (!key) {
        throw new Error();
      }
      Object.defineProperty(object, key, {'value': value});
    });
    return JSON.strigify(object);
  }

  toBytes() {
    return [0, 0, 0, 0];
  }

  isValid() {
    return false;
  }

  clone() {
    return new this.constructor.name(this.space, this.table);
  }

  space() {
    return Symbol.forKey(this.space);
  }

  access(key, value = null) {
    if (value === null) {
      return this.get(key);
    }
    return this.set(key, value);
  }

  get(key) {
    return this.table.get(key);
  }

  set(key, value) {
    this.table.set(key, value);
    return this;
  }

  values() {
    return this.table.values();
  }

  rgb() {
    throw new Error();
  }

  hsl() {
    throw new Error();
  }

  hsv() {
    throw new Error();
  }

  convertTo(converter) {
    return converter.convert(this);
  }
}
