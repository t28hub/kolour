const BYTES_LENGTH = 4;

export default class Converter {
  convert(bytes) {
    if (!bytes) {
      throw new Error('bytes must not be null');
    }

    if (bytes.length !== BYTES_LENGTH) {
      throw new Error(`length of bytes (${bytes.length}) must be ${BYTES_LENGTH}`);
    }

    return this.to(...bytes);
  }

  to(r, g, b, a) {
    throw new Error('to(r, g, b, a) is not implemented yet'); 
  }
}
