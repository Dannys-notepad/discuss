const db = require('../config/db')

const check = async (req, res, next) => {
  if(typeof req.session.user === 'undefined'){
    return res.redirect('/login')
  }
  let exists = await db.execute('SELECT * FROM users WHERE user_id = ?', [req.session.user.id])
  if(!exists){
    return res.redirect('/login')
  }
  next()
}

module.exports = check