import {BlockChain, Block, Transaction}  from "mkchain/Blockchain.js";
import elliptic from "elliptic";
var EC = elliptic.ec;
var ec = new EC("secp256k1");


class BlockChainSystem {
    constructor() {
        this.bc = new BlockChain();
        this.selectedBlock = this.getBlocks()[0];
    }

    getBlocks(){
        var chain = this.bc.chain;
        var blocks = {};
        for (let i = 0; i < chain.length; i++) {
            const element = chain[i];
            blocks[i] = element;
        }
        return blocks;
    }

    findBlock(hash){
        var blocks = Object.entries(this.getBlocks());
        var sblock;
        blocks.forEach(([key,value]) => {
            if (value.hash == hash) {
                // console.log(value);
                // this.selectedBlock = {index:key, block: value};
                sblock = value;
            }
            
        });        

        return sblock;
    }

    setDifficulty(diff){this.bc.difficulty = diff}
    setReword(rew){this.bc.miningReword = rew}

    stratTransaction(fromKey,to,amount){
        var signstor = ec.keyFromPrivate(fromKey.pri,"hex");
        
        var trans = new Transaction(fromKey.pub, to, amount);
        trans.signTransaction(signstor);
        this.bc.addTransaction(trans);        
    }

    getTransactionsToAddress(Address){
        var trans =[];
        var chain = this.bc.chain;
        
        if (chain !== undefined && chain.length > 0) {
            chain.forEach(block => {
                var transaction = block.transations;
                if (transaction !== undefined && Object.entries(transaction).length > 0) {
                    Object.entries(transaction).forEach(([key,value]) => {
                        if (value.fromAddress === Address || value.toAddress === Address) {
                            trans.push(value);
                        }
                    });
                }
            });
        }
        return trans;
    }

    makeNewKey(){
        var newkey = ec.genKeyPair();
        var newPublic = newkey.getPublic("hex");
        var newPrivate = newkey.getPrivate("hex");
        return {pub:newPublic, pri:newPrivate, key: newkey};
    }
}

var block_chain_system = new BlockChainSystem();
var blockchain = block_chain_system.bc;



for (let i = 0; i < 5; i++) {
    var mykey = block_chain_system.makeNewKey();
    var trans = new Transaction(mykey.pub, "ceso", 5*i);
    trans.signTransaction(mykey.key);
    blockchain.addTransaction(trans);
    blockchain.minePendingTransactions(mykey.pub);
    
}


export { block_chain_system, blockchain}
