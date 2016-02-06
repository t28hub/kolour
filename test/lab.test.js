import assert from 'power-assert';
import sinon  from 'sinon';
import Cmy    from '../src/cmy';
import Cmyk   from '../src/cmyk';
import Hsl    from '../src/hsl';
import Hsv    from '../src/hsv';
import Hwb    from '../src/hwb';
import Lab    from '../src/lab';
import Luv    from '../src/luv';
import Rgb    from '../src/rgb';
import Xyz    from '../src/xyz';
import Yuv    from '../src/yuv';
import Yxy    from '../src/yxy';

describe('Lab', () => {

  describe('.constructor(l, a, b)', () => {

    it('should create an instance', () => {
      let lab = new Lab(42.782, 63.477, 7.189);
      assert(lab !== null);
      assert(lab instanceof Lab);
      assert.deepEqual(lab.values(), [42.782, 63.477, 7.189]);
    });

  });

  describe('.prototype.clone()', () => {

    it('should create a new instance', () => {
      let source = new Lab(42.782, 63.477, 7.189);
      let cloned = source.clone();
      assert(source !== null);
      assert(source !== cloned);
      assert(source instanceof Lab);
      assert.deepEqual(source.values(), cloned.values());
    });

  });

  describe('.prototype.cmy()', () => {

    it('should convert color space from L*a*b to CMY', () => {
      let lab = new Lab(42.782, 63.477, 7.189);
      let cmy = lab.cmy();
      assert(cmy !== null);
      assert(cmy instanceof Cmy);
    });

  });

  describe('.prototype.cmyk()', () => {

    it('should convert color space from L*a*b to CMYK', () => {
      let lab = new Lab(42.782, 63.477, 7.189);
      let cmyk = lab.cmyk();
      assert(cmyk !== null);
      assert(cmyk instanceof Cmyk);
    });

  });

  describe('.prototype.hsl()', () => {

    it('should convert color space from L*a*b to HSL', () => {
      let lab = new Lab(42.782, 63.477, 7.189);
      let hsl = lab.hsl();
      assert(hsl !== null);
      assert(hsl instanceof Hsl);
    });

  });

  describe('.prototype.hsv()', () => {

    it('should convert color space from L*a*b to HSV', () => {
      let lab = new Lab(42.782, 63.477, 7.189);
      let hsv = lab.hsv();
      assert(hsv !== null);
      assert(hsv instanceof Hsv);
    });

  });

  describe('.prototype.hwb()', () => {

    it('should convert color space from L*a*b to HWB', () => {
      let lab = new Lab(42.782, 63.477, 7.189);
      let hwb = lab.hwb();
      assert(hwb !== null);
      assert(hwb instanceof Hwb);
    });

  });

  describe('.prototype.lab()', () => {

    it('should return self', () => {
      let lab = new Lab(42.782, 63.477, 7.189);
      assert(lab.lab() === lab);
    });

  });

  describe('.prototype.luv()', () => {

    it('should convert color space from L*a*b to LUV', () => {
      let lab = new Lab(42.782, 63.477, 7.189);
      let luv = lab.luv();
      assert(luv !== null);
      assert(luv instanceof Luv);
    });

  });

  describe('.prototype.luv()', () => {

    it('should convert color space from L*a*b* to RGB', () => {
      let lab = new Lab(42.782, 63.477, 7.189);
      let rgb = lab.rgb();
      assert(rgb !== null);
      assert(rgb instanceof Rgb);
    });

  });

  describe('.prototype.xyz()', () => {

    it('should convert color space from L*a*b* to XYZ', () => {
      let lab = new Lab(42.782, 63.477, 7.189);
      let xyz = lab.xyz();
      assert(xyz !== null);
      assert(xyz instanceof Xyz);
    });

  });

  describe('.prototype.yuv()', () => {

    it('should convert color space from L*a*b* to YUV', () => {
      let lab = new Lab(42.782, 63.477, 7.189);
      let yuv = lab.yuv();
      assert(yuv !== null);
      assert(yuv instanceof Yuv);
    });

  });

  describe('.prototype.yxy()', () => {

    it('should convert color space from L*a*b* to YXY', () => {
      let lab = new Lab(42.782, 63.477, 7.189);
      let yxy = lab.yxy();
      assert(yxy !== null);
      assert(yxy instanceof Yxy);
    });

  });

});
