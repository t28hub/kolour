class Space {
  constructor(iterable) {
    if (!iterable) {
      throw new Error();
    }
    this.table = new Map(iterable);
  }

  get(key) {
    return this.table.get(key);
  }

  set(key, value) {
    return this.table.set(key, value);
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
    super([[self.KEY_R, r], [self.KEY_G, g], [self.KEY_B, b]]);
  }
}
