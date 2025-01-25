const MySQL = require('mysql2/promise')

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}

const db = MySQL.createPool(dbConfig)

module.exports = db