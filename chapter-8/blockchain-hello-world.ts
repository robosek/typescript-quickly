import * as crypto from 'crypto';
import { TextEncoder } from 'util';

const generateHash = async (text:string) : Promise<string> => {

    const arrayBuffer = new TextEncoder().encode(text);
    const hash = await crypto.createHash("sha256")
                                .update(arrayBuffer)
                                .digest("hex");

    return hash;

}

const calculateHashWithNonce = (input: string) => async (nonce: number) : Promise<string> => {
    return await generateHash(input + nonce);
}

const mine = (difficulty: number) => (input: string) => async (nonce:number) => {

    let hash = "";
    const calucalate = calculateHashWithNonce(input);

    while(!hash.startsWith('0000')){
        hash = await calucalate(nonce++);
    }

    console.log(`Hash: ${hash}, nonce: ${nonce}`);
}


const difficulty = 5
const transationName = "Hello World"
const startNonce = 0

mine(difficulty)(transationName)(startNonce)
