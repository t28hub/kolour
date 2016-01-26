import assert from 'power-assert';
import Color  from '../src/color';

describe('Color', () => {

  const NAME = Symbol.for('ABC');
  const KEYS = Object.freeze({
    A: Symbol.for('a'),
    B: Symbol.for('b'),
    C: Symbol.for('c')
  });

  describe('.constructor(space, components)', () => {

    it('should create an instance', () => {
      let color = new Color(NAME, [[KEYS.A, 8], [KEYS.B, 16], [KEYS.C, 32]]);
      assert(color !== null);
    });

    it('should define properties as accessors', () => {
      let color = new Color(NAME, [[KEYS.A, 8], [KEYS.B, 16], [KEYS.C, 32]]);
      assert(color.hasOwnProperty(Symbol.keyFor(KEYS.A)));
      assert(color.hasOwnProperty(Symbol.keyFor(KEYS.B)));
      assert(color.hasOwnProperty(Symbol.keyFor(KEYS.C)));
    });

  });

  describe('.prototype.isValid()', () => {

    it('should always return false', () => {
      let color = new Color(NAME, [[KEYS.A, 8], [KEYS.B, 16], [KEYS.C, 32]]);
      assert(color.isValid() === false);
    });

  });

  describe('.prototype.has(key)', () => {

    it('should return true when a specified key is contained', () => {
      let color = new Color(NAME, [[KEYS.A, 8], [KEYS.B, 16], [KEYS.C, 32]]);
      assert(color.has(KEYS.A));
      assert(color.has(KEYS.B));
      assert(color.has(KEYS.C));
    });

    it('should return false when a specified key is not contained', () => {
      let color = new Color(NAME, [[KEYS.A, 8], [KEYS.B, 16], [KEYS.C, 32]]);
      assert(color.has('a') === false);
      assert(color.has('b') === false);
      assert(color.has('c') === false);
    });

  });

  describe('.prototype.get(key)', () => {

    it('should return value when a specified key exists in a color', () => {
      let color = new Color(NAME, [[KEYS.A, 8], [KEYS.B, 16], [KEYS.C, 32]]);
      assert(color.get(KEYS.A) === 8);
      assert(color.get(KEYS.B) === 16);
      assert(color.get(KEYS.C) === 32);
    });

    it('should throw TypeError when a specified key does not exist in a color', () => {
      let color = new Color(NAME, [[KEYS.A, 8], [KEYS.B, 16], [KEYS.C, 32]]);
      assert.throws(() => {
        color.get('a');
      }, TypeError);
    });

  });

  describe('.prototype.set(key, value)', () => {

    it('should update value when a specified key exists in a color', () => {
      let color = new Color(NAME, [[KEYS.A, 8], [KEYS.B, 16], [KEYS.C, 32]]);
      color.set(KEYS.A, 16);
      color.set(KEYS.B, 32);
      color.set(KEYS.C, 64);
      assert(color.get(KEYS.A) === 16);
      assert(color.get(KEYS.B) === 32);
      assert(color.get(KEYS.C) === 64);
    });

    it('should throw TypeError when a specified key does not exist in a color', () => {
      let color = new Color(NAME, [[KEYS.A, 8], [KEYS.B, 16], [KEYS.C, 32]]);
      assert.throws(() => {
        color.set('a', 16);
      }, TypeError);
    });

  });

  describe('.prototype.keys()', () => {

    it('should return all keys', () => {
      let color = new Color(NAME, [[KEYS.A, 8], [KEYS.B, 16], [KEYS.C, 32]]);
      assert.deepEqual(color.keys(), [KEYS.A, KEYS.B, KEYS.C]);
    });

  });

  describe('.prototype.values()', () => {

    it('should return all values', () => {
      let color = new Color(NAME, [[KEYS.A, 8], [KEYS.B, 16], [KEYS.C, 32]]);
      assert.deepEqual(color.values(), [8, 16, 32]);
    });

  });

  describe('.prototype.entries()', () => {

    it('should return all entries', () => {
      let color = new Color(NAME, [[KEYS.A, 8], [KEYS.B, 16], [KEYS.C, 32]]);
      assert.deepEqual(color.entries(), [[KEYS.A, 8], [KEYS.B, 16], [KEYS.C, 32]]);
    });

  });

  describe('.prototype.a()', () => {

    it('should return a value without value', () => {
      let color = new Color(NAME, [[KEYS.A, 8], [KEYS.B, 16], [KEYS.C, 32]]);
      assert(color.a() === 8);
    });

    it('should update a values with new value', () => {
      let color = new Color(NAME, [[KEYS.A, 8], [KEYS.B, 16], [KEYS.C, 32]]);
      assert(color.a(64) === color);
      assert(color.get(KEYS.A) === 64)
    });

  });

  describe('.fromObject(object)', () => {

    it('should always return null', () => {
      let color = Color.fromObject({});
      assert(color === null);
    });

  });

  describe('.fromString(string)', () => {

    it('should always return null', () => {
      let color = Color.fromString('value');
      assert(color === null);
    });

  });

});
