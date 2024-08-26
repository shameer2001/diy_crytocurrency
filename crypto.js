"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
// Transaction between TWO wallets
class Transaction {
    constructor(amount, person_paying, person_receiving) {
        this.amount = amount;
        this.person_paying = person_paying;
        this.person_receiving = person_receiving;
    }
    // Stringify the `Transaction` object
    toString() {
        return JSON.stringify(this);
    }
}
// A single block on the chain
class Block {
    constructor(prevHash, transaction, timestamp = Date.now() // So that all blocks will be in chronological order
    ) {
        this.prevHash = prevHash;
        this.transaction = transaction;
        this.timestamp = timestamp;
    }
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
    constructor() {
        this.genesisHash = null; // No previous hash for genesis block, therefore null
        this.nextTrans = new Transaction(100, 'genesis', 'shameer'); // Our first transaction (creating money out of thin air)
        this.chain = [new Block(this.genesisHash, this.nextTrans)]; // Genesis block
    }
    get verylastBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(transaction, senderPublicKey, signature) {
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
Chain.instance = new Chain(); // To ensure only 1 chain is created
// Wallet gives a user a public/private keypair & tf allows users to send and receive
class Wallet {
    constructor() {
        const generate_keys = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
        });
        // Define our keys
        this.publicKey = generate_keys.publicKey;
        this.privateKey = generate_keys.privateKey;
    }
    sendMoney(amount, receiverPublicKey) {
        const transaction = new Transaction(amount, this.publicKey, receiverPublicKey); // Send to receiver by using his public key
        // Sign transaction with private key
        const sign = crypto.createSign('SHA256');
        sign.update(transaction.toString()).end();
        const signature = sign.sign(this.privateKey); // Sign
        // Add block which as this single transaction inside
        Chain.instance.addBlock(transaction, this.publicKey, signature); // The SENDER's public key is to verify the signature, the reciever etc (ie the transaction)
    }
}
