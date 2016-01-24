const TYPE = Object.freeze({
  STRING: '[object String]',
  OBJECT: '[object Object]'
});

export default class Utils {
  static toString(value) {
    return Object.prototype.toString.call(value);
  }

  static isString(value) {
    return Utils.isA(value, TYPE.STRING);
  }

  static isObject(value) {
    return Utils.isA(value, TYPE.OBJECT);
  }

  static isA(value, type) {
    return toString(value) === type;
  }

  static zip(array1, array2) {
    if (!array1 || !array2) {
      return [];
    }

    if (array1.length !== array2.length) {
      return [];
    }

    return array1.map((name, index) => [array1[index], array2[index]]);
  }
}
