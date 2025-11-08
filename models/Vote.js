const pool = require('../db');

class Vote {
    static async create(voteData){
        const { userId, electionId, candidateId, transactionHash} = voteData;

        const query = `
        INSERT INTO votes (user_id, election_id, candidate_id, transaction_hash)
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `;

        const values = [userId, electionId, candidateId, transactionHash];
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch(error){
            throw error;
        }
    }

    static async findById(id){
        const query = 'SELECT *FROM votes WHERE id = $1;';
        try {
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch(error){
            throw error;
        }
    }

    static async findByUserId(userId){
       const query = 'SELECT * FROM votes where user_id = $1 ORDER  BY created_at DESC;';
        try {
            const result = await pool.query(query, [userId]);
            return result.rows;
        } catch(error){
            throw error;
        }
    }

    static async findByElectionId(electionId){
        const query = 'SELECT * FROM votes where election_id = $1 ORDER BY created_at DESC;';
        try {
            const result = await pool.query(query, [electionId]);
            return result.rows;
        } catch(error){
            throw error;
        }
    }

    static async countByElectionId(electionId){
        const query = 'SELECT COUNT(*) FROM votes WHERE election_id = $1;';
        try {
            const result = await pool.query(query, [electionId]);
            return parseInt(result.rows[0].count);
        } catch(error){
            throw error;
        }
    }

    static async countByCandidateId(candidateId){
        const query = 'SELECT COUNT(*) FROM votes where election_id = $1 AND candidate_id = $2;';
        try {
            const result  =await pool.query(query, [electionId, candidateId]);
            return parseInt(result.rows[0].count);
        } catch(error){
            throw error;
        }
    }
}
module.exports = Vote;