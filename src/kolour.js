class Kolour {
  constructor(color) {
    if (!color) {
      throw new TypeError('color must not be null');
    }
    this.assign(color);
  }

  assign(color) {
    color.keys().forEach(key => {
      let name = Symbol.keyFor(key);
      if (this.hasOwnProperty(name)) {
        return;
      }

      Object.defineProperty(this, name, {
        get: () => {
          return function(value = null) {
            let color = this.color;
            if (!color.has(key)) {
              throw new Error(`${color.space()} does not have a key for ${name}`);
            }

            if (value === null) {
              return color.get(key);
            }
            color.set(key, value);
            return this;
          }.bind(this);
        }
      });
    });
    this.color = color;
  }
}
