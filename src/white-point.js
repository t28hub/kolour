export default class WhitePoint {
  constructor(x, y, z) {
    Object.defineProperties(this, {
      x: {value: x, enumerable: true},
      y: {value: y, enumerable: true},
      z: {value: z, enumerable: true}
    });
  }
}
