jest.dontMock("../src/space.js");

const Rgb = require("../src/space").Rgb;

describe("Rgb", () => {

  describe(".constructor(r, g, b)", () => {

    it("should create an instance appropriately", () => {
      // exercise
      let rgb = new Rgb(0, 0, 0);

      // verify
      expect(rgb).not.toBeNull();
    });

  });

  describe(".toString()", () => {

    it("should return a text that is specified with rgb(r, g, b)", () => {
      // setup
      let rgb = new Rgb(32, 64, 128);

      // exercise
      let string = rgb.toString();

      // verify
      expect(string).toBe("rgb(32, 64, 128)");
    });

  });

});
