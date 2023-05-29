const express = require( 'express' )
const router = express.Router();
const AuthController = require('../controller/AuthController')
const authenticate = require('../middleware/authenticate')
router.use(express.json())

router.get('/hi' , authenticate, (req,res) => {
    res.json({
        message: "Ya Authenticated"
    })
})
module.exports = router