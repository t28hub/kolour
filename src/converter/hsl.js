import Hsl from '../color/hsl';

export default function toHsl(bytes) {
  let r = bytes.shift() / 0xFF;
  let g = bytes.shift() / 0xFF;
  let b = bytes.shift() / 0xFF;

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
