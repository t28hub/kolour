import assert from 'power-assert';
import Cmyk   from '../src/cmyk';

describe('Cmyk', () => {

  describe('.constructor(c, m, y, k)', () => {

    it('should create an instance', () => {
      let cmyk = new Cmyk(0.2, 0.4, 0.6, 0.8);
      assert(cmyk !== null);
      assert.deepEqual(cmyk.values(), [0.2, 0.4, 0.6, 0.8]);
    });

  });

  describe('.prototype.clone()', () => {

    it('should clone an instance', () => {
      let source = new Cmyk(0.2, 0.4, 0.6, 0.8);
      let cloned = source.clone();
      assert(cloned !== null);
      assert(cloned !== source);
      assert(cloned instanceof Cmyk);
      assert.deepEqual(cloned.entries(), source.entries());
    });

  });

  describe('.prototype.isValid()', () => {
    const TESTS = Object.freeze([
      {args: [  0,   0,   0,   0], 'expected': true},
      {args: [0.2, 0.4, 0.6, 0.8], 'expected': true},
      {args: [  0,   0,   0,   1], 'expected': true},
      {args: [  1,   1,   1,   0], 'expected': true},
      {args: [NaN, 0.4, 0.6, 0.8], 'expected': false},
      {args: ['a', 0.4, 0.6, 0.8], 'expected': false},
      {args: [ -1, 0.4, 0.6, 0.8], 'expected': false},
      {args: [1.1, 0.4, 0.6, 0.8], 'expected': false},
    ]);

    TESTS.forEach((test) => {
      let args     = test.args;
      let expected = test.expected
      it(`should return ${expected} with [${args}]`, () => {
        let cmyk = new Cmyk(...args);
        assert(cmyk.isValid() === expected);
      });
    });

  });

});
