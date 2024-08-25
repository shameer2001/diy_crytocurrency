import * as crypto from 'crypto';


// Transaction between TWO wallets
class Transaction {
    constructor(
        public amount: number,
        public person_paying: string, 
        public person_receiving: string 
    ) {}

    // Stringify the `Transaction` object
    toString() {
        return JSON.stringify(this);
    }
}

// A single block on the chain
class Block {
    constructor(
        public prevHash: string,
        public transaction: Transaction,
        public timestamp = Date.now() // So that all blocks will be in chronological order
    ) {}

    // Hash the block
    get hash() {
        const str = JSON.stringify(this); 

        const hash = crypto.createHash('SHA256');
        hash.update(str).end(); // Stringify the hash
        
        return hash.digest('hex'); // The hexadecimal version of the hash
    }
}

// The blockchain
class Chain {

}

class Wallet {

}


