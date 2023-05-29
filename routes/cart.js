const express = require( 'express' )
const router = express.Router();
const CartController = require('../controller/CartController')
const upload = require('../middleware/upload')
router.use(express.json())

router.post('/addtocart', CartController.addToCart)
router.get('/getcart', CartController.getCart)

module.exports = router