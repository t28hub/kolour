export default function toHex(bytes) {
  // Remove last element that is an alpha value
  bytes.pop();

  let parts = [];
  for (let value of bytes) {
    let hex = value.toString(16);
    if (hex.length === 1) {
      hex = `0${hex}`;
    }
    parts.push(hex.toUpperCase());
  }
  return `#${parts.join('')}`;
}
