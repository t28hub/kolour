export default class Color {
  constructor(space, table) {
    this.space = space;
    this.table = new Map(table);
  }

  isValid() {
    return false;
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

  toArray() {
    return Array.from(this.table.values());
  }

  toBytes() {
    return [0, 0, 0, 0];
  }

  clone() {
    return new this.constructor.name(this.space, this.table);
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
