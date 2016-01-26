import assert from 'power-assert';
import Cmy    from '../src/cmy';

describe('Cmy', () => {

  describe('.constructor(c, m, y)', () => {

    it('should create an instance', () => {
      let cmy = new Cmy(0.5, 0.25, 0.125);
      assert(cmy !== null);
      assert(`[c=${cmy.c()}, m=${cmy.m()}, y=${cmy.y()}]` === '[c=0.5, m=0.25, y=0.125]');
    });

  });

  describe('.prototype.clone()', () => {

    it('should clone an instance', () => {
      let source = new Cmy(0.5, 0.25, 0.125);
      let cloned = source.clone();
      assert(cloned !== null);
      assert(cloned !== source);
      assert(cloned instanceof Cmy);
      assert.deepEqual(cloned.entries(), source.entries());
    });

  });

  describe('.prototype.isValid()', () => {

    it('should return true when all values are finite number and in a range', () => {
      let cmy = new Cmy(0.5, 0.25, 0.125);
      assert(cmy.isValid());
    });

    it('should return true when a value is equal to minimum value', () => {
      let cmy = new Cmy(0, 0.125, 0.25);
      assert(cmy.isValid());
    });

    it('should return true when a value is equal to maximum value', () => {
      let cmy = new Cmy(1, 0.5, 0.25);
      assert(cmy.isValid());
    });

    it('should return faluse when a value is not a finite number', () => {
      let cmy = new Cmy(NaN, 0.5, 0.25);
      assert(cmy.isValid() === false);
    });

    it('should return faluse when a value is not a number', () => {
      let cmy = new Cmy('0.5', 0.25, 0.125);
      assert(cmy.isValid() === false);
    });

    it('should return faluse when a value is less than minimum value', () => {
      let cmy = new Cmy(-0.5, 0.25, 0.125);
      assert(cmy.isValid() === false);
    });

    it('should return faluse when a value is greater than minimum value', () => {
      let cmy = new Cmy(1.125, 1, 0.875);
      assert(cmy.isValid() === false);
    });

  });

});
