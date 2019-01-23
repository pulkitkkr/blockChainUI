let SHA256 = require("crypto-js/sha256");

export class Block {
  constructor(difficulty = 2, index = 0, prevHash = null, data = {}) {
    this.generator = 0;
    this.data = data;
    this.prevHash = prevHash;
    this.index = index;
    this.currentHash = this.mineBlock.bind(this, difficulty)();
  }
  mineBlock(difficulty) {
    let hashData = this.prevHash + this.index + this.generator + this.data;
    let Arr = new Array(difficulty + 1);
    let difficultyString = Arr.join("0");
    var hash = SHA256(hashData).toString();
    while (
      hash
        .split("")
        .slice(0, difficulty)
        .join("") != difficultyString
    ) {
      ++this.generator;
      let hashData = this.prevHash + this.index + this.generator + this.data;
      hash = SHA256(hashData).toString();
    }
    return hash;
  }
}
export default Block;
