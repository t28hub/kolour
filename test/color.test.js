jest.dontMock("../src/color");

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
