import {RGB, HSL} from './space';
import Factory from '../converter/factory';

export default class Color {
  constructor(space, table, factory = Factory.normal()) {
    this.space   = space;
    this.table   = new Map(table);
    this.factory = factory;
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
    return this.convertTo(RGB);
  }

  hsl() {
    return this.convertTo(HSL);
  }

  convertTo(space) {
    let converter = this.factory.create(space);
    return converter.convert(this.toBytes());
  }
}
