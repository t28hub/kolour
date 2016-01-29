import assert from 'power-assert';
import sinon  from 'sinon';
import Cmy    from '../src/cmy';
import Cmyk   from '../src/cmyk';
import Hsl    from '../src/hsl';
import Hsv    from '../src/hsv';
import Rgb    from '../src/rgb';
import Xyz    from '../src/xyz';
import Yxy    from '../src/yxy';

describe('Hsv', () => {

  describe('.constructor(h, s, v)', () => {

    it('should create an instance', () => {
      let hsv = new Hsv(60, 0.1, 0.1);
      assert(hsv !== null);
      assert.deepEqual(hsv.values(), [60, 0.1, 0.1]);
    });

  });

  describe('.prototype.clone()', () => {

    it('should create an instance', () => {
      let source = new Hsv(60, 0.1, 0.1);
      let cloned = source.clone();
      assert(cloned !== null);
      assert(cloned !== source);
      assert(cloned instanceof Hsv);
      assert.deepEqual(cloned.entries(), source.entries());
    });

  });

  describe('.prototype.cmy()', () => {

    it('should convert color space from HSV to CMY', () => {
      let hsv = new Hsv(60, 0.5, 0.5);
      let cmy = hsv.cmy();
      assert(cmy !== null);
      assert(cmy instanceof Cmy);
    });

    it('should delegate a color space conversion process to Rgb', () => {
      let hsv = new Hsv(60, 0.5, 0.5);
      let rgb = hsv.rgb();
      let spy = sinon.spy(rgb, 'cmy');
      sinon.stub(hsv, 'rgb').returns(rgb);
      let cmy = hsv.cmy();
      assert(spy.callCount === 1);
    });

  });

  describe('.prototype.cmyk()', () => {

    it('should convert color space from HSV to CMYK', () => {
      let hsv  = new Hsv(60, 0.5, 0.5);
      let cmyk = hsv.cmyk();
      assert(cmyk !== null);
      assert(cmyk instanceof Cmyk);
    });

    it('should delegate a color space conversion process to Rgb', () => {
      let hsv = new Hsv(60, 0.5, 0.5);
      let rgb = hsv.rgb();
      let spy = sinon.spy(rgb, 'cmyk');
      sinon.stub(hsv, 'rgb').returns(rgb);
      let cmyk = hsv.cmyk();
      assert(spy.callCount === 1);
    });

  });

  describe('.prototype.hsl()', () => {

    it('should convert color space from HSV to HSL', () => {
      let hsv = new Hsv(60, 0.5, 0.5);
      let hsl = hsv.hsl();
      assert(hsl !== null);
      assert(hsl instanceof Hsl);
    });

    it('should delegate a color space conversion process to Rgb', () => {
      let hsv = new Hsv(60, 0.5, 0.5);
      let rgb = hsv.rgb();
      let spy = sinon.spy(rgb, 'hsl');
      sinon.stub(hsv, 'rgb').returns(rgb);
      let hsl = hsv.hsl();
      assert(spy.callCount === 1);
    });

  });

  describe('.prototype.hsv()', () => {

    it('should return self', () => {
      let hsv = new Hsv(60, 0.5, 0.5);
      assert(hsv.hsv() === hsv);
    });

  });

  describe('.prototype.hsl()', () => {

    it('should convert color space from HSV to RGB when hue is less equal than 60', () => {
      let hsv = new Hsv(0, 0.5, 0.5);
      let rgb = hsv.rgb();
      assert(rgb !== null);
      assert(rgb instanceof Rgb);
    });

    it('should convert color space from HSV to RGB when hue is greater than 60', () => {
      let hsv = new Hsv(61, 0.5, 0.5);
      let rgb = hsv.rgb();
      assert(rgb !== null);
      assert(rgb instanceof Rgb);
    });

    it('should convert color space from HSV to RGB when hue is greater than 120', () => {
      let hsv = new Hsv(121, 0.5, 0.5);
      let rgb = hsv.rgb();
      assert(rgb !== null);
      assert(rgb instanceof Rgb);
    });

  });

  describe('.prototype.xyz()', () => {

    it('should convert color space from HSV to XYZ', () => {
      let hsv = new Hsv(60, 0.5, 0.5);
      let xyz = hsv.xyz();
      assert(xyz !== null);
      assert(xyz instanceof Xyz);
    });

    it('should delegate a color space conversion process to Rgb', () => {
      let hsv = new Hsv(60, 0.5, 0.5);
      let rgb = hsv.rgb();
      let spy = sinon.spy(rgb, 'xyz');
      sinon.stub(hsv, 'rgb').returns(rgb);
      let xyz = hsv.xyz();
      assert(spy.callCount === 1);
    });

  });

  describe('.prototype.yxy()', () => {

    it('should convert color space from HSV to Yxy', () => {
      let hsv = new Hsv(60, 0.5, 0.5);
      let yxy = hsv.yxy();
      assert(yxy !== null);
      assert(yxy instanceof Yxy);
    });

    it('should delegate a color space conversion process to Rgb', () => {
      let hsv = new Hsv(60, 0.5, 0.5);
      let rgb = hsv.rgb();
      let spy = sinon.spy(rgb, 'yxy');
      sinon.stub(hsv, 'rgb').returns(rgb);
      let yxy = hsv.yxy();
      assert(spy.callCount === 1);
    });

  });

});
