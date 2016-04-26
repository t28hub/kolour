import assert from 'power-assert';
import * as type from '../../src/utils/type.es6';

describe('type', () => {
  describe('.toString(object)', () => {
    [
      {
        argument: null,
        expected: '[object Null]',
      },
      {
        argument: void 0,
        expected: '[object Undefined]',
      },
      {
        argument: true,
        expected: '[object Boolean]',
      },
      {
        argument: 0,
        expected: '[object Number]',
      },
      {
        argument: 'test',
        expected: '[object String]',
      },
      {
        argument: /test/,
        expected: '[object RegExp]',
      },
      {
        argument: ['test'],
        expected: '[object Array]',
      },
      {
        argument: { key: 'test' },
        expected: '[object Object]',
      },
      {
        argument: new Date(),
        expected: '[object Date]',
      },
      {
        argument: new Error('test'),
        expected: '[object Error]',
      },
      {
        argument: () => {
        },
        expected: '[object Function]',
      },
    ].forEach((test) => {
      const { argument, expected } = test;
      it(`should return ${expected} with ${JSON.stringify(argument)}`, () => {
        // exercise
        const actual = type.toString(argument);

        // verify
        assert(actual === expected);
      });
    });
  });

  describe('.isNumber(object)', () => {
    [
      {
        argument: null,
        expected: false,
      },
      {
        argument: undefined,
        expected: false,
      },
      {
        argument: true,
        expected: false,
      },
      {
        argument: 0,
        expected: true,
      },
      {
        argument: NaN,
        expected: true,
      },
      {
        argument: 'test',
        expected: false,
      },
      {
        argument: /test/,
        expected: false,
      },
      {
        argument: ['test'],
        expected: false,
      },
      {
        argument: { key: 'test' },
        expected: false,
      },
      {
        argument: new Date(),
        expected: false,
      },
      {
        argument: new Error('test'),
        expected: false,
      },
      {
        argument: () => {
        },
        expected: false,
      },
    ].forEach((test) => {
      const { argument, expected } = test;
      it(`should return ${expected} with ${JSON.stringify(argument)}`, () => {
        // exercise
        const actual = type.isNumber(argument);

        // verify
        assert(actual === expected);
      });
    });
  });

  describe('.isString(object)', () => {
    [
      {
        argument: null,
        expected: false,
      },
      {
        argument: undefined,
        expected: false,
      },
      {
        argument: true,
        expected: false,
      },
      {
        argument: 0,
        expected: false,
      },
      {
        argument: 'test',
        expected: true,
      },
      {
        argument: /test/,
        expected: false,
      },
      {
        argument: ['test'],
        expected: false,
      },
      {
        argument: { key: 'test' },
        expected: false,
      },
      {
        argument: new Date(),
        expected: false,
      },
      {
        argument: new Error('test'),
        expected: false,
      },
      {
        argument: () => {
        },
        expected: false,
      },
    ].forEach((test) => {
      const { argument, expected } = test;
      it(`should return ${expected} with ${JSON.stringify(argument)}`, () => {
        // exercise
        const actual = type.isString(argument);

        // verify
        assert(actual === expected);
      });
    });
  });

  describe('.isObject(object)', () => {
    [
      {
        argument: null,
        expected: false,
      },
      {
        argument: undefined,
        expected: false,
      },
      {
        argument: true,
        expected: false,
      },
      {
        argument: 0,
        expected: false,
      },
      {
        argument: 'test',
        expected: false,
      },
      {
        argument: /test/,
        expected: false,
      },
      {
        argument: ['test'],
        expected: false,
      },
      {
        argument: { key: 'test' },
        expected: true,
      },
      {
        argument: new Date(),
        expected: false,
      },
      {
        argument: new Error('test'),
        expected: false,
      },
      {
        argument: () => {
        },
        expected: false,
      },
    ].forEach((test) => {
      const { argument, expected } = test;
      it(`should return ${expected} with ${JSON.stringify(argument)}`, () => {
        // exercise
        const actual = type.isObject(argument);

        // verify
        assert(actual === expected);
      });
    });
  });
});
