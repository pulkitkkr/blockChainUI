const SHA256 = require("crypto-js/sha256");

class BlockChain {
  constructor(difficulty = 2, genesisBlock = {}) {
    this.difficulty = difficulty;
    this.ChainData = [];
    this.ChainData.push(genesisBlock);
    this.addBlock = this.addBlock.bind(this);
  }
  addBlock(Block) {
    this.ChainData.push(Block);
    console.log("Added Block:" + Block);
  }
}
export default BlockChain;
