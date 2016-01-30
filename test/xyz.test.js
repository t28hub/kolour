import assert from 'power-assert';
import sinon  from 'sinon';
import Cmy    from '../src/cmy';
import Cmyk   from '../src/cmyk';
import Hsl    from '../src/hsl';
import Hsv    from '../src/hsv';
import Xyz    from '../src/xyz';

describe('Xyz', () => {

  describe('.constructor(x, y, z)', () => {

    it('should create an instace', () => {
      let xyz = new Xyz(41.838, 21.499, 5.077);
      assert(xyz !== null);
      assert(xyz instanceof Xyz);
    });

  });

  describe('.prototype.clone()', () => {

    it('should clone an instace', () => {
      let source = new Xyz(41.838, 21.499, 5.077);
      let cloned = source.clone();
      assert(cloned !== null);
      assert(cloned !== source);
      assert(cloned instanceof Xyz);
      assert.deepEqual(cloned.entries(), source.entries());
    });

  });

  describe('.prototype.cmy()', () => {

    it('should convert color space from XYZ to CMY', () => {
      let xyz = new Xyz(41.838, 21.499, 5.077);
      let cmy = xyz.cmy();
      assert(cmy !== null);
      assert(cmy instanceof Cmy);
    });

    it('should delegate a color space conversion process to Rgb', () => {
      let xyz = new Xyz(41.838, 21.499, 5.077);
      let rgb = xyz.rgb();
      let spy = sinon.spy(rgb, 'cmy');
      sinon.stub(xyz, 'rgb').returns(rgb);
      let cmy = xyz.cmy();
      assert(spy.callCount === 1);
    });

  });

  describe('.prototype.cmyk()', () => {

    it('should convert color space from XYZ to CMYK', () => {
      let xyz  = new Xyz(41.838, 21.499, 5.077);
      let cmyk = xyz.cmyk();
      assert(cmyk !== null);
      assert(cmyk instanceof Cmyk);
    });

    it('should delegate a color space conversion process to Rgb', () => {
      let xyz = new Xyz(41.838, 21.499, 5.077);
      let rgb = xyz.rgb();
      let spy = sinon.spy(rgb, 'cmyk');
      sinon.stub(xyz, 'rgb').returns(rgb);
      let cmyk = xyz.cmyk();
      assert(spy.callCount === 1);
    });

  });

  describe('.prototype.hsl()', () => {

    it('should convert color space from XYZ to HSL', () => {
      let xyz = new Xyz(41.838, 21.499, 5.077);
      let hsl = xyz.hsl();
      assert(hsl !== null);
      assert(hsl instanceof Hsl);
    });

    it('should delegate a color space conversion process to Rgb', () => {
      let xyz = new Xyz(41.838, 21.499, 5.077);
      let rgb = xyz.rgb();
      let spy = sinon.spy(rgb, 'hsl');
      sinon.stub(xyz, 'rgb').returns(rgb);
      let hsl = xyz.hsl();
      assert(spy.callCount === 1);
    });

  });

  describe('.prototype.hsv()', () => {

    it('should convert color space from XYZ to hsv', () => {
      let xyz = new Xyz(41.838, 21.499, 5.077);
      let hsv = xyz.hsv();
      assert(hsv !== null);
      assert(hsv instanceof Hsv);
    });

    it('should delegate a color space conversion process to Rgb', () => {
      let xyz = new Xyz(41.838, 21.499, 5.077);
      let rgb = xyz.rgb();
      let spy = sinon.spy(rgb, 'hsv');
      sinon.stub(xyz, 'rgb').returns(rgb);
      let hsv = xyz.hsv();
      assert(spy.callCount === 1);
    });

  });

});
