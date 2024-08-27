## How To Run:

Modify the end of `crypto.ts` to add/remove transactions and/or wallets.

In the terminal, run:
```
npm run start
```

# Understanding How Cryptocurrency Works

## How Does a Blockchain Work?
From a financial perspective, the blockchain is like a shared public ledger containing all transactions from all cryptocurrency users. This ledger is distributed and synchronised across the globe, eliminating the need for a central authority to maintain and validate it.

From a technical perspective, think of the blockchain as a database structured as a linked list. Each record or block represents a group of transactions that have been permanently committed to the database. It works somewhat like a Git repository that can never be rebased. The important thing is that each new block is linked to the previous one in the blockchain, and its creation follows a very strict set of cryptographic rules.

## Public and Private Keys
Each cryptocurrency user, or wallet, has a unique public key for receiving money, similar to a username, and a unique private key for spending money, akin to a password. Before you can spend cryptocurrency, you need to prove that you are the owner of a public key that money has been sent to in the past.

Public Key: For receiving money\
Private Key: For sending money

When a transaction is made, it includes:
- A hash (an encrypted representation) of the previous transaction.
- The public key of the new owner.
- A digital signature created using the sender’s private key.

<br>
Each transaction contains a hash, or an encrypted representation, of the previous transaction and the new owner's public key. The hash is then signed with the previous owner's private key. This process makes it possible to validate the chain of ownership without exposing the private key. Additionally, the signature makes it virtually impossible to alter the transaction after it has been issued.

## The Role of Mining
Mining involves a network of computers (or "nodes") that compete to validate and add new transactions to the blockchain. To do this, miners must solve a complex cryptographic puzzle known as a proof of work. Although this problem is extremely difficult to solve, it is easy for others to verify once a solution has been found.

The first miner to solve the puzzle (based purely on luck and therefore amoount of computing power) gets to add the block to the blockchain and is rewarded with a portion of cryptocurrency. This block is then broadcasted to the entire network of nodes, where it is confirmed and permanently recorded on the blockchain.

Mining is necessary to ensure the security and integrity of blockchain networks. It prevents double-spending (ie sending coins to two or more people at once) by making it computationally expensive to alter transaction history.

If you attempt to send 2 BTC to two different wallets simultaneously while only having 3 BTC in your wallet, the blockchain’s consensus mechanism, supported by mining, will prevent both transactions from being confirmed.

Here's how it works:

1. Broadcasting Transactions: When you initiate both transactions, they are broadcast to the network and enter the pool of unconfirmed transactions.

2. Miners’ Role: Miners select transactions from this pool to include in the next block. If both transactions are competing for the same BTC (the same input; signature, amount and more), only one can be confirmed because the other would lead to a double-spend.

3. Transaction Validation: Miners validate transactions by checking the available balance in the wallet. Since you have only 3 BTC, miners will confirm the first transaction they process, and the other transaction will be rejected because it attempts to spend the same BTC twice.

4. Consensus: Once a block containing the first transaction is mined and added to the blockchain, it becomes part of the permanent ledger. Other nodes in the network recognise that the 3 BTC has been spent, invalidating the second transaction.

Because miners prioritise transactions based on fees and process them according to consensus rules, the double-spend attempt is automatically prevented. The computational cost ensures that only one valid transaction can be confirmed, preserving the integrity of the blockchain.

Mining also decentralises the process of transaction validation, eliminating the need for a central authority and fostering a trustless system. By requiring significant computational effort to validate the block through mining, it protects the network (on top of the already secure block hashing concept) from attacks and ensures that consensus is reached fairly. Additionally, mining introduces new cryptocurrency into circulation, following a controlled supply schedule.

## Conclusion
Cryptocurrency represents a radical departure from traditional finance by eliminating the need for trusted intermediaries and relying instead on cryptographic proof. Through the blockchain, public and private keys, and the process of mining, cryptocurrency provides a secure and decentralised way to manage transactions.
