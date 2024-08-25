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
    public static instance = new Chain(); // To ensure only 1 chain is created

    private chain: Block[];
    private genesisHash: string;
    private nextTrans: Transaction;

    constructor() {
        this.genesisHash = null as any; // No previous hash for genesis block, therefore null
        this.nextTrans = new Transaction(100, 'genesis', 'shameer'); // Our first transaction (creating money out of thin air)
        
        this.chain = [new Block(this.genesisHash, this.nextTrans)]; // Genesis block
    }

    get verylastBlock() {
        return this.chain[ this.chain.length -1 ];
    }

    addBlock() {

    }


}

class Wallet {

}


