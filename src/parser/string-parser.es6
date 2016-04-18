import Parser from './parser.es6';
import Color from '../color/color.es6';
import Cmyk from '../color/cmyk.es6';
import Hsl from '../color/hsl.es6';
import Hwb from '../color/hwb.es6';
import Rgb from '../color/rgb.es6';

const NAMES = Object.freeze({
  aliceblue: '#F0F8FF',
  antiquewhite: '#FAEBD7',
  aqua: '#00FFFF',
  aquamarine: '#7FFFD4',
  azure: '#F0FFFF',
  beige: '#F5F5DC',
  bisque: '#FFE4C4',
  black: '#000000',
  blanchedalmond: '#FFEBCD',
  blue: '#0000FF',
  blueviolet: '#8A2BE2',
  brown: '#A52A2A',
  burlywood: '#DEB887',
  cadetblue: '#5F9EA0',
  chartreuse: '#7FFF00',
  chocolate: '#D2691E',
  coral: '#FF7F50',
  cornflowerblue: '#6495ED',
  cornsilk: '#FFF8DC',
  crimson: '#DC143C',
  cyan: '#00FFFF',
  darkblue: '#00008B',
  darkcyan: '#008B8B',
  darkgoldenrod: '#B8860B',
  darkgray: '#A9A9A9',
  darkgrey: '#A9A9A9',
  darkgreen: '#006400',
  darkkhaki: '#BDB76B',
  darkmagenta: '#8B008B',
  darkolivegreen: '#556B2F',
  darkorange: '#FF8C00',
  darkorchid: '#9932CC',
  darkred: '#8B0000',
  darksalmon: '#E9967A',
  darkseagreen: '#8FBC8F',
  darkslateblue: '#483D8B',
  darkslategray: '#2F4F4F',
  darkslategrey: '#2F4F4F',
  darkturquoise: '#00CED1',
  darkviolet: '#9400D3',
  deeppink: '#FF1493',
  deepskyblue: '#00BFFF',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1E90FF',
  firebrick: '#B22222',
  floralwhite: '#FFFAF0',
  forestgreen: '#228B22',
  fuchsia: '#FF00FF',
  gainsboro: '#DCDCDC',
  ghostwhite: '#F8F8FF',
  gold: '#FFD700',
  goldenrod: '#DAA520',
  gray: '#808080',
  grey: '#808080',
  green: '#008000',
  greenyellow: '#ADFF2F',
  honeydew: '#F0FFF0',
  hotpink: '#FF69B4',
  indianred: '#CD5C5C',
  indigo: '#4B0082',
  ivory: '#FFFFF0',
  khaki: '#F0E68C',
  lavender: '#E6E6FA',
  lavenderblush: '#FFF0F5',
  lawngreen: '#7CFC00',
  lemonchiffon: '#FFFACD',
  lightblue: '#ADD8E6',
  lightcoral: '#F08080',
  lightcyan: '#E0FFFF',
  lightgoldenrodyellow: '#FAFAD2',
  lightgray: '#D3D3D3',
  lightgrey: '#D3D3D3',
  lightgreen: '#90EE90',
  lightpink: '#FFB6C1',
  lightsalmon: '#FFA07A',
  lightseagreen: '#20B2AA',
  lightskyblue: '#87CEFA',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#B0C4DE',
  lightyellow: '#FFFFE0',
  lime: '#00FF00',
  limegreen: '#32CD32',
  linen: '#FAF0E6',
  magenta: '#FF00FF',
  maroon: '#800000',
  mediumaquamarine: '#66CDAA',
  mediumblue: '#0000CD',
  mediumorchid: '#BA55D3',
  mediumpurple: '#9370DB',
  mediumseagreen: '#3CB371',
  mediumslateblue: '#7B68EE',
  mediumspringgreen: '#00FA9A',
  mediumturquoise: '#48D1CC',
  mediumvioletred: '#C71585',
  midnightblue: '#191970',
  mintcream: '#F5FFFA',
  mistyrose: '#FFE4E1',
  moccasin: '#FFE4B5',
  navajowhite: '#FFDEAD',
  navy: '#000080',
  oldlace: '#FDF5E6',
  olive: '#808000',
  olivedrab: '#6B8E23',
  orange: '#FFA500',
  orangered: '#FF4500',
  orchid: '#DA70D6',
  palegoldenrod: '#EEE8AA',
  palegreen: '#98FB98',
  paleturquoise: '#AFEEEE',
  palevioletred: '#DB7093',
  papayawhip: '#FFEFD5',
  peachpuff: '#FFDAB9',
  peru: '#CD853F',
  pink: '#FFC0CB',
  plum: '#DDA0DD',
  powderblue: '#B0E0E6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#FF0000',
  rosybrown: '#BC8F8F',
  royalblue: '#4169E1',
  saddlebrown: '#8B4513',
  salmon: '#FA8072',
  sandybrown: '#F4A460',
  seagreen: '#2E8B57',
  seashell: '#FFF5EE',
  sienna: '#A0522D',
  silver: '#C0C0C0',
  skyblue: '#87CEEB',
  slateblue: '#6A5ACD',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#FFFAFA',
  springgreen: '#00FF7F',
  steelblue: '#4682B4',
  tan: '#D2B48C',
  teal: '#008080',
  thistle: '#D8BFD8',
  tomato: '#FF6347',
  turquoise: '#40E0D0',
  violet: '#EE82EE',
  wheat: '#F5DEB3',
  white: '#FFFFFF',
  whitesmoke: '#F5F5F5',
  yellow: '#FFFF00',
  yellowgreen: '#9ACD32',
});

const DEFAULTS = new Set();

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

DEFAULTS.add(new class extends Factory {
  constructor() {
    super(new RegExp(`^(${Object.keys(NAMES).join('|')})$`));
  }
  
  create(name) {
    const hex = NAMES[name];
    if (!hex) {
      return Color.invalid();
    }
    const int = Number.parseInt(hex.slice(1), 16);
    return new Rgb(int >> 16 & Rgb.MAX, int >> 8 & Rgb.MAX, int & Rgb.MAX);
  }
});

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
