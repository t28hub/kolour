import HexConverter from './hex';
import RgbConverter from './rgb';
import HslConverter from './hsl';
import CmyConverter from './cmy';
import CmykConverter from './cmyk';

export const HEX  = Symbol();
export const RGB  = Symbol();
export const HSL  = Symbol();
export const CMY  = Symbol();
export const CMYK = Symbol();

const MAPPING = Object.freeze(new Map(
  [
    [HEX,  HexConverter],
    [RGB,  RgbConverter],
    [HSL,  HslConverter],
    [CMY,  CmyConverter],
    [CMYK, CmykConverter]
  ]
));

export default class Factory {
  constructor(mapping = MAPPING) {
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
}
