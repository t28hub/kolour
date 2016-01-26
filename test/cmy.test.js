import assert from 'power-assert';
import Cmy    from '../src/cmy';
import Cmyk   from '../src/cmyk';

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

  describe('.prototype.cmy()', () => {

    it('should return self', () => {
      let cmy = new Cmy(0.5, 0.25, 0.125);
      assert(cmy.cmy() === cmy);
    });

  });

  describe('.prototype.cmyk()', () => {

    it('should convert color space from CMY to CMYK', () => {
      let cmy = new Cmy(0.75, 0.5, 0.25);
      let cmyk = cmy.cmyk();
      assert(cmyk !== null);
      assert(cmyk instanceof Cmyk);
      assert(cmyk.c() === (cmy.c() - 0.25) / (1 - 0.25));
      assert(cmyk.m() === (cmy.m() - 0.25) / (1 - 0.25));
      assert(cmyk.y() === (cmy.y() - 0.25) / (1 - 0.25));
      assert(cmyk.k() === 0.25);
    });

    it('should convert color space from CMY to CMYK when all values are same values', () => {
      let cmy = new Cmy(0.25, 0.25, 0.25);
      let cmyk = cmy.cmyk();
      assert(cmyk !== null);
      assert(cmyk instanceof Cmyk);
      assert.deepEqual(cmyk.values(), [0, 0, 0, 0.25]);
    });

    it('should convert color space from CMY to CMYK when all values are equal to 1', () => {
      let cmy = new Cmy(1, 1, 1);
      let cmyk = cmy.cmyk();
      assert(cmyk !== null);
      assert(cmyk instanceof Cmyk);
      assert.deepEqual(cmyk.values(), [0, 0, 0, 1]);
    });

  });

});
