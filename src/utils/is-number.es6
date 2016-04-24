import toString from './to-string.es6';

const STRING = '[object Number]';

/**
 * Checks whether the specified object is number or not
 * @exports utils/is-string
 * @param {*} object - The object to be checked
 */
export default function isNumber(object) {
  return toString(object) === STRING;
}
