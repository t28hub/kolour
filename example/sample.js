import kolour from '../src/kolour';

const color = kolour({ r: 255, g: 0, b: 255 });

console.log([
  color.lighten(0.1).toString(),
  color.darken(0.1).toString(),
  color.grayscale(),
  color.whiten(0.1),
  color.blacken(0.1),
  color.invert(),
].join("\n"));