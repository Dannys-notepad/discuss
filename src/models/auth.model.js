const db = require('../config/db')

class auth{
  async createUser(data){
    const [result] = await db.execute('INSERT INTO users (user_id, username, user_email, password_hash) VALUES (?, ?, ?, ?)', [data.id, data.username, data.email, data.hashedpassword])
    return result.insertId
  }
    
  async searchUser(data){
    const [result] = await db.execute('SELECT * FROM users WHERE username = ? AND password_hash = ?', [data.email, data.password])
    return result[0]
  }
  
  async searchUserByName(username){
    const [result] = await db.execute('SELECT * FROM users WHERE username = ?', [username])
    return result[0]
  }
    
  async searchUserByEmail(email){
    const [result] = await db.execute('SELECT * FROM users WHERE user_email = ?', [email])
    return result[0]
  }
    
  async searchUserByPassword(password){
    const [result] = await db.execute('SELECT * FROM users WHERE password_hash = ?', [password])
    return result[0]
  }
    
  async updatePassword(newHash, email){
    const [result] = await db.execute('UPDATE user  SET password_hash = ? WHERE email = ?', [newHash, email])
    return result.affectedRows
  }
    
  async deleteUser(email){
    const [result] = await db.execute('DELETE FROM users where email = ?', [email])
    return result.affectedRows
  }
}

module.exports = { auth }