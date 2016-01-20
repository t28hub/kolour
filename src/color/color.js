export default class Color {
  constructor(space, components) {
    this.space = space;
    this.table = new Map(components);
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
    return new this.constructor.name(this.space, this.table);
  }

  space() {
    return this.space.name();
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
