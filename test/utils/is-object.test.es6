import assert from 'power-assert';
import isObject from '../../src/utils/is-object.es6';

describe('isObject(object)', () => {
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
      const actual = isObject(argument);

      // verify
      assert(actual === expected);
    });
  });
});
