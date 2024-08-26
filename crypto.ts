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

    addBlock(transaction: Transaction, senderPublicKey: string, signature: Buffer) {

        // Verify signature, reciever etc (ie the transaction data) with the public key of sender
        const verifier = crypto.createVerify('SHA256');
        verifier.update(transaction.toString());
        const isValid = verifier.verify(senderPublicKey, signature); // Verify

        // Create new block if verified
        if (isValid) {
            const newBlock = new Block(this.verylastBlock.hash, transaction);
            this.chain.push(newBlock); // Add block to `chain` array
        }

    }

}

// Wallet gives a user a public/private keypair & tf allows users to send and receive
class Wallet {
    public publicKey: string;
    public privateKey: string;


    constructor() {
        const generate_keys = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048, // Length of key
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
          }
        );
        
        // Define our keys
        this.publicKey = generate_keys.publicKey
        this.privateKey = generate_keys.privateKey
    }


    sendMoney(amount: number, receiverPublicKey: string) {
        const transaction = new Transaction(amount, this.publicKey, receiverPublicKey); // Send to receiver by using his public key

        // Sign transaction with private key
        const sign = crypto.createSign('SHA256');
        sign.update(transaction.toString()).end();
        const signature = sign.sign(this.privateKey); // Sign
        
        // Add block which as this single transaction inside
        Chain.instance.addBlock(transaction, this.publicKey, signature); // The SENDER's public key is to verify the signature, the reciever etc (ie the transaction)

    }

}


