import * as crypto from 'crypto'

export default class Block {
    readonly nonce: number;
    readonly hash: string;

    constructor(readonly index: number, 
                readonly previousHash: string, 
                readonly data:string, 
                readonly timestamp:number){
        const { hash, nonce } = this.mine()
        this.hash = hash
        this.nonce = nonce
    }

    private calculateHash(nonce: number) {
        const data = this.index + this.previousHash + this.data + this.timestamp + nonce;

        return crypto
                .createHash("sha256")
                .update(data)
                .digest("hex");
    }

    private mine(): { hash:string, nonce:number } {
        let nonce = 0
        let hash = ""

        while(!hash.startsWith("00000")){
            hash = this.calculateHash(++nonce)
        }

        return { hash, nonce }
    }
}