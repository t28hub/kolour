export default class Utils {
  static toString(value) {
    return Object.prototype.toString.call(value);
  }

  static isString(value) {
    return toString(value) === '[object String]';
  }
}
