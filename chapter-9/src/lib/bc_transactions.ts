import { sha256 } from './universal_sha256.js'

export interface Transaction {   
    readonly sender: string
    readonly recipient: string
    readonly amount: number
}

export class Block {
    private nonce: number = 0
    private hash: string = ""

    constructor(readonly timestamp: number, 
                readonly previousHash: string,
                readonly transactions: Transaction[]){}

    private async calculateHash(nonce: number) : Promise<string> {
        const data = this.timestamp + this.previousHash + JSON.stringify(this.transactions) + nonce;

        return await sha256(data)
    }

    get getHash():string {
        return this.hash;
    }

    async mine(): Promise<void> {

        while(!this.hash.startsWith("0000")){
            this.hash = await this.calculateHash(++this.nonce)
        }
    }
}

export class Blockchain {
    private readonly _chain: Block [] = []
    private _transactions: Transaction[] = []

    private get latestBlock() : Block {
        return this._chain[this._chain.length - 1];
    }

    get pendingTrasnactions(){
        return [...this._transactions]
    }

    get chain(){
        return [...this._chain]
    }

    private async addBlock(block: Block) : Promise<void> {
        await block.mine()
        this._chain.push(block)
    }

    async createGenesisBlock() : Promise<void> {
        await this.addBlock(new Block(Date.now(),"",this._transactions))
        console.log(this._chain.length)
    }

    createTransaction(transaction: Transaction) {
        this._transactions.push(transaction);
    }

    async minePendingTransaction() : Promise<void> {
        console.log(this._chain.length)
        const block = new Block(Date.now(),this.latestBlock.getHash,this._transactions);
        await this.addBlock(block)
        this._transactions = []
    }
}