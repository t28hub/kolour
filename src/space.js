class Space {
  constructor(iterable) {
    if (!iterable) {
      throw new Error();
    }
    this.table = new Map(iterable);
  }

  toString() {
    let object = Object.create(null);
    for (let [key, value] of this.table) {
      object[key] = value;
    }
    return JSON.stringify(object);
  }

  isValid() {
    return false;
  }

  clone() {
    throw new Error("clone() is not implemented");
  }

  hex() {
    throw new Error("hex() is not implemented");
  }

  rgb() {
    throw new Error("rgb() is not implemented");
  }

  hsl() {
    throw new Error("hsl() is not implemented");
  }

  cmyk() {
    throw new Error("cmyk() is not implemented");
  }

  get(key) {
    return this.table.get(key);
  }

  set(key, value) {
    return this.table.set(key, value);
  }

  getOrSet(key, value = null) {
    if (value == null) {
      return this.get(key);
    }
    this.set(key, value);
    return this;
  }

  values() {
    return this.table.values();
  }
}

export class Rgb extends Space {
  static KEY_R = "r";
  static KEY_G = "g";
  static KEY_B = "b";

  constructor(r, g, b) {
    super([[Rgb.KEY_R, r], [Rgb.KEY_G, g], [Rgb.KEY_B, b]]);
  }

  toString() {
    return `rgb(${this.r()}, ${this.g()}, ${this.b()})`;
  }

  isValid() {
    let values = this.values();
    for (let value of values) {
      if (value < 0x00 || value > 0xFF) {
        return false;
      }
    }
    return true;
  }

  clone() {
    return new Rgb(this.r(), this.g(), this.b());
  }

  r(value = null) {
    return this.getOrSet(Rgb.KEY_R, value);
  }

  g(value = null) {
    return this.getOrSet(Rgb.KEY_G, value);
  }

  b(value = null) {
    return this.getOrSet(Rgb.KEY_B, value);
  }

  hex() {
    let parts = [];
    for (let value of this.values()) {
      let text = value.toString(16);
      if (text.length === 1) {
        text = `0${text}`;
      }
      parts.push(text.toUppderCase());
    }
    return `#${parts.join('')}`;
  }

  rgb() {
    return this;
  }

  hsl() {
    let r = this.r() / 0xFF;
    let g = this.g() / 0xFF;
    let b = this.b() / 0xFF;

    let max   = Math.max(r, g, b);
    let min   = Math.min(r, g, b);
    let delta = max - min;
    if (delta === 0) {
      return new Hsl(0, 0, max);
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

    return new Hsl(h, s, l);
  }

  cmyk() {
    let r = this.r() / 0xFF;
    let g = this.g() / 0xFF;
    let b = this.b() / 0xFF;

    let k = 1 - Math.max(r, g, b);
    if (k === 1) {
      return new Cmyk(0, 0, 0, 1);
    }

    let c = (1 - r - k) / (1 - k);
    let m = (1 - g - k) / (1 - k);
    let y = (1 - b - k) / (1 - k);
    return new Cmyk(c, m, y, k);
  }
}

export class Hsl extends Space {
  static KEY_H = "h";
  static KEY_S = "s";
  static KEY_L = "l";

  constructor(h, s, l) {
    super([[Hsl.KEY_H, h], [Hsl.KEY_S, s], [Hsl.KEY_L, l]]);
  }

  toString() {
    return `hsl(${this.h()}, ${this.s()}%, ${this.l()}%)`;
  }

  clone() {
    return new Hsl(this.h(), this.s(), this.l());
  }

  isValid() {
    let h = this.h();
    if (!Number.isFinite(h) || h < 0 || h > 360) {
      return false;
    }

    let s = this.s();
    if (!Number.isFinite(s) || s < 0 || s > 100) {
      return false;
    }

    let l = this.l();
    if (!Number.isFinite(l) || l < 0 || l > 100) {
      return false;
    }
    return true;
  }

  h(value = null) {
    return this.getOrSet(Hsl.KEY_H, value);
  }

  s(value = null) {
    return this.getOrSet(Hsl.KEY_S, value);
  }

  l(value = null) {
    return this.getOrSet(Hsl.KEY_L, value);
  }

  hex() {
    return this.rgb().hex();
  }

  rgb() {
    let h = this.h();
    let s = this.s();
    let l = this.l();
    if (s === 0) {
      let value = Math.round(l * 0xFF);
      return new Rgb(value, value, value);
    }

    let m2 = 0;
    if (l < 0.5) {
      m2 = l * (s + 1);
    } else {
      m2 = l + s - l * s;
    }

    let m1 = 2 * l - m2;
    let r = Math.round(255 * Hsl.hueToRgb(m1, m2, h / 360 + 1 / 3));
    let g = Math.round(255 * Hsl.hueToRgb(m1, m2, h / 360));
    let b = Math.round(255 * Hsl.hueToRgb(m1, m2, h / 360 - 1 / 3));
    return new Rgb(r, g, b)
  }

  hsl() {
    return this;
  }

  cmyk() {
    return this.rgb().cmyk();
  }

  static hueToRgb(m1, m2, h) {
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
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

export class Cmyk extends Space {
  static KEY_C = 'c';
  static KEY_M = 'm';
  static KEY_Y = 'y';
  static KEY_K = 'k';

  constructor(c, m, y, k) {
    super([[Cmyk.KEY_C, c], [Cmyk.KEY_M, m], [Cmyk.KEY_Y, y], [Cmyk.KEY_K]]);
  }

  isValid() {
    for (let value of this.values()) {
      if (!Number.isFinite(value)) {
        return false;
      }
      if (value < 0 || value > 1) {
        return false;
      }
    }
    return true;
  }

  clone() {
    return new Cmyk(this.c(), this.m(), this.y(), this.k());
  }

  c(value = null) {
    return this.getOrSet(Cmyk.KEY_C, value);
  }

  m(value = null) {
    return this.getOrSet(Cmyk.KEY_M, value);
  }

  y(value = null) {
    return this.getOrSet(Cmyk.KEY_Y, value);
  }

  k(value = null) {
    return this.getOrSet(Cmyk.KEY_K, value);
  }

  hex() {
    return this.rgb().hex();
  }

  rgb() {
    let k = this.k();
    if (k === 1) {
      return new Rgb(0, 0, 0);
    }

    let r = 0xFF * (1 - this.c()) * (1 - k);
    let g = 0xFF * (1 - this.m()) * (1 - k);
    let b = 0xFF * (1 - this.y()) * (1 - k);
    return new Rgb(r, g, b);
  }
}
