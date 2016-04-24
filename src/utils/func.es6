import { NO_ALPHA, MIN_ALPHA, MAX_ALPHA } from '../color/color.es6';
import Hsl from '../color/hsl.es6';
import Hwb from '../color/hwb.es6';
import Rgb from '../color/rgb.es6';
import validator from './validator.es6';
import { clamp } from './math.es6';

const MIN_AMOUNT = 0;
const MAX_AMOUNT = 1;

export const DEFAULT_AMOUNT = 0.5;

/**
 * Increases the saturation of a color by a specified amount
 * @param {Color} color - The color to be increased the saturation
 * @param {number} amount - The percentage 0..1
 * @returns {Color} A saturated color
 * @see desaturate
 */
export function saturate(color, amount) {
  validator(color, 'color').isValid();
  validator(amount, 'amount').isFinite().inRange(MIN_AMOUNT, MAX_AMOUNT);

  const hsl = color.hsl();
  const saturation = (hsl.s() / Hsl.MAX_S + amount) * Hsl.MAX_S;
  hsl.s(clamp(saturation, Hsl.MIN_S, Hsl.MAX_S));
  return hsl[color.name.toLowerCase()]();
}

/**
 * Decreases the saturation of a color by a specified amount
 * @param {Color} color - The color to be decreased the saturation
 * @param {number} amount - The percentage 0..1
 * @returns {Color} A desaturated color
 * @see saturate
 */
export function desaturate(color, amount) {
  validator(color, 'color').isValid();
  validator(amount, 'amount').isFinite().inRange(MIN_AMOUNT, MAX_AMOUNT);

  const hsl = color.hsl();
  const saturation = (hsl.s() / Hsl.MAX_S - amount) * Hsl.MAX_S;
  hsl.s(clamp(saturation, Hsl.MIN_S, Hsl.MAX_S));
  return hsl[color.name.toLowerCase()]();
}

/**
 * Converts a color to a grayscale color
 * @param {Color} color - The color to be converted
 * @returns {Color} A grayscale color
 */
export function grayscale(color) {
  return desaturate(color, 1);
}

/**
 * Increases the luminance of a color by a specified amount
 * @param {Color} color - The color to be increased the luminance
 * @param {number} amount - The percentage 0..1
 * @returns {Color} A lighten color
 * @see darken
 */
export function lighten(color, amount) {
  validator(color, 'color').isValid();
  validator(amount, 'amount').isFinite().inRange(MIN_AMOUNT, MAX_AMOUNT);
  
  const hsl = color.hsl();
  const luminance = (hsl.l() / Hsl.MAX_L + amount) * Hsl.MAX_L;
  hsl.l(clamp(luminance, Hsl.MIN_L, Hsl.MAX_L));
  return hsl[color.name.toLowerCase()]();
}

/**
 * Decreases the luminance of a color by a specified amount
 * @param {Color} color - The color to be decreased the luminance
 * @param {number} amount - The percentage 0..1
 * @returns {Color} A darken color
 * @see lighten
 */
export function darken(color, amount) {
  validator(color, 'color').isValid();
  validator(amount, 'amount').isFinite().inRange(MIN_AMOUNT, MAX_AMOUNT);

  const hsl = color.hsl();
  const luminance = (hsl.l() / Hsl.MAX_L - amount) * Hsl.MAX_L;
  hsl.l(clamp(luminance, Hsl.MIN_L, Hsl.MAX_L));
  return hsl[color.name.toLowerCase()]();
}

/**
 * Increases the whiteness of a color by a specified amount
 * @param {Color} color - The color to be decreased the whiteness
 * @param {number} [amount] - The percentage 0..1
 * @returns {Color} A whiten color
 * @see blacken
 */
export function whiten(color, amount = DEFAULT_AMOUNT) {
  validator(color, 'color').isValid();
  validator(amount, 'amount').isFinite().inRange(MIN_AMOUNT, MAX_AMOUNT);

  const hwb = color.hwb();
  const whiteness = hwb.w() + amount;
  hwb.w(clamp(whiteness, Hwb.MIN_W, Hwb.MAX_W));
  return hwb[color.name.toLowerCase()]();
}

/**
 * Increases the blackness of a color by a specified amount
 * @param {Color} color - The color to be increased the blackness
 * @param {number} [amount] - The percentage 0..1
 * @returns {Color} A blacken color
 * @see blacken
 */
export function blacken(color, amount = DEFAULT_AMOUNT) {
  validator(color, 'color').isValid();
  validator(amount, 'amount').isFinite().inRange(MIN_AMOUNT, MAX_AMOUNT);

  const hwb = color.hwb();
  const blackness = hwb.b() + amount;
  hwb.b(clamp(blackness, Hwb.MIN_B, Hwb.MAX_B));
  return hwb[color.name.toLowerCase()]();
}

/**
 * Inverses a color
 * @param {Color} color - The color to be inverted
 * @returns {Color} A inverted color
 */
export function invert(color) {
  validator(color, 'color').isValid();

  const rgb = color.rgb();
  const [r, g, b] = [rgb.r(), rgb.g(), rgb.b()].map((value) => {
    return Rgb.MAX - value;
  });
  rgb.r(r).g(g).b(b);
  return rgb[color.name.toLowerCase()]();
}

/**
 * Rotates the hue of a color
 * @param {Color} color - The color to be rotated
 * @param {number} amount - The percentage 0..1
 * @returns {Color} A rotated color
 */
export function rotate(color, amount) {
  validator(color, 'color').isValid();
  validator(amount, 'amount').isFinite().inRange(MIN_AMOUNT, MAX_AMOUNT);

  const hsl = color.hsl();
  let hue = hsl.h() + Hsl.MAX_H * amount;
  if (hue > Hsl.MAX_H) {
    hue -= Hsl.MAX_H;
  }
  hsl.h(hue);
  return hsl[color.name.toLowerCase()]();
}

/**
 * Converts a color to a complementary color
 * @param {Color} color - The color to be converted
 * @returns {Color} A complementary color
 */
export function complement(color) {
  return rotate(color, 0.5);
}

/**
 * Sets the alpha of a color
 * @param {Color} color - The color to be changed
 * @param {number} amount - The percentage 0..1
 * @returns {Color} A color
 * @see fadein
 * @see fadeout
 */
export function fade(color, amount) {
  validator(color, 'color').isValid();
  validator(amount, 'amount').isFinite();

  const cloned = color.clone();
  cloned.a(clamp(amount, MIN_ALPHA, MAX_ALPHA));
  return cloned;
}

/**
 * Increases the alpha of a color by a specified amount
 * @param {Color} color - The color to be increased the alpha
 * @param {number} amount - The percentage 0..1
 * @returns {Color} A color
 * @see fadeout
 * @see fade
 */
export function fadein(color, amount) {
  validator(color, 'color').isValid();
  validator(amount, 'amount').isFinite().inRange(MIN_AMOUNT, MAX_AMOUNT);

  const alpha = color.a() === NO_ALPHA ? 1 : color.a();
  return fade(color, alpha + amount);
}

/**
 * Decreases the alpha of a color by a specified amount
 * @param {Color} color - The color to be decreased the alpha
 * @param {number} amount - The percentage 0..1
 * @returns {Color} A color
 * @see fade
 * @see fadein
 */
export function fadeout(color, amount) {
  validator(color, 'color').isValid();
  validator(amount, 'amount').isFinite().inRange(MIN_AMOUNT, MAX_AMOUNT);

  const alpha = color.a() === NO_ALPHA ? 1 : color.a();
  return fade(color, alpha - amount);
}

/**
 * Mixes two colors together
 * @static
 * @param {Color} color1 - The color to be mixed
 * @param {Color} color2 - The color to be mixed
 * @param {number} [amount] - The relative weight of each color
 * @returns {Color} A mixed color
 */
export function mix(color1, color2, amount = DEFAULT_AMOUNT) {
  validator(color1, 'color1').isValid();
  validator(color2, 'color2').isValid();
  validator(amount, 'amount').isFinite().inRange(MIN_AMOUNT, MAX_AMOUNT);

  const rgb1 = color1.rgb();
  const rgb2 = color2.rgb();
  const alpha1 = rgb1.a() === NO_ALPHA ? 1 : rgb1.a();
  const alpha2 = rgb2.a() === NO_ALPHA ? 1 : rgb2.a();

  const w = amount * 2 - 1;
  const a = alpha1 - alpha2;

  const weight1 = ((w * a == -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
  const weight2 = 1 - weight1;
  
  const values1 = [rgb1.r(), rgb1.g(), rgb1.b()];
  const values2 = [rgb2.r(), rgb2.g(), rgb2.b()];
  const values = values1.map((value1, index) => {
    const value2 = values2[index];
    const value = Math.round(value1 * weight1 + value2 * weight2);
    return clamp(value, Rgb.MIN, Rgb.MAX);
  });

  const newAlpha = alpha1 * amount + alpha2 * (1 - amount);
  const mixed = new Rgb(...values, newAlpha);
  return mixed[color1.name.toLowerCase()]();
}

/**
 * Mixes color with white by specified amount
 * @param {Color} color - The color to be mixed
 * @param {number} [amount] - The percentage 0..1
 * @returns
 */
export function tint(color, amount = DEFAULT_AMOUNT) {
  const white = new Rgb(Rgb.MAX, Rgb.MAX, Rgb.MAX);
  return mix(color, white, amount);
}

/**
 * Mixes color with black by specified amount
 * @param {Color} color - The color to be mixed
 * @param {number} [amount] - The percentage 0..1
 */
export function shade(color, amount = DEFAULT_AMOUNT) {
  const black = new Rgb(Rgb.MIN, Rgb.MIN, Rgb.MIN);
  return mix(color, black, amount);
}

