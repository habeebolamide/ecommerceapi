const express = require( 'express' )
const router = express.Router();
const productController = require('../controller/ProductController')
const upload = require('../middleware/upload')
const admin = require('../middleware/admin')
router.use(express.json())
router.get('/get-recent-product',productController.getRecentProduct)
router.use(admin)
router.get('/getprodcuts',productController.getProduct)
      .get('/getprodcutsdetails/:id',productController.getProductDetails)
      .post('/addproducts', upload.single('product_img'), productController.addProduct)
      .put('/:id/updateproduct', upload.single('product_img'), productController.updateProduct)
      .delete('/:id/deleteproduct', productController.deleteProducts)

module.exports = router