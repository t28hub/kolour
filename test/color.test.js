jest.autoMockOff();

const Color = require("../src/color").default;

describe("Color", () => {

  describe("#toString", () => {

    it("should return 'color'", () => {
      // setup
      let color = new Color();

      // exercise
      let string = color.toString();

      // verify
      expect(string).toBe('color');
    });

  });

});

const Rgb = require('../src/color/rgb').default;

describe('Rgb', () => {

  describe(".constructor", () => {

    it('should create an instance', () => {
      let rgb = new Rgb(32, 64, 128);
      expect(rgb).not.toBeNull();
    });

  });

});
