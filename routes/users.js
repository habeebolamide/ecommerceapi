const express = require( 'express' )
const router = express.Router();
const AuthController = require('../controller/AuthController')
router.use(express.json())

router.post('/register', AuthController.register)
      .post('/login', AuthController.login)


module.exports = router