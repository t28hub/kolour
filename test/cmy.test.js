import assert from 'power-assert';
import sinon  from 'sinon';
import Cmy    from '../src/cmy';
import Cmyk   from '../src/cmyk';
import Hsl    from '../src/hsl';
import Hsv    from '../src/hsv';
import Rgb    from '../src/rgb';
import Xyz    from '../src/xyz';
import Yxy    from '../src/yxy';

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

  describe('.prototype.hsl()', () => {

    it('should convert color space from CMY to HSL', () => {
      let cmy = new Cmy(0.75, 0.5, 0.25);
      let hsl = cmy.hsl();
      assert(hsl !== null);
      assert(hsl instanceof Hsl);
    });

    it('should delegate a color space conversion process to Rgb', () => {
      let cmy  = new Cmy(1, 1, 1);
      let rgb  = new Rgb(0, 0, 0);
      let spy  = sinon.spy(rgb, 'hsl');
      let stub = sinon.stub(cmy, 'rgb');
      stub.returns(rgb);
      let hsl = cmy.hsl();
      assert(spy.callCount === 1);
    });

  });

  describe('.prototype.hsv()', () => {

    it('should convert color space from CMY to HSV', () => {
      let cmy = new Cmy(0.75, 0.5, 0.25);
      let hsv = cmy.hsv();
      assert(hsv !== null);
      assert(hsv instanceof Hsv);
    });

    it('should delegate a color space conversion process to Rgb', () => {
      let cmy  = new Cmy(1, 1, 1);
      let rgb  = new Rgb(0, 0, 0);
      let spy  = sinon.spy(rgb, 'hsv');
      let stub = sinon.stub(cmy, 'rgb');
      stub.returns(rgb);
      let hsv = cmy.hsv();
      assert(spy.callCount === 1);
    });

  });

  describe('.prototype.xyz()', () => {

    it('should convert color space from CMY to XYZ', () => {
      let cmy = new Cmy(0.75, 0.5, 0.25);
      let rgb = cmy.rgb();
      assert(rgb !== null);
      assert(rgb instanceof Rgb);
      assert(rgb.isValid());
      assert.deepEqual(rgb.values(), [64, 128, 191]);
    });

  });

  describe('.prototype.xyz()', () => {

    it('should convert color space from CMY to XYZ', () => {
      let cmy = new Cmy(0.75, 0.5, 0.25);
      let xyz = cmy.xyz();
      assert(xyz !== null);
      assert(xyz instanceof Xyz);
    });

    it('should delegate a color space conversion process to Rgb', () => {
      let cmy  = new Cmy(1, 1, 1);
      let rgb  = new Rgb(0, 0, 0);
      let spy  = sinon.spy(rgb, 'xyz');
      let stub = sinon.stub(cmy, 'rgb');
      stub.returns(rgb);
      let xyz = cmy.xyz();
      assert(spy.callCount === 1);
    });

  });

  describe('.prototype.yxy()', () => {

    it('should convert color space from CMY to Yxy', () => {
      let cmy = new Cmy(0.75, 0.5, 0.25);
      let yxy = cmy.yxy();
      assert(yxy !== null);
      assert(yxy instanceof Yxy);
    });

    it('should delegate a color space conversion process to Rgb', () => {
      let cmy  = new Cmy(1, 1, 1);
      let rgb  = new Rgb(0, 0, 0);
      let spy  = sinon.spy(rgb, 'yxy');
      let stub = sinon.stub(cmy, 'rgb');
      stub.returns(rgb);
      let xyz = cmy.yxy();
      assert(spy.callCount === 1);
    });

  });

  describe('.fromObject(object)', () => {
    
    it('should create an instance from an Object', () => {
      let cmy = Cmy.fromObject({c: 0.75, m: 0.5, y: 0.25});
      assert(cmy !== null);
      assert(cmy instanceof Cmy);
      assert.deepEqual(cmy.values(), [0.75, 0.5, 0.25]);
    });

    it('should create an instance from an Object when the Object has keys that are upper case char', () => {
      let cmy = Cmy.fromObject({C: 0.75, M: 0.5, Y: 0.25});
      assert(cmy !== null);
      assert(cmy instanceof Cmy);
      assert.deepEqual(cmy.values(), [0.75, 0.5, 0.25]);
    });

    it('should return null from Object when the Object does not have necessary key', () => {
      let cmy = Cmy.fromObject({c: 0.75, m: 0.5});
      assert(cmy === null);
    });

  });

});
