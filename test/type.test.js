import assert from 'power-assert';
import Type   from '../src/type';

describe('Type', () => {

  describe('.prototype.isString()', () => {

    it('should return true when value is string', () => {
      let type = Type.of('string');
      assert(type.isString());
    });

    it('should return true when value is not string', () => {
      let type = Type.of(null);
      assert(type.isString() === false);
    });

  });

  describe('.prototype.isObject()', () => {

    it('should return true when value is object', () => {
      let type = Type.of({});
      assert(type.isObject());
    });

    it('should return false when value is not object', () => {
      let type = Type.of(null);
      assert(type.isObject() === false);
    });

  });

  describe('.of(value)', () => {

    it('should return an instance that represents string type when value is string', () => {
      let type = Type.of('string');
      assert(type !== null);
      assert(type instanceof Type);
      assert(type.name === 'string');
    });

    it('should return an instance that represents object type when value is object', () => {
      let type = Type.of({});
      assert(type !== null);
      assert(type instanceof Type);
      assert(type.name === 'object');
    });

    it('should return an instance that represents unknown type when value is unsupported', () => {
      let type = Type.of(null);
      assert(type !== null);
      assert(type instanceof Type);
      assert(type.name === 'unknown');
    });

  });

});
