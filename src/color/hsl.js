import Space from './space';

const SPACE = 'HSL';
const KEY_H = 'h';
const KEY_S = 's';
const KEY_L = 'l';

export class HSL = new class extends Space {
  constructor() {
    super(SPACE, [KEY_H, KEY_S, KEY_L]);
  }

  isValid(color) {
    if (color.space() !== this.name()) {
      return false;
    }

    let [h, s, l] = this.values();
    if (!Number.isFinite(h) || h < 0 || h > 360) {
      return false;
    }

    if (!Number.isFinite(s) || s < 0 || s > 1) {
      return false;
    }

    if (!Number.isFinite(l) || l < 0 || l > 1) {
      return false;
    }
    return true;
  }

  rgb(h, s, l) {
    if (color.space() !== this.name()) {
      throw new TypeError();
    }

    if (s === 0) {
      let value = Math.floor(0xFF * l);
      return [value, value, value];
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
      Math.floor(0xFF * this.hueToRgb(m1, m2, h / 360 - 1 / 3))
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
