import Cmy from '../color/cmy';

export default function toCmy(color) {
  let [r, g, b] = color.toBytes();
  return new Cmy(1 - (r / 0xFF), 1 - (g / 0xFF), 1 - (b / 0xFF));
}
