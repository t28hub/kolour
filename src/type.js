const TYPES = Object.freeze({
  UNKNOWN: Symbol.for('unknown'),
  STRING:  Symbol.for('string'),
  OBJECT:  Symbol.for('object')
});

export default class Type {
  constructor(symbol) {
    this.symbol = symbol;
  }

  name() {
    return Symbol.keyFor(this.symbol);
  }

  isString() {
    return this.symbol === TYPES.STRING;
  }

  isObject() {
    return this.symbol === TYPES.OBJECT;
  }

  static of(value) {
    let string = Object.prototype.toString.call(value).toLowerCase();
    let symbol = Object.keys(TYPES).find(type => {
      return string === `[object ${type}]`.toLowerCase();
    });

    if (!symbol) {
      symbol = TYPES.UNKNOWN;
    }
    return new Type(symbol);
  }
}
