import Color from './color';
import Rgb   from './rgb';

const NAME = Symbol.for();
const KEYS = Object.freeze({
  Y:  Symbol.for('y'),
  DB: Symbol.for('db'),
  DR: Symbol.for('dr')
});

export default class YDbDr extends Color {
  constructor(y, db, dr) {
    super(NAME, [[KEYS.Y, y], [KEYS.DB, db], [KEYS.DR, dr]]);
  }

  rgb() {
    const [y, db, dr] = this.values();

    let r = y + 0.000092303716148 * db - 0.525912630661865 * dr;
    let g = y - 0.129132898890509 * db + 0.267899328207599 * dr;
    let b = y + 0.664679059978955 * db - 0.000079202543533 * dr;
    [r, g, b] = [r, g, b].map((value) => { Math.round(value * 0xFF) });
    return new Rgb(r, g, b);
  }

  ydbdr() {
    return this;
  }
}
