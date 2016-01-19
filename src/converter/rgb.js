import Rgb from '../color/rgb';

export default function toRgb(bytes) {
  return new Rgb(bytes.shift(), bytes.shift(), bytes.shift());
}
