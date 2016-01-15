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
}
