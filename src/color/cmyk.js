import Space from './space';

const SPACE = 'CMYK';
const KEY_C = 'c';
const KEY_M = 'm';
const KEY_Y = 'y';
const KEY_K = 'k';

export default const CMYK = new class extends Space {
  constructor(c, m, y, k) {
    super(SPACE, [KEY_C, KEY_M, KEY_Y, KEY_K]);
  }

  isValid(color) {
    for (let value of color.values()) {
      if (!Number.isFinite(value)) {
        return false;
      }
      if (value < 0 || value > 1) {
        return false;
      }
    }
    return true;
  }

  cmy(c, m, y, k) {
    let delta = 1 - k;
    return [c, m, y].map(value => {
      value * delta + k;
    });
  }
}
