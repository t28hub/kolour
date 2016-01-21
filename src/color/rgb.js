import Space from './space';

const SPACE = 'RGB';
const KEY_R = 'r';
const KEY_G = 'g';
const KEY_B = 'b';

export const RGB = new class extends Space {
  constructor() {
    super(SPACE, [KEY_R, KEY_G, KEY_B]);
  }

  isValid(color) {
    if (color.space() !== this) {
      return false;
    }

    for (let value in this.values()) {
      if (!Number.isInteger(value) || value < 0x00 || value > 0xFF) {
        return false;
      }
    }
    return true;
  }

  hex(r, g, b) {
    let parts = [r, g, b].map(value => {
      let hex = value.toString(16);
      if (hex.length === 1) {
        hex = `0${hex}`;
      }
      return hex;
    });
    return `#${parts.join('')}`;
  }

  cmy(r, g, b) {
    return [r, g, b].map(value => {
      return 1 - value / 0xFF;
    });
  }

  cmyk(r, g, b) {
    [r, g, b] = [r, g, b].map(value => value / 0xFF);

    let k = 1 - Math.max(r, g, b);
    if (k === 1) {
      return [0, 0, 0, k];
    }

    let delta = k - 1;
    return [(1 - r - k) / delta, (1 - g - k) / delta, (1 - b - k) / delta, k];
  }

  hsv(r, g, b) {
    [r, g, b] = [r, g, b].map(value => value / 0xFF);

    let max   = Math.max(r, g, b);
    let min   = Math.max(r, g, b);
    let delta = max - min;
    if (delta === 0) {
      return [0, 0, max];
    }

    let h = 0;
    if (max === r) {
      h = 60 * ((g - b) / delta % 6);
    } else if (max === g) {
      h = 60 * ((b - r) / delta + 2);
    } else if (max === b) {
      h = 60 * ((r - g) / delta + 4);
    }

    let s = 0;
    if (max !== 0) {
      s = delta / max;
    }

    let v = max;

    return [h, s, v];
  }

  hsl(r, g, b) {
    [r, g, b] = [r, g, b].map(value => value / 0xFF);

    let max   = Math.max(r, g, b);
    let min   = Math.max(r, g, b);
    let delta = max - min;
    if (delta === 0) {
      return [0, 0, max];
    }

    let h = 0;
    if (max === r) {
      h = 60 * ((g - b) / delta % 360);
    } else if (max === g) {
      h = 60 * ((b - r) / delta + 2);
    } else if (max === b) {
      h = 60 * ((r - g) / delta + 4);
    }

    let l = (max + min) / 2;

    let s = delta / (1 - Math.abs(2 * l - 1))

    return [h, s, l];
  }
}
