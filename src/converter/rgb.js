import Rgb from '../color/rgb';

export default function toRgb(color) {
  return new Rgb(...color.toBytes());
}
