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
}
class Wallet {
}
