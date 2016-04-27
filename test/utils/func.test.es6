import assert from 'power-assert';
import * as func from '../../src/utils/func.es6';

describe('func', () => {
  describe('.normalizeHue(hue)', () => {
    [
      {
        argument: -120,
        expected: 240,
      },
      {
        argument: 0,
        expected: 0,
      },
      {
        argument: 120,
        expected: 120,
      },
      {
        argument: 360,
        expected: 0,
      },
      {
        argument: 480,
        expected: 120,
      },
    ].forEach((test) => {
      const {argument, expected} = test;
      it(`should return ${expected} when the specified value is ${argument}`, () => {
        // exercise
        const actual = func.normalizedHue(argument);

        // verify
        assert(actual === expected);
      });
    });
  });
});