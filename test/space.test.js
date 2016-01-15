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

  describe(".isValid()", () => {

    it("should return true if all values are in range", () => {
      // setup
      let rgb = new Rgb(32, 64, 128);

      // exercise
      let isValid = rgb.isValid();

      // verify
      expect(isValid).toBeTruthy();
    });

    it("should return true if a value is minimum boundary value", () => {
      // setup
      let rgb = new Rgb(32, 64, 0);

      // exercise
      let isValid = rgb.isValid();

      // verify
      expect(isValid).toBeTruthy();
    });

    it("should return true if a value is maximum boundary value", () => {
      // setup
      let rgb = new Rgb(32, 64, 255);

      // exercise
      let isValid = rgb.isValid();

      // verify
      expect(isValid).toBeTruthy();
    });

    it("should return false if a value is less than minimum boundary value", () => {
      // setup
      let rgb = new Rgb(32, 64, -1);

      // exercise
      let isValid = rgb.isValid();

      // verify
      expect(isValid).not.toBeTruthy();
    });

    it("should return false if a value is greater than maximum boundary value", () => {
      // setup
      let rgb = new Rgb(32, 64, 256);

      // exercise
      let isValid = rgb.isValid();

      // verify
      expect(isValid).not.toBeTruthy();
    });

  });

});
