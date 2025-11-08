const pool = require('../db');

class User {
  static async create(electionData){
    const {title, description, startDate, endDate, candidates } = electionData;
    const query = `
    INSERT INTO elections(title, description, start_date, end_date, candidates )
    VALUES ($1, $2, $3, $4, $5 )
    RETURNING*;
    `;

    const values = [title, description, startDate, endDate, JSON.stringify(candidates)];
    try{
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch(error){
      throw error;
    }
  }

  static async findById(id){
    const query = 'SELECT * FROM elections WHERE id = $1;';
    try{
      const result = await pool.query(query, ['id']);
      return result.rows[0];
    } catch(error){
      throw error;
    }
  }

  static async findAll() {
    const query = 'SELECT *FROM elections ORDER BY created_at DESC;';
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch(error){
      throw error;
    }
  }

  static async update(id, electionData){
    const {title, description, startDate, endDate, candidates} = electionData;
    const query = `
    UPDATE elections
    SET title = $1, description = $2, start_date = $3, end_date = $4, candidates = $5, updated_at = CURRENT_TIMESTAMP
    WHERE id= $6
    RETURNING *;
    `;
    const values = [title, description, startDate, endDate, JSON.stringify(candidates), id];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch(error){
      throw error;
    }
  }

  static async delete(id){
    const query = 'DELETE FROM  elections WHERE id = $1 RETURNING *;';
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch(error){
      throw error;
    }
  }
}

module.exports = User;