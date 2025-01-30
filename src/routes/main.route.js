
const express = require('express')
const router = express.Router();
const { body } = require('express-validator')
const { renderHome, renderProfile } = require('../controllers/main.controller')
const checkSession = require('../middlewares/sessionChecker')

router.use(checkSession)

router.get('/home', renderHome)
router.get('/profile', renderProfile)

module.exports = router