const db = require('../config/db')

const check = async (req, res, next) => {
  if(typeof req.sesion === 'undefined'){
    return res.redirect('/login')
  }
  let exists = await db.execute('SELECT * FROM TABLE WHERE user_id = ?', [req.sesion.user.id])
  if(!exists){
    return res.redirect('/login')
  }
}

module.exports = check