const TYPE = Object.freeze({
  STRING: '[object String]',
  OBJECT: '[object Object]'
});

export default class Utils {
  static toString(value) {
    return Object.prototype.toString.call(value);
  }

  static isString(value) {
    return Utils.toString(value) === TYPE.STRING;
  }

  static isObject(value) {
    return Utils.toString(value) === TYPE.OBJECT;
  }
}
