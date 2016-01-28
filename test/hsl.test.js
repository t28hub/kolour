import assert from 'power-assert';
import sinon  from 'sinon';
import Cmy    from '../src/cmy';
import Cmyk   from '../src/cmyk';
import Hsl    from '../src/hsl';
import Hsv    from '../src/hsv';
import Rgb    from '../src/rgb';
import Xyz    from '../src/xyz';
import Yxy    from '../src/yxy';

describe('Hsl', () => {

  describe('.constructor(h, s, l)', () => {

    it('should create an instance', () => {
      let hsl = new Hsl(60, 0.1, 0.1);
      assert(hsl !== null);
      assert.deepEqual(hsl.values(), [60, 0.1, 0.1]);
    });

  });

  describe('.prototype.clone()', () => {

    it('should create an instance', () => {
      let source = new Hsl(60, 0.1, 0.1);
      let cloned = source.clone();
      assert(cloned !== null);
      assert(cloned !== source);
      assert(cloned instanceof Hsl);
      assert.deepEqual(cloned.entries(), source.entries());
    });

  });

  describe('.prototype.isValid()', () => {

    [
      {args: [  0,   0,     0], expected: true},
      {args: [360,   1,     1], expected: true},
      {args: [180,  0.5,  0.5], expected: true},
      {args: [1.2,  0.5,  0.5], expected: false},
      {args: [ -1,  0.5,  0.5], expected: false},
      {args: [361,  0.5,  0.5], expected: false},
      {args: [NaN,  0.5,  0.5], expected: false},
      {args: ['6',  0.5,  0.5], expected: false},
      {args: [180, -0.1,  0.5], expected: false},
      {args: [180,  1.1,  0.5], expected: false},
      {args: [180,  NaN,  0.5], expected: false},
      {args: [180,  '1',  0.5], expected: false},
      {args: [180,  0.5, -0.1], expected: false},
      {args: [180,  0.5,  1.1], expected: false},
      {args: [180,  0.5,  NaN], expected: false},
      {args: [180,  0.5,  '1'], expected: false},
    ].forEach(test => {
      let args     = test.args;
      let expected = test.expected;
      it(`should return ${expected} with [${args}]`, () => {
        let hsl = new Hsl(...args);
        assert(hsl.isValid() === expected);
      });
    });

  });

  describe('.prototype.xyz()', () => {

    it('should convert color space from HSL to XYZ', () => {
      let hsl = new Hsl(180, 0.5, 0.5);
      let xyz = hsl.xyz();
      assert(xyz !== null);
      assert(xyz instanceof Xyz);
    });

    it('should delegate a color space conversion process to Rgb', () => {
      let hsl  = new Hsl(180, 0.5, 0.5);
      let rgb  = hsl.rgb();
      let spy  = sinon.spy(rgb, 'xyz');
      sinon.stub(hsl, 'rgb').returns(rgb);
      let xyz = hsl.xyz();
      assert(spy.callCount === 1);
    });

  });

  describe('.prototype.yxy()', () => {

    it('should convert color space from HSL to Yxy', () => {
      let hsl = new Hsl(180, 0.5, 0.5);
      let yxy = hsl.yxy();
      assert(yxy !== null);
      assert(yxy instanceof Yxy);
    });

    it('should delegate a color space conversion process to Rgb', () => {
      let hsl  = new Hsl(180, 0.5, 0.5);
      let rgb  = hsl.rgb();
      let spy  = sinon.spy(rgb, 'yxy');
      sinon.stub(hsl, 'rgb').returns(rgb);
      let yxy = hsl.yxy();
      assert(spy.callCount === 1);
    });

  });

});
