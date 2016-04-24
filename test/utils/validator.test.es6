import assert from 'power-assert';
import Rgb from '../../src/color/rgb.es6';
import validator, { Validator, NumberValidator, ColorValidator } from '../../src/utils/validator.es6';

describe('Validator', () => {
  it('should return a validator', () => {
    // exercise
    const instance = validator(null, 'value');
    
    // verify
    assert(instance instanceof Validator);
  });
  
  it('should create a NumberValidator when a value is number', () => {
    // exercise
    const instance = validator(10, 'value');

    // verify
    assert(instance instanceof NumberValidator);
  });
  
  it('should create a ColorValidator when a value is color', () => {
    // setup
    const color = new Rgb(255, 0, 0);
    
    // exercise
    const instance = validator(color, 'value');

    // verify
    assert(instance instanceof ColorValidator);
  });
});