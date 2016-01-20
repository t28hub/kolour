export default class Space {
  constructor(name, keys) {
    this.name = name;
    this.keys = keys;
  }

  name() {
    return this.name;
  }

  keys() {
    return Array.from(this.keys);
  }

  isValid(color) {
    if (color.space() !== this) {
      return false;
    }
    return true;
  }

  bytes() {
  }
}

const KEY_R = Symbol.for('r');
const KEY_G = Symbol.for('g');
const KEY_B = Symbol.for('b');

export const RGB = new class extends Space {
  constructor() {
    super('hsl', [KEY_R, KEY_G, KEY_B]);
  }

  isValid(color) {
    if (color.space() !== this.name()) {
      throw new TypeError();
    }

    let r = color.get(KEY_R);
    if (!Number.isInteger(r) || r < 0x00 || r > 0xFF) {
      return false;
    }

    let g = color.get(KEY_G);
    if (!Number.isInteger(r) || r < 0x00 || r > 0xFF) {
      return false;
    }

    let b = color.get(KEY_B);
    if (!Number.isInteger(b) || b < 0x00 || b > 0xFF) {
      return false;
    }
    return true;
  }

  bytes(color) {
    return [...color.values(), 0];
  }
}

const KEY_H = Symbol.for('h');
const KEY_S = Symbol.for('s');
const KEY_L = Symbol.for('l');

export class HSL = new class extends Space {
  constructor() {
    super('hsl', [KEY_H, KEY_S, KEY_L]);
  }

  isValid(color) {
    if (color.space() !== this.name()) {
      throw new TypeError();
    }

    let h = color.get(KEY_H);
    if (!Number.isFinite(h) || h < 0 || h > 360) {
      return false;
    }

    let s = color.get(KEY_S);
    if (!Number.isFinite(s) || s < 0 || s > 1) {
      return false;
    }

    let l = color.get(KEY_L);
    if (!Number.isFinite(l) || l < 0 || l > 1) {
      return false;
    }
    return true;
  }

  bytes(color) {
    if (color.space() !== this.name()) {
      throw new TypeError();
    }

    let [h, s, l] = color.values();
    if (s === 0) {
      let value = Math.floor(0xFF * l);
      return [value, value, value, 0];
    }

    let m2 = 0;
    if (l < 0.5) {
      m2 = l * (s + 1);
    } else {
      m2 = l + s - l * s;
    }

    let m1 = 2 * l - m2;
    return [
      Math.floor(0xFF * this.hueToRgb(m1, m2, h / 360 + 1 / 3)),
      Math.floor(0xFF * this.hueToRgb(m1, m2, h / 360)),
      Math.floor(0xFF * this.hueToRgb(m1, m2, h / 360 - 1 / 3)),
      0
    ];
  }

  hueToRgb(m1, m2, h) {
    if (h < 0) {
      h += 1;
    }
    if (h > 1) {
      h -= 1;
    }

    if (h * 6 < 1) {
      return m1 + (m2 - m1) * h * 6;
    } else if (h * 2 < 1) {
      return m2;
    } else if (h * 3 < 2) {
      return m1 + (m2 - m1) * (2 / 3 - h) * 6;
    }
    return m1;
  }
}
