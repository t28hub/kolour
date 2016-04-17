/**
 * Returns a string representing the specified value
 * @module utils/to-string
 * @param {*} object - The object to be a string
 */
export default function toString(object) {
  return Object.prototype.toString.call(object);
}
