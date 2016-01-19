import Cmy from '../color/cmy';

export default function toCmy(bytes) {
  let r = bytes.shift();
  let g = bytes.shift();
  let b = bytes.shift();
  return new Cmy(1 - (r / 0xFF), 1 - (g / 0xFF), 1 - (b / 0xFF));
}
