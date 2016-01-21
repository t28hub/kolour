import Color from './color/color';
import RGB from './color/rgb';
import HSL from './color/hsl';

export default class Kolour {
  constructor(color) {
    if (!color) {
      throw new TypeError('color must not be null');
    }
    this.assign(color);
  }

  assign(color) {
    color.keys().forEach(key => {
      if (this.hasOwnProperty(key)) {
        return;
      }

      Object.defineProperty(this, key, {
        get: () => {
          return function(value = null) {
            let color = this.color;
            if (!color.has(key)) {
              throw new Error(`${color.space()} does not have a key for ${key}`);
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
