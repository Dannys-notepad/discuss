const express = require('express')
const router = express.Router();
const { body } = require('express-validator')
const { renderLogin, renderSignup, processSignup, processLogin } = require('../controllers/auth.controller')

router.get('/signup', renderSignup)
router.get('/login', renderLogin)

router.post('/signup', [
  body('username').isLength({min: 3, max: 30}).withMessage('username cannot be short than 3 characters and longer than 30'),
  body('email').isEmail().isLength({ min:3, max:50 }).withMessage('Email must be valid and not longer than 50 or less that 3 characters'),
  body('password').isLength({min: 6, max: 20}).withMessage('password must not be less than 6 or more than 20 characters'),
  body('confirm_password').custom((value, {req}) => value === req.body.password).withMessage('passwords must match')
  ], processSignup)


router.post('/login', processLogin)

module.exports = router