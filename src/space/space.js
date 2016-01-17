//import Factory, {HEX, RGB, HSL, HSV, CMY, CMYK} from '../converter/factory';

export default class Space {
  constructor(iterable) {
    if (!iterable) {
      throw new Error();
    }
    this.table   = new Map(iterable);
  }

  toString() {
    let object = Object.create(null);
    for (let [symbol, value] of this.table) {
      let key = Symbol.keyFor(symbol);
      if (!key) {
        throw new Error();
      }
      object[key] = value;
    }
    return JSON.stringify(object);
  }

  isValid() {
    return false;
  }

  clone() {
    return new this.constructor.name(...this.values());
  }

  hex() {
    return this.convertTo(HEX);
  }

  rgb() {
    return this.convertTo(RGB);
  }

  hsl() {
    return this.convertTo(HSL);
  }

  hsv() {
    return this.convertTo(HSV);
  }

  cmy() {
    return this.convertTo(CMY);
  }

  cmyk() {
    return this.convertTo(CMYK);
  }

  get(key) {
    return this.table.get(key);
  }

  set(key, value) {
    return this.table.set(key, value);
  }

  getOrSet(key, value = null) {
    if (value == null) {
      return this.get(key);
    }
    this.set(key, value);
    return this;
  }

  values() {
    return this.table.values();
  }

  /*
  convertTo(type) {
    let converter = this.factory.create(type);
    return converter.convert(this);
  }
  */
}
