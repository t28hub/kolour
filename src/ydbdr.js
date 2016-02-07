import Color from './color';

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
}
