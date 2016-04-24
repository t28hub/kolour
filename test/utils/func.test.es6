import assert from 'power-assert';
import Cmy from '../../src/color/cmy.es6';
import Hsl from '../../src/color/hsl.es6';
import Hwb from '../../src/color/hwb.es6';
import Rgb from '../../src/color/rgb.es6';
import * as func from '../../src/utils/func.es6';

describe('Func', () => {
  describe('.saturate(color, amount)', () => {
    it('should increase the saturation of a color', () => {
      // setup
      const color = new Cmy(0.75, 0.25, 0.25);

      // exercise
      const increased = func.saturate(color, 0.1);

      // verify
      assert(increased instanceof Cmy);
      assert(increased !== color);
      assert(increased.int() == new Hsl(180, 60, 50).int());
    });
  });

  describe('.desaturate(color, amount)', () => {
    it('should decrease the saturation of a color', () => {
      // setup
      const color = new Cmy(1, 0, 0);

      // exercise
      const decreased = func.desaturate(color, 0.1);

      // verify
      assert(decreased instanceof Cmy);
      assert(decreased !== color);
      assert(decreased.int() == new Hsl(180, 90, 50).int());
    });
  });

  describe('.grayscale(color)', () => {
    it('should convert a color to grayscale', () => {
      // setup
      const cyan = new Cmy(1, 0, 0);

      // exercise
      const gray = func.grayscale(cyan);

      // verify
      assert(gray instanceof Cmy);
      assert(gray.int() === 0x808080FF);
    });
  });
  
  describe('.lighten(color, amount)', () => {
    it('should increase the luminance of a color', () => {
      // setup
      const cyan = new Cmy(1, 0, 0);

      // exercise
      const increased = func.lighten(cyan, 0.1);

      // verify
      assert(increased instanceof Cmy);
      assert(increased !== cyan);
      assert(increased.int() == new Hsl(180, 100, 60).int());
    });
  });

  describe('.darken(color, amount)', () => {
    it('should decrease the luminance of a color', () => {
      // setup
      const cyan = new Cmy(1, 0, 0);

      // exercise
      const decreased = func.darken(cyan, 0.1);

      // verify
      assert(decreased instanceof Cmy);
      assert(decreased !== cyan);
      assert(decreased.int() == new Hsl(180, 100, 40).int());
    });
  });
  
  describe('.whiten(color, amount)', () => {
    it('should increase the whiteness of a color', () => {
      // setup
      const cyan = new Cmy(1, 0, 0);
      
      // exercise
      const increased = func.whiten(cyan);
      
      // verify
      assert(increased instanceof Cmy);
      assert(increased !== cyan);
      assert(increased.int() == new Hwb(180, 0.5, 0).int());
    });
    
    it('should increase the whiteness of a color with amount', () => {
      // setup
      const cyan = new Cmy(1, 0, 0);

      // exercise
      const increased = func.whiten(cyan, 0.2);

      // verify
      assert(increased instanceof Cmy);
      assert(increased !== cyan);
      assert(increased.int() == new Hwb(180, 0.2, 0).int());
    });
  });

  describe('.blacken(color, amount)', () => {
    it('should increase the blackness of a color', () => {
      // setup
      const cyan = new Cmy(1, 0, 0);

      // exercise
      const increased = func.blacken(cyan);

      // verify
      assert(increased instanceof Cmy);
      assert(increased !== cyan);
      assert(increased.int() == new Hwb(180, 0, 0.5).int());
    });

    it('should increase the blackness of a color with amount', () => {
      // setup
      const cyan = new Cmy(1, 0, 0);

      // exercise
      const increased = func.blacken(cyan, 0.2);

      // verify
      assert(increased instanceof Cmy);
      assert(increased !== cyan);
      assert(increased.int() == new Hwb(180, 0, 0.2).int());
    });
  });

  describe('.fade(color, amount)', () => {
    it('should set the alpha of a color', () => {
      // setup
      const magenta = new Cmy(0, 1, 0, 0.5);

      // exercise
      const newColor = func.fade(magenta, 0.2);
      
      // verify
      assert(newColor instanceof Cmy);
      assert(newColor !== magenta);
      assert(newColor.int() === new Cmy(0, 1, 0, 0.2).int());
    });
    
    it('should set the alpha of a color when the color does not have alpha', () => {
      // setup
      const magenta = new Cmy(0, 1, 0);

      // exercise
      const newColor = func.fade(magenta, 0.8);

      // verify
      assert(newColor instanceof Cmy);
      assert(newColor !== magenta);
      assert(newColor.int() === new Cmy(0, 1, 0, 0.8).int());
    });
  });
  
  describe('.invert(color)', () => {
    it('should invert a color', () => {
      // setup
      const cyan = new Cmy(1, 0, 0); // rgb(0, 255, 255)
      
      // exercise
      const inverted = func.invert(cyan); // rgb(255, 0, 0)
      
      // verify
      assert(inverted instanceof Cmy);
      assert(inverted !== cyan);
      assert(inverted.int() === new Cmy(0, 1, 1).int());
    });
  });

  describe('.rotate(color, amount)', () => {
    it('should rotate the hue of a color', () => {
      // setup
      const cyan = new Cmy(1, 0, 0); // hsl(180, 100%, 50%)

      // exercise
      const rotated = func.rotate(cyan, 300 / 360); // hsl(120, 100%, 50%)

      // verify
      assert(rotated instanceof Cmy);
      assert(rotated !== cyan);
      assert(rotated.int() === new Rgb(0, 255, 0).int());
    });
  });
  
  describe('.complement(color)', () => {
    it('should convert a color to a complementary color', () => {
      // setup
      const yellow = new Cmy(0, 0, 1); // hsl(60, 100%, 50%)

      // exercise
      const complementary = func.complement(yellow); // hsl(240, 100%, 50%)

      // verify
      assert(complementary instanceof Cmy);
      assert(complementary !== yellow);
      assert(complementary.int() === new Rgb(0, 0, 255).int());
    });
  });
  
  describe('.fadein(color, amount)', () => {
    it('should increase the alpha of a color', () => {
      // setup
      const magenta = new Cmy(0, 1, 0, 0.5);

      // exercise
      const increased = func.fadein(magenta, 0.1);

      // verify
      assert(increased instanceof Cmy);
      assert(increased !== magenta);
      assert(increased.int() === new Cmy(0, 1, 0, 0.6).int());
    });
    
    it('should increase the alpha of a color when the color does not have alpha', () => {
      // setup
      const magenta = new Cmy(0, 1, 0);

      // exercise
      const increased = func.fadein(magenta, 0.1);
      
      // verify
      assert(increased instanceof Cmy);
      assert(increased !== magenta);
      assert(increased.int() === new Cmy(0, 1, 0, 1).int());
    });
  });

  describe('.fadeout(color, amount)', () => {
    it('should decrease the alpha of a color', () => {
      // setup
      const magenta = new Cmy(0, 1, 0, 0.5);

      // exercise
      const decreased = func.fadeout(magenta, 0.1);

      // verify
      assert(decreased instanceof Cmy);
      assert(decreased !== magenta);
      assert(decreased.int() === new Cmy(0, 1, 0, 0.4).int());
    });
    
    it('should decrease the alpha of a color when the color does not have alpha', () => {
      // setup
      const magenta = new Cmy(0, 1, 0);

      // exercise
      const decreased = func.fadeout(magenta, 0.1);

      // verify
      assert(decreased instanceof Cmy);
      assert(decreased !== magenta);
      assert(decreased.int() === new Cmy(0, 1, 0, 0.9).int());
    });
  });

  describe('.mix(color1, color2, weight)', () => {
    it('should return a mixed color', () => {
      // setup
      const black = new Rgb(Rgb.MIN, Rgb.MIN, Rgb.MIN);
      const white = new Rgb(Rgb.MAX, Rgb.MAX, Rgb.MAX);

      // exercise
      const mixed = func.mix(black, white);

      // verify
      assert(mixed instanceof Rgb);
      assert(mixed !== black);
      assert(mixed !== white);
      assert(mixed.int() === 0x808080FF);
    });

    it('should return a mixed color with amount', () => {
      // setup
      const red = new Rgb(Rgb.MAX, Rgb.MIN, Rgb.MIN);
      const blue = new Rgb(Rgb.MIN, Rgb.MIN, Rgb.MAX);

      // exercise
      const mixed = func.mix(red, blue, 0.2);

      // verify
      assert(mixed instanceof Rgb);
      assert(mixed !== red);
      assert(mixed !== blue);
      assert(mixed.int() === 0x3300CCFF);
    });
    
    it('should return a mixed color when each color is not RGB', () => {
      // setup
      const cyan = new Cmy(1, 0, 0);
      const yellow = new Cmy(0, 0, 1);

      // exercise
      const mixed = func.mix(cyan, yellow);

      // verify
      assert(mixed instanceof Cmy);
      assert(mixed !== cyan);
      assert(mixed !== yellow);
      assert(mixed.int() === 0x80FF80FF);
    });
  });
  
  describe('.tint(color, amount)', () => {
    it('should mix color with white', () => {
      // setup
      const magenta = new Cmy(0, 1, 0);

      // exercise
      const mixed = func.tint(magenta);

      // verify
      assert(mixed instanceof Cmy);
      assert(mixed !== magenta);
      assert(mixed.int() === new Rgb(255, 128, 255).int());
    });

    it('should mix color with white with amount', () => {
      // setup
      const magenta = new Cmy(0, 1, 0);

      // exercise
      const mixed = func.tint(magenta, 0.2);

      // verify
      assert(mixed instanceof Cmy);
      assert(mixed !== magenta);
      assert(mixed.int() === new Rgb(255, 204, 255).int());
    });
  });

  describe('.shade(color, amount)', () => {
    it('should mix color with black', () => {
      // setup
      const magenta = new Cmy(0, 1, 0);

      // exercise
      const mixed = func.shade(magenta);

      // verify
      assert(mixed instanceof Cmy);
      assert(mixed !== magenta);
      assert(mixed.int() === new Rgb(128, 0, 128).int());
    });

    it('should mix color with white with amount', () => {
      // setup
      const magenta = new Cmy(0, 1, 0);

      // exercise
      const mixed = func.shade(magenta, 0.2);

      // verify
      assert(mixed instanceof Cmy);
      assert(mixed !== magenta);
      assert(mixed.int() === new Rgb(51, 0, 51).int());
    });
  });
});