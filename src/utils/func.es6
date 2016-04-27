const MIN_H = 0;
const MAX_H = 360;

/**
 * Normalizes the hue value
 * @param {number} hue - The hue to be normalized
 * @returns {number} A normalized hue
 */
export function normalizedHue(hue) {
  let normalized = hue % MAX_H;
  if (normalized < MIN_H) {
    normalized += MAX_H;
  }
  return normalized;
}
