const {Connection, PublicKey, Keypair,Transaction, SystemProgram} = require('@solana/web3.js');
const {Program, AnchorProvider, web3} = require('@project-serum/anchor');
const fs = require('fs');
const path = require('path');

const idl = JSON.parse(fs.readFileSync(path.join(__dirname, '../idl/neo_vote.json'), 'utf-8'));

class SolanaService {
    constructor(){
        this.connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com');
        this.programId = new PublicKey(process.env.PROGRAM_ID);
        this.provider =new AnchorProvider(this.connection, null, {});
        this.program = new Program(idl, this.programId, this.provider);
    }

async castVote(electionId, candidateId, userId){
    try{
        // Generate a new keypair for the vote account
        const voteAccount = Keypair.generate();

        //Create the transaction
        const transactionX = await this.program.methods
        .castVote(electionId, candidateId, userId)
        .accounts({
            voteAccount: voteAccount.publicKey,
            user: new PublicKey(userId),
            systemProgram: SystemProgram.programId,
        })
        .signers([voteAccount])
        .rpc();
        return transactionX;
 
    } catch(error){
        console.error('Error casting vote on Solana: ', error);
        throw error;
    }
}


   async getVote(transactionHash){
    try{
        const transactionX = await this.connection.getTransaction(transactionHash);
        return transactionX;
    } catch(error){
        console.error('Error fetching vote from solana:', error);
        throw error;
    }
   }

   async getElectionResults(electionId){
    try{
        return {electionId, results: []};

    } catch(error){
        console.error('Error fetching election results from Solana: ', error);
        throw error;
    }
   }
}

module.exports = new SolanaService();