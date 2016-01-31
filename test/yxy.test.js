import assert from 'power-assert';
import sinon  from 'sinon';
import Cmy    from '../src/cmy';
import Cmyk   from '../src/cmyk';
import Hsl    from '../src/hsl';
import Hsv    from '../src/hsv';
import Rgb    from '../src/rgb';
import Xyz    from '../src/xyz';
import Yxy    from '../src/yxy';

describe('Yxy', () => {

  describe('.constructor(Y, x, y)', () => {

    it('should create an instance', () => {
      let yxy = new Yxy(21.499, 0.61154, 0.31425);
      assert(yxy !== null);
      assert(yxy instanceof Yxy);
    });

  });

  describe('.prototype.clone()', () => {

    it('should create an instance', () => {
      let source = new Yxy(21.499, 0.61154, 0.31425);
      let cloned = source.clone();
      assert(cloned !== null);
      assert(cloned !== source);
      assert(cloned instanceof Yxy);
      assert.deepEqual(cloned.entries(), source.entries());
    });

  });

  describe('.prototype.isValid()', () => {

    it('should always return false', () => {
      let yxy = new Yxy(21.499, 0.61154, 0.31425);
      assert(yxy.isValid() === false);
    });

  });

  describe('.prototype.cmy()', () => {

    it('should convert color space from Yyx to CMY', () => {
      let yxy = new Yxy(21.499, 0.61154, 0.31425);
      let cmy = yxy.cmy();
      assert(cmy !== null);
      assert(cmy instanceof Cmy);
    });

    it('should delegate a color space conversion process to Xyz', () => {
      let yxy = new Yxy(21.499, 0.61154, 0.31425);
      let xyz = yxy.xyz();
      let spy = sinon.spy(xyz, 'cmy');
      sinon.stub(yxy, 'xyz').returns(xyz);
      let cmy = yxy.cmy();
      assert(spy.callCount === 1);
    });

  });

  describe('.prototype.cmyk()', () => {

    it('should convert color space from Yyx to CMYK', () => {
      let yxy  = new Yxy(21.499, 0.61154, 0.31425);
      let cmyk = yxy.cmyk();
      assert(cmyk !== null);
      assert(cmyk instanceof Cmyk);
    });

    it('should delegate a color space conversion process to Xyz', () => {
      let yxy = new Yxy(21.499, 0.61154, 0.31425);
      let xyz = yxy.xyz();
      let spy = sinon.spy(xyz, 'cmyk');
      sinon.stub(yxy, 'xyz').returns(xyz);
      let cmyk = yxy.cmyk();
      assert(spy.callCount === 1);
    });

  });

  describe('.prototype.hsl()', () => {

    it('should convert color space from Yyx to HSL', () => {
      let yxy = new Yxy(21.499, 0.61154, 0.31425);
      let hsl = yxy.hsl();
      assert(hsl !== null);
      assert(hsl instanceof Hsl);
    });

    it('should delegate a color space conversion process to Xyz', () => {
      let yxy = new Yxy(21.499, 0.61154, 0.31425);
      let xyz = yxy.xyz();
      let spy = sinon.spy(xyz, 'hsl');
      sinon.stub(yxy, 'xyz').returns(xyz);
      let hsl = yxy.hsl();
      assert(spy.callCount === 1);
    });

  });

  describe('.prototype.hsv()', () => {

    it('should convert color space from Yyx to HSV', () => {
      let yxy = new Yxy(21.499, 0.61154, 0.31425);
      let hsv = yxy.hsv();
      assert(hsv !== null);
      assert(hsv instanceof Hsv);
    });

    it('should delegate a color space conversion process to Xyz', () => {
      let yxy = new Yxy(21.499, 0.61154, 0.31425);
      let xyz = yxy.xyz();
      let spy = sinon.spy(xyz, 'hsv');
      sinon.stub(yxy, 'xyz').returns(xyz);
      let hsv = yxy.hsv();
      assert(spy.callCount === 1);
    });

  });

  describe('.prototype.rgb()', () => {

    it('should convert color space from Yyx to RGB', () => {
      let yxy = new Yxy(21.499, 0.61154, 0.31425);
      let rgb = yxy.rgb();
      assert(rgb !== null);
      assert(rgb instanceof Rgb);
    });

    it('should delegate a color space conversion process to Xyz', () => {
      let yxy = new Yxy(21.499, 0.61154, 0.31425);
      let xyz = yxy.xyz();
      let spy = sinon.spy(xyz, 'rgb');
      sinon.stub(yxy, 'xyz').returns(xyz);
      let rgb = yxy.rgb();
      assert(spy.callCount === 1);
    });

  });

  describe('.prototype.xyz()', () => {

    it('should convert color space from Yyx to XYZ', () => {
      let yxy = new Yxy(21.499, 0.61154, 0.31425);
      let xyz = yxy.xyz();
      assert(xyz !== null);
      assert(xyz instanceof Xyz);
    });

  });

  describe('.prototype.yxy()', () => {
    
    it('should return self', () => {
      let yxy = new Yxy(21.499, 0.61154, 0.31425);
      assert(yxy.yxy() === yxy);
    });

  });

  describe('.fromObject(object)', () => {

    it('should create an instance from Object', () => {
      let Y = 21.499;
      let x = 0.61154;
      let y = 0.31425;
      let yxy = Yxy.fromObject({Y, x, y});
      assert(yxy !== null);
      assert(yxy instanceof Yxy);
      assert.deepEqual(yxy.values(), [Y, x, y]);
    });

    it('should return null when a specifed Object does not have required key', () => {
      let Y = 21.499;
      let x = 0.61154;
      let yxy = Yxy.fromObject({Y, x});
      assert(yxy === null);
    });

  });

});
