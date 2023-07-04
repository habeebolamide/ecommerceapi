const express = require( 'express' )
const router = express.Router();
const AuthController = require('../controller/AuthController')
router.use(express.json())

router.post('/register', AuthController.register)
      .post('/login', AuthController.login)
      .post('/forgot-password',AuthController.forgotpassword)
      .post('/password-reset/:userId/:token',AuthController.resetpassword)

module.exports = router