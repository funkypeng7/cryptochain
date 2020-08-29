const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');

describe('TransactionPool', () => {
    let transactionPool, transaction, senderWallet;

    beforeEach(() => {
        transactionPool = new TransactionPool();
        senderWallet = new Wallet();
        transaction = new Transaction({
            senderWallet,
            recipient: 'fake-recipeient',
            amount: 50
        });
    });

    describe('setTransaction', () => {
        it('adds a transaction', () => {
            transactionPool.setTransaction(transaction);

            expect(transactionPool.transactionMap[transaction.id])
                .toBe(transaction);
        });
    });

    describe('existingTransaction', () =>{
        it('returns an exsiting transaction given an input address', () => {
            transactionPool.setTransaction(transaction);

            expect(
                transactionPool.exisitingTransaction( {inputAddress: senderWallet.publicKey })
            ).toBe(transaction);
        });
    });
});