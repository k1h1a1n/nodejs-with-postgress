const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'usermanagement',
  password: '123456789',
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query('SELECT * FROM usermangementdetails', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const createUser = (request, response) => {
  const { first_name, last_name , birth_date , age , address , role, email} = request.body

  pool.query('INSERT INTO usermangementdetails (first_name,last_name,birth_date,age,address,role , email) VALUES ($1,$2,$3,$4,$5,$6 ,$7) RETURNING *', [first_name, last_name , birth_date , age , address , role , email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}
const deleteUser = (request, response) => {
  const id = request.params.id

  pool.query('DELETE FROM usermangementdetails WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { first_name, last_name , birth_date , age , address , role , email} = request.body

  pool.query(
    'UPDATE usermangementdetails SET first_name = $1, last_name = $2,birth_date = $3,age = $4,address = $5,role = $6 , email = $7 WHERE id = $8',
    [first_name, last_name , birth_date , age , address , role , email , id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser
}