import Cmyk from '../color/cmyk';

export default function toCmyk(color) {
  let [r, g, b] = color.toBytes().map(value => value / 0xFF);
  let k = 1 - Math.max(r, g, b);
  if (k === 1) {
    return new Cmyk(0, 0, 0, k);
  }

  return new Cmyk(
      (1 - r - k) / (1 - k),
      (1 - g - k) / (1 - k),
      (1 - b - k) / (1 - k),
      k
  );
}
