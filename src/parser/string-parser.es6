import Parser from './parser.es6';
import Color  from '../color/color.es6';
import Cmyk   from '../color/cmyk.es6';
import Hsl    from '../color/hsl.es6';
import Hwb    from '../color/hwb.es6';
import Rgb    from '../color/rgb.es6';

/**
 * Class which creates a color from matched string
 */
export class Factory {
  /**
   * Creates a factory
   *
   * @param {RegExp} regexp - The pattern which is supported by this factory
   */
  constructor(regexp) {
    this.regexp = regexp;
  }

  /**
   * Creates a color from matched items
   *
   * @public
   * @abstract
   * @param {string...} matched - The matched items for each capturing
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
      return Number.parseInt(value);
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
      return Number.parseInt(value);
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
    super(/^\s*hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)\s*$/);
  }

  create(h, s, l) {
    h = Number.parseInt(h);
    s = Number.parseInt(s) / Hsl.MAX_S;
    l = Number.parseInt(l) / Hsl.MAX_L;
    return new Hsl(h, s, l);
  }
});

DEFAULTS.add(new class extends Factory {
  constructor() {
    super(/^\s*hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(0|1|0\.\d+)\s*\)\s*$/);
  }

  create(h, s, l, a) {
    h = Number.parseInt(h);
    s = Number.parseInt(s) / Hsl.MAX_S;
    l = Number.parseInt(l) / Hsl.MAX_L;
    a = Number.parseFloat(a);
    return new Hsl(h, s, l, a);
  }
});

DEFAULTS.add(new class extends Factory {
  constructor() {
    super(/^\s*hwb\(\s*(\d{1,3}|\d{1,2}\.\d+)%\s*,\s*(\d{1,3}|\d{1,2}\.\d+)%\s*,\s*(\d{1,3}|\d{1,2}\.\d+)%\s*\)\s*$/);
  }

  create(h, w, b) {
    h = Number.parseInt(h);
    w = Number.parseFloat(w);
    b = Number.parseFloat(b);
    return new Hwb(h, w, b);
  }
});

DEFAULTS.add(new class extends Factory {
  constructor() {
    super(/^\s*hwb\(\s*(\d{1,3}|\d{1,2}\.\d+)%\s*,\s*(\d{1,3}|\d{1,2}\.\d+)%\s*,\s*(\d{1,3}|\d{1,2}\.\d+)%\s*,\s*(0|1|0\.\d+)\s*\)\s*$/);
  }

  create(h, w, b, a) {
    h = Number.parseInt(h);
    w = Number.parseFloat(w);
    b = Number.parseFloat(b);
    a = Number.parseFloat(a);
    return new Hwb(h, w, b, a);
  }
});

DEFAULTS.add(new class extends Factory {
  constructor() {
    super(/^\s*device-cmyk\(\s*(\d{1,3}|\d{1,2}\.\d+)%\s*,\s*(\d{1,3}|\d{1,2}\.\d+)%\s*,\s*(\d{1,3}|\d{1,2}\.\d+)%\s*,\s*(\d{1,3}|\d{1,2}\.\d+)%\s*\)\s*$/);
  }

  create(c, m, y, k) {
    c = Number.parseFloat(c);
    m = Number.parseFloat(m);
    y = Number.parseFloat(y);
    k = Number.parseFloat(k);
    return new Cmyk(c, m, y, k);
  }
});

/**
 * Class which creates color from a string
 *
 * @extends Parser.<string>
 */
export default class StringParser extends Parser {
  /**
   * Creates a StringParser from factories
   *
   * @param {Iterable.<Factory>} factories - The supported factories
   */
  constructor(factories) {
    super();
    this.factories = new Set(factories);
  }

  /**
   * Parses the specified string and creates a color
   *
   * @param {string} string - The string to be parsed
   * @returns {Color} - The parsed color
   */
  parse(string) {
    const iterator = this.factories.values();
    for (let factory of iterator) {
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
   *
   * @returns {StringParser} The default StringParser
   */
  static defaults() {
    return new StringParser(DEFAULTS);
  }
}