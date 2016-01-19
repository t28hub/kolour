import Hsv from '../color/hsv';

export default function toHsv(color) {
  let [r, g, b] = color.toBytes().map(value => value / 0xFF);

  let max   = Math.max(r, g, b);
  let min   = Math.min(r, g, b);
  let delta = max - min;
  if (delta === 0) {
    return new Hsv(0, 0, max);
  }

  let h = 0;
  if (max === r) {
    h = 60 * ((g - b) / delta % 6);
  } else if (max === g) {
    h = 60 * ((b - r) / delta + 2);
  } else if (max === b) {
    h = 60 * ((r - g) / delta + 4);
  }

  let s = 0;
  if (max !== 0) {
    s = delta / max;
  }

  let v = max;
  return new Hsv(h, s, v);
}
