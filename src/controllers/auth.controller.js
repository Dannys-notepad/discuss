const { validationResult } = require('express-validator')
const { auth } = require('../models/auth.model')
const Auth = new auth();
const generate = require('../utils/generate')

const renderSignup = (req, res) => {
  res.render('signup')
}

const renderLogin = (req, res) => {
  res.render('login')
}

const processSignup = async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({
      statusCode: 400,
      error: errors.array()
    })
  }
  
  const { username, email, password} = await req.body
  let dbSchema = await {
    id: generate.uid(),
    username: username.trim(),
    email,
    hashedpassword: btoa(password)
  }
  
  try {
    let user
    user = await Auth.searchUserByName(dbSchema.username);
    if(user){
      return res.status(400).json({
        statusCode: 400,
        msg: 'A user with this name already exists '
      })
    }
    
    user = await Auth.searchUserByEmail(dbSchema.email)
    if(user){
      return res.status(400).json({
        statusCode: 400,
        msg: 'A user with this email already exists '
      })
    }
    
    user = await Auth.createUser(dbSchema)
    return res.redirect('/login')
    
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      statusCode: 500,
      msg: 'an error occured, try again later'
    })
  }
}

const processLogin = async (req, res) => {
  const { email, password } = await req.body
  const data = {
    email,
    password: btoa(password)
  }
  
  try {
    let user
    user = await Auth.searchUserByEmail(data.email)
    if(!user){
      return res.status(400).json({
        statusCode: 400,
        msg: 'there\'s no user with this email'
      })
    }
    
    user = await Auth.searchUser(data)
    if(!user){
      return res.status(400).json({
        statusCode: 400,
        msg: 'password is incorrect'
      })
    }
    
    res.session.user = {
      user: user.user_id
    }
    
    return res.redirect('/profile')
    
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      statusCode: 500,
      msg: 'an error occured, try again later'
    })
  }
}

module.exports = {
  renderSignup,
  renderLogin,
  processSignup,
  processLogin
}
