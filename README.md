# Kolour
Kolour is a fluent color conversion and manipulation library.

## Installation
Using bower:
```sh
$ bower install kolour
```
Using npm:
```sh
$ npm install kolour
```

## Supported Color Spaces
Kolour supports the following color spaces.
- [CMY](https://en.wikipedia.org/wiki/CMY_color_model)
- [CMYK](https://en.wikipedia.org/wiki/CMYK_color_model)
- [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV)
- [HSV](https://en.wikipedia.org/wiki/HSL_and_HSV)
- [HWB](https://en.wikipedia.org/wiki/HWB_color_model)
- [RGB](https://en.wikipedia.org/wiki/RGB_color_model)

## Example
Here is an example using the Kolour.
```javascript
const rgb = kolour('black');
rgb.r(40).g(60).b(80);
rgb.hex(); // #283C50
rgb.css(); // rgb(40, 60, 80)

const hsl = color.hsl();
hsl.h(120).s(40).l(80);
hsl.css(); // hsl(120, 40%, 80%)

hsl.alpha(0.5);
hsl.css(); // hsl(120, 40%, 80%, 0.5)
```

## API
### Creation
Kolour provides a simple way to create a color and you only have to call the method.
```javascript
const white   = kolour('#FFFFFF');                // Create a color from a hex string
const green   = kolour('green');                  // Create a color from a color name
const hsl     = kolour('hsl(0, 100%, 50%)')       // Create a color from a css color
const cmy     = kolour({c: 1, m: 0, y: 0, a: 1}); // Create a color from an object
const cyan    = kolour(0xFF00FFFF);               // Create a color from a 32-bit ARGB number
const cloned  = kolour(black);                    // Create a color with another instance
const invalid = kolour(null);                     // Create an invalid color
const random  = kolour.random();                  // Create a random RGB color
```
If you need to create an instance of a specific color space, you can use a method that has the same name as a color space.
```javascript
const cmy  = kolour.cmy(0.2, 0.4, 0.6);
const cmyk = kolour.cmyk(0.2, 0.4, 0.6, 0.8);
const hsl  = kolour.hsl(120, 0.4, 0.6);
const hsv  = kolour.hsv(120, 0.4, 0.6);
const hwb  = kolour.hwb(120, 0.4, 0.6);
const rgb  = kolour.rgb(80, 120, 160);
```

### Accessor
Kolour provides two types of accessor for each component.
```javascript
const rgb = kolour('rgb(60, 120, 180)');
rgb.r();      // Get red value (shorthand method)
rgb.red();    // Get red value
rgb.r(80);    // Set red value (shorthand method)
rgb.red(80);  // Set red value
```

In addition, 'setter' returns self so you can set values fluently as below.
```javascript
const rgb = kolour('rgb(60, 120, 180)');
rgb.r(40).g(80).b(120).a(0.5);              // {r: 40, g: 80, b: 120, a: 0.5}
rgb.red(40).green(80).blue(120).alpha(0.5); // {r: 40, g: 80, b: 120, a: 0.5}
```

### Conversion
Kolour provides the following color conversion methods.
```javascript
color.cmy();  // Convert to a CMY color
color.cmyk(); // Convert to a CMYK color
color.hsl();  // Convert to a HSL color
color.hsv();  // Convert to a HSV color
color.hwb();  // Convert to a HWB color
color.rgb();  // Convert to a RGB color
color.hex();  // Convert to a hex string
```

### Manipulation
kolour provides the following manipulation methods and they are related to less and sass.
```javascript
color.lighten(0.1);     // Increase the lightness
color.darken(0.1);      // Decrease the lightness
color.grayscale();      // Convert to a grayscale color
color.whiten(0.1);      // Increase the whiteness
color.blacken(0.1);     // Increase the blackness
color.invert();         // Convert to a negative color
color.negate();         // Convert to a negative color
color.rotate(120);      // Rotate he hue
color.spin(120);        // Rotate he hue
color.complement();     // Convert to a complementary color
color.fadein(0.1);      // Increase the alpha
color.fadeout(0.1);     // Decrease the alpha
color.mix(other, 0.5);  // Mix with a color
color.tint(0.5);        // Mix with a white color
color.shade(0.5);       // Mix with a black color
```

### Others
Kolour provides other methods as below.
```javascript
color.css();          // Return a css color styled string
color.isValid();      // Return true when the color is valid
color.equals(other);  // Return true when the specified color is same color
```

## License
MIT
