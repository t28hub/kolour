/**
 * Class representing an abstract parser
 *
 * @abstract
 * @template T
 */
export default class Parser {
  /**
   * Parses the specified object to a color
   *
   * @public
   * @abstract
   * @param {T} object - The object to be parsed
   * @returns {Color} A color
   */
  parse(object) {
    throw new Error('This method must be implemented by a child class');
  }
}