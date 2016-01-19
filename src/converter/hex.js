export default function toHex(color) {
  let values = color.toBytes().slice(0, 3);
  let parts  = [];
  for (let value of values) {
    let hex = value.toString(16);
    if (hex.length === 1) {
      hex = `0${hex}`;
    }
    parts.push(hex.toUpperCase());
  }
  return `#${parts.join('')}`;
}
