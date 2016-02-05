import assert from 'power-assert';
import Type   from '../src/type';

describe('Type', () => {

  describe('.of(value)', () => {

    it('should create an instance of Type', () => {
      let type = Type.of('string');
      assert(type !== null);
      assert(type instanceof Type);
    });

  });

});
