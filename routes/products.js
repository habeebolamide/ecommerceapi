const express = require( 'express' )
const router = express.Router();
const productController = require('../controller/ProductController')
const upload = require('../middleware/upload')
const admin = require('../middleware/admin')
router.use(express.json())
router.use(admin)
router.get('/getprodcuts',productController.getProduct)
router.post('/addproducts', upload.single('product_img'), productController.addProduct)
router.put('/:id/updateproduct', upload.single('product_img'), productController.updateProduct)
router.delete('/:id/deleteproduct', productController.deleteProducts)

module.exports = router