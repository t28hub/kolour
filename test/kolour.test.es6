import assert from 'power-assert';
import kolour from '../src/kolour.es6';
import metadata from '../package.json';

describe('kolour', () => {

  describe('.VERSION', () => {

    it('should be equal to version defined in the package.json', () => {
      assert(kolour.VERSION === metadata.version);
    });

  });

});