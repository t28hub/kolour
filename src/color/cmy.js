import Space from './space';

const SPACE = 'CMY';
const KEY_C = 'c';
const KEY_M = 'm';
const KEY_Y = 'y';

export const CMY = new class extends Space {
  constructor(c, m, y) {
    super(CMY, [[KEY.C, c], [KEY.M, m], [KEY.Y, y]]);
  }

  isValid(color) {
    if (color.space() !== this) {
      return false;
    }

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

  rgb(c, m, y) {
    return [c, m, y].map(value => {
      return Math.floor((1 - value) * 0xFF);
    });
  }

  cmyk(c, m, y) {
    let k = Math.min(c, m, y);
    if (k === 1) {
      return [0, 0, 0, k];
    }

    let delta = 1 - k;
    return [c, m, y].map(value => {
      return (value - k) / delta;
    });
  }
}
