const TYPES = Object.freeze({
  UNKNOWN: Symbol.for('unknown'),
  STRING:  Symbol.for('string'),
  OBJECT:  Symbol.for('object')
});

export default class Type {
  constructor(symbol) {
    this.name   = Symbol.keyFor(symbol);
    this.symbol = symbol;
  }

  isString() {
    return this.symbol === TYPES.STRING;
  }

  isObject() {
    return this.symbol === TYPES.OBJECT;
  }

  static of(value) {
    let string = Object.prototype.toString.call(value).toLowerCase();
    let found  = Object.keys(TYPES).find(type => {
      return string === `[object ${type}]`.toLowerCase();
    });

    let symbol = TYPES.UNKNOWN;
    if (found) {
      symbol = TYPES[found];
    }
    return new Type(symbol);
  }
}
