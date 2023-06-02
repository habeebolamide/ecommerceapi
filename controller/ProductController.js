const { Product,validate } = require('../models/product')

const getProduct = (req,res,next) => {
    Product.find().then( result => {
        res.json({
            product:result 
        })
    })
}


const addProduct = (req, res, next) => {
    let product = new Product ({
        product_name: req.body.product_name,
        product_img : `http://localhost:3005/${req.file.path}`,
        category: req.body.category,
        price: req.body.price,
        numberInStock: req.body.numberInStock
    })

    product.save()
    .then(result => {
        res.json({
            product:result
        })
    })
    .catch( err => {
        res.json({
            error: err.message 
        })
    })
}

const updateProduct = async(req, res ) => {
    const product = await Product.findOne({_id:req.params.id})

    if (!product) {
        return res.json({
            error: "Product Not Found"
        })
    }

    Product.findByIdAndUpdate( {_id:req.params.id}, {
        product_name: req.body.product_name,
        product_img : `http://localhost:3005/${req.file.path}`,
        category: req.body.category,
        price: req.body.price,
        numberInStock: req.body.numberInStock
    } ).then( result => {
        res.json({
            message : "Product Updated Successfully"
        })
    })
}   

const deleteProducts = async(req, res) => {
    const product = await Product.findOne({_id:req.params.id})

    if (!product) {
        return res.json({
            error: "Product Not Found"
        })
    }
    
    Product.deleteOne( {_id : req.params.id}).then((result) => {
        res.json({
            message : "Product Deleted Successfully"
        })
        .catch((err) => {
            res.json({
                error : err.message
            })
        })
    })
}

module.exports = {
    getProduct,
    addProduct,
    updateProduct,
    deleteProducts
};
  