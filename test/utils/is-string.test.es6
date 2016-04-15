import assert from 'power-assert';
import isString from '../../src/utils/is-string.es6';

describe('isString(object)', () => {

  [
    {argument: null,              expected: false},
    {argument: undefined,         expected: false},
    {argument: true,              expected: false},
    {argument: 0,                 expected: false},
    {argument: 'test',            expected: true},
    {argument: /test/,            expected: false},
    {argument: ['test'],          expected: false},
    {argument: {key: 'test'},     expected: false},
    {argument: new Date(),        expected: false},
    {argument: new Error('test'), expected: false},
    {argument: function () {},    expected: false}
  ].forEach((test) => {

    const {argument, expected} = test;

    it(`should return ${expected} with ${JSON.stringify(argument)}`, () => {
      // exercise
      const actual = isString(argument);

      // verify
      assert(actual === expected);
    });

  });

});
