import Block from "./Block"
import Blockchain from "./Blockchain"

console.log("Creating blockchain with genesis block...")
const blockchain = new Blockchain();

console.log("Adding first block...")
blockchain.addBlock("This is my first transaction!")

console.log("Adding second block...")
blockchain.addBlock("This is my second transaction!")

console.log(JSON.stringify(blockchain,null,2))