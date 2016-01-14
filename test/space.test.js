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

});
