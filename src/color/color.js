import Utils from '../utils';

export default class Color {
  constructor(space, components) {
    let keys = space.keys();
    if (keys.length !== components.length) {
      throw new TypeError(`components.length ${components.length} must be ${keys.length}`);
    }

    this.space = space;
    this.table = new Map(Utils.zip(keys, components));;
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

  clone() {
    return new Color(this.space, this.values());
  }

  space() {
    return this.space;
  }

  keys() {
    return Array.from(this.table.keys());
  }

  values() {
    return Array.from(this.table.values());
  }

  has(key) {
    return this.table.has(key);
  }

  get(key) {
    return this.table.get(key);
  }

  set(key, value) {
    this.table.set(key, value);
    return this;
  }
}
