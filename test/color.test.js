jest.autoMockOff();

const Rgb = require('../src/color/rgb').default;

describe('Rgb', () => {

  describe(".constructor", () => {

    it('should create an instance', () => {
      let rgb = new Rgb(32, 64, 128);
      expect(rgb).not.toBeNull();
    });

  });

});
