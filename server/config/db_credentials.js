const Pool = require('pg').Pool

const pool = new Pool({
  user : process.env.POSTGRES_USER,
  host : process.env.POSTGRES_HOST,
  database : process.env.POSTGRES_CREDENTIALS_DATABASE,
  password : process.env.POSTGRES_PASSWORD,
  port : process.env.POSTGRES_PORT
})
 
const credential_query = async (text, params) => {
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start
  // console.log('executed query', { text, params, duration, rows: res.rowCount })
  return res
}

module.exports = credential_query