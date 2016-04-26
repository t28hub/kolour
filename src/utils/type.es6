const STRING_NUMBER = '[object Number]';
const STRING_STRING = '[object String]';
const STRING_OBJECT = '[object Object]';

/**
 * Returns a string representing the specified value
 * @module utils/to-string
 * @param {*} object - The object to be a string
 */
export function toString(object) {
  return Object.prototype.toString.call(object);
}

/**
 * Checks whether the specified object is number or not
 * @exports utils/is-string
 * @param {*} object - The object to be checked
 */
export function isNumber(object) {
  return toString(object) === STRING_NUMBER;
}

/**
 * Checks whether the specified object is String or not
 * @exports utils/is-string
 * @param {*} object - The object to be checked
 */
export function isString(object) {
  return toString(object) === STRING_STRING;
}

/**
 * Checks whether the specified object is Object or not
 * @exports utils/is-object
 * @param {*} object - The object to be checked
 */
export function isObject(object) {
  return toString(object) === STRING_OBJECT;
}