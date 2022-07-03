const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'company',
  password: '123456789',
  port: 5432,
});

const getUsers = (request, response) => {
    pool.query('SELECT * FROM employee', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  module.exports = {
    getUsers,
  }