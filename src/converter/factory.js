import RgbConverter from './rgb';
import {RGB} from '../color/space';

const MAPPING = Object.freeze(new Map(
  [
    [RGB, RgbConverter]
  ]
));

export default class Factory {
  constructor(mapping) {
    if (!mapping) {
      throw new Error('mapping must be iterable');
    }
    this.mapping = new Map(mapping);
  }

  create(type) {
    let converter = this.mapping.get(type);
    if (!converter) {
      throw new Error();
    }
    return new converter();
  }

  static normal() {
    return new Factory(MAPPING);
  }
}
