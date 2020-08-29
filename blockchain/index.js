const Block = require('./block');
const { cryptoHash } = require('../util');

class Blockchain {
    constructor(){
        this.chain = [Block.genesis()];
    }

    addBlock({ data })
    {
        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length - 1],
            data
        });

        this.chain.push(newBlock);
    }

    replaceChain(chain, onSuccess){
        if(chain.length <= this.chain.length){
            console.error('The incoming chain must be longer');
            return;
        }
        if(!Blockchain.isValidChain(chain))
        {
            console.error('The incoming chain must be valid');
            return;
        }

        if(onSuccess) onSuccess();
        
        console.log('replacing chain with', chain);
        this.chain = chain;
    }

    static isValidChain(chain)
    {

        if (JSON.stringify(chain[0]) != JSON.stringify(Block.genesis())) {
            return false;
        };
        for(let i = 1; i < chain.length; i++)
        {
            const {timestamp, lastHash, hash, nonce, difficulty, data} = chain[i];
            const lastDifficulty = chain[i-1].difficulty;

            //Check last hash matches last hash
            if(lastHash !== chain[i - 1].hash) return false;
            //Check hash matches data
            if(hash !== cryptoHash(timestamp, lastHash, data, nonce, difficulty)) return false;
            //Check difficulty jump
            if(Math.abs(lastDifficulty - difficulty) > 1) return false;
        }
        return true;

    }
}

module.exports = Blockchain;