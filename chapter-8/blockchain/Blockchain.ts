import Block from './Block'

export default class Blockchain {
    private readonly chain: Block[] = []

    private get latestBlock():Block{
        return this.chain[this.chain.length - 1]
    }

    constructor(){
        this.chain.push(new Block(0,"0","Starting block", Date.now()))
    }

    addBlock(data:string){
        const latestBlock = this.latestBlock
        const block = new Block(latestBlock.index+1,latestBlock.hash,data,Date.now())

        this.chain.push(block)
    }

}