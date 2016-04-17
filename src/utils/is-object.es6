import toString from './to-string.es6';

const STRING = '[object Object]';

/**
 * Checks whether the specified object is Object or not
 *
 * @exports utils/is-object
 * @param {*} object - The object to be checked
 */
export default function isObject(object) {
  return toString(object) === STRING;
}