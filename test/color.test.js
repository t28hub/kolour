jest.autoMockOff();

const Rgb = require('../src/color/rgb').default;

describe('Rgb', () => {

  describe('.constructor', () => {

    it('should create an instance', () => {
      let rgb = new Rgb(32, 64, 128);
      expect(rgb).not.toBeNull();
    });

  });

  describe('.prorotype.hsl()', () => {

    it('should create an instance', () => {
      let rgb = new Rgb(32, 64, 128);
      let hsl = rgb.hsl();
      expect(hsl).not.toBeNull();
    });

  });

  describe('.prorotype.hsv()', () => {

    it('should create an instance', () => {
      let rgb = new Rgb(32, 64, 128);
      let hsv = rgb.hsv();
      expect(hsv).not.toBeNull();
    });

  });

  describe('.prorotype.cmy()', () => {

    it('should create an instance', () => {
      let rgb = new Rgb(32, 64, 128);
      let cmy = rgb.cmy();
      expect(cmy).not.toBeNull();
    });

  });

  describe('.prorotype.cmyk()', () => {

    it('should create an instance', () => {
      let rgb  = new Rgb(32, 64, 128);
      let cmyk = rgb.cmyk();
      expect(cmyk).not.toBeNull();
    });

  });

});
