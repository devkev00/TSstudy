import crypto from "crypto"

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;

}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }
  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex")
  }
}

class Blockchain {
  private blocks: Block[]
  constructor() {
    this.blocks = [];
  }
  private getPrevHash() {
    if (this.blocks.length === 0) return ""
    return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newBlock);
  }
  public getBlocks() {
    return [...this.blocks]; // 해당 배열(blocks)를 shallow copy하여 새로운 배열을 만듦
  }
}

const blockchain = new Blockchain();

blockchain.addBlock("First one");
blockchain.addBlock("Second one");
blockchain.addBlock("Third one");
blockchain.addBlock("Fourth one");

blockchain.getBlocks().push(new Block("XXXXXX", 11111, "HACKEDDDDDD")); // 원본 배열에는 영향을 주지 않음

console.log(blockchain.getBlocks());