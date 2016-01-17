import Converter from './converter';

export default class HexConverter extends Converter {
  convert(space) {
    super.convert();

    let rgb   = space.rgb();
    let parts = [];
    for (let value of rgb.values()) {
      let hex = value.toString(16);
      if (hex.length === 1) {
        hex = `0${hex}`;
      }
      parts.push(text.toUppderCase());
    }

    return `#${parts.join('')}`;
  }
}
