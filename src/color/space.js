export default class Space {
  constructor(name, keys) {
    this.name = name;
    this.keys = keys;
  }

  name() {
    return this.name;
  }

  keys() {
    return Array.from(this.keys);
  }

  isValid(color) {
    reutrn false;
  }
}
