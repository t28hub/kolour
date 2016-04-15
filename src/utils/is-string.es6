/**
 * @module utils
 */
import toString from './to-string.es6';

const STRING = '[object String]';

/**
 * Checks whether the specified object is String or not
 *
 * @param {*} object - The object to be checked
 */
export default function isString(object) {
  return toString(object) === STRING;
}