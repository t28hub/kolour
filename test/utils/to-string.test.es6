import assert from 'power-assert';
import toString from '../../src/utils/to-string.es6';

describe('toString(object)', () => {
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
      const actual = toString(argument);

      // verify
      assert(actual === expected);
    });
  });
});
