const pool = require('../db');

class Receipt {
    static async create(receiptData){
        const {voteId, receiptData: receiptJson} = receiptData;
         const query = `
         INSERT INTO receipts (vote_id, receipt_data)
         VALUES ($1, $2)
         RETURNING *;
         `;

         const values = [voteId, JSON.stringify(receiptJson)];
         try {
            const result = await pool.query(query, values);
            return result.rows[0];
         } catch(error){
            throw error;
         }
    }

    static async findById(id){
        const query = 'SELECT * FROM receipts WHERE id = $1;';
        try {
            const result = await pool.query(query,[id]);
            return result.rows[0];
        } catch(error){
            throw error;
        }
    }

    static async findByVoteId(voteId){
        const query = 'SELECT * FROM receipts WHERE vote_id = $1;';
        try {
            const result = await pool.query(query, [voteId]);
            return result.rows[0];
        } catch(error){
            throw error;
        }
    }
}

module.exports = Receipt;