import Parser from './parser.es6';
import Color from '../color/color.es6';
import Cmyk from '../color/cmyk.es6';
import Hsl from '../color/hsl.es6';
import Hwb from '../color/hwb.es6';
import Rgb from '../color/rgb.es6';

/**
 * Class which creates a color from matched string
 * @abstract
 */
export class Factory {
  /**
   * Creates a factory
   * @param {RegExp} regexp - The pattern which is supported by this factory
   */
  constructor(regexp) {
    this.regexp = regexp;
  }

  /**
   * Creates a color from matched items
   * @public
   * @abstract
   * @param {...string} matched - The matched items for each capturing
   */
  create(...matched) {
  }
}

const DEFAULTS = new Set();

DEFAULTS.add(new class extends Factory {
  constructor() {
    super(/^\s*rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)\s*$/);
  }

  create(r, g, b) {
    const values = [r, g, b].map((value) => {
      return Number.parseInt(value, 10);
    });
    return new Rgb(...values);
  }
});

DEFAULTS.add(new class extends Factory {
  constructor() {
    super(/^\s*rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0\.\d+)\s*\)\s*$/);
  }

  create(r, g, b, a) {
    const values = [r, g, b].map((value) => {
      return Number.parseInt(value, 10);
    });
    return new Rgb(...values, Number.parseFloat(a));
  }
});

DEFAULTS.add(new class extends Factory {
  constructor() {
    super(/^\s*rgba\(\s*(\d{1,3}|\d{1,2}\.\d+)%\s*,\s*(\d{1,3}|\d{1,2}\.\d+)%\s*,\s*(\d{1,3}|\d{1,2}\.\d+)%\s*,\s*(0|1|0\.\d+)\s*\)\s*$/);
  }

  create(r, g, b, a) {
    const values = [r, g, b].map((percent) => {
      const value = Rgb.MAX * Number.parseFloat(percent) / 100;
      return Math.round(value);
    });
    return new Rgb(...values, Number.parseFloat(a));
  }
});

DEFAULTS.add(new class extends Factory {
  constructor() {
    super(/^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/i);
  }

  create(r, g, b) {
    const values = [r, g, b].map((hex) => {
      return Number.parseInt(hex, 16);
    });
    return new Rgb(...values);
  }
});

DEFAULTS.add(new class extends Factory {
  constructor() {
    super(/#([a-f0-9])([a-f0-9])([a-f0-9])/i);
  }

  create(r, g, b) {
    const values = [r, g, b].map((hex) => {
      return Number.parseInt(`${hex}${hex}`, 16);
    });
    return new Rgb(...values);
  }
});

DEFAULTS.add(new class extends Factory {
  constructor() {
    super(/^\s*hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3}|\d{1,2}\.\d+)%\s*,\s*(\d{1,3}|\d{1,2}\.\d+)%\s*\)\s*$/);
  }

  create(h, s, l) {
    return new Hsl(
      Number.parseInt(h, 10),
      Number.parseFloat(s) / Hsl.MAX_S,
      Number.parseFloat(l) / Hsl.MAX_L
    );
  }
});

DEFAULTS.add(new class extends Factory {
  constructor() {
    super(/^\s*hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3}|\d{1,2}\.\d+)%\s*,\s*(\d{1,3}|\d{1,2}\.\d+)%\s*,\s*(0|1|0\.\d+)\s*\)\s*$/);
  }

  create(h, s, l, a) {
    return new Hsl(
      Number.parseInt(h, 10),
      Number.parseFloat(s) / Hsl.MAX_S,
      Number.parseFloat(l) / Hsl.MAX_L,
      Number.parseFloat(a)
    );
  }
});

DEFAULTS.add(new class extends Factory {
  constructor() {
    super(/^\s*hwb\(\s*(\d{1,3})\s*,\s*(\d{1,3}|\d{1,2}\.\d+)%\s*,\s*(\d{1,3}|\d{1,2}\.\d+)%\s*\)\s*$/);
  }

  create(h, w, b) {
    return new Hwb(
      Number.parseInt(h, 10),
      Number.parseFloat(w) / 100,
      Number.parseFloat(b) / 100
    );
  }
});

DEFAULTS.add(new class extends Factory {
  constructor() {
    super(/^\s*hwb\(\s*(\d{1,3})\s*,\s*(\d{1,3}|\d{1,2}\.\d+)%\s*,\s*(\d{1,3}|\d{1,2}\.\d+)%,\s*(0|1|0\.\d+)\s*\s*\)\s*$/);
  }

  create(h, w, b, a) {
    return new Hwb(
      Number.parseInt(h, 10),
      Number.parseFloat(w) / 100,
      Number.parseFloat(b) / 100,
      Number.parseFloat(a)
    );
  }
});

DEFAULTS.add(new class extends Factory {
  constructor() {
    super(/^\s*device-cmyk\(\s*(\d{1,3}|\d{1,2}\.\d+)%\s*,\s*(\d{1,3}|\d{1,2}\.\d+)%\s*,\s*(\d{1,3}|\d{1,2}\.\d+)%\s*,\s*(\d{1,3}|\d{1,2}\.\d+)%\s*\)\s*$/);
  }

  create(c, m, y, k) {
    const values = [c, m, y, k].map((value) => {
      return Number.parseFloat(value) / 100;
    });
    return new Cmyk(...values);
  }
});

/**
 * Class which creates color from a string
 * @extends Parser.<string>
 */
export default class StringParser extends Parser {
  /**
   * Creates a StringParser from factories
   * @param {Iterable.<Factory>} factories - The supported factories
   */
  constructor(factories) {
    super();
    this.factories = new Set(factories);
  }

  /**
   * Parses the specified string and creates a color
   * @param {string} string - The string to be parsed
   * @returns {Color} - The parsed color
   */
  parse(string) {
    const iterator = this.factories.values();
    for (const factory of iterator) {
      const matched = string.match(factory.regexp);
      if (!matched) {
        continue;
      }
      return factory.create(...matched.slice(1));
    }
    return Color.invalid();
  }

  /**
   * Creates a default StringParser
   * @returns {StringParser} The default StringParser
   */
  static defaults() {
    return new StringParser(DEFAULTS);
  }
}
