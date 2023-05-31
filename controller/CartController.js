const { Cart,validate } = require('../models/cart')
const { User } = require('../models/user')
const { Product } = require('../models/product')

const mongoose =  require('mongoose')

const addToCart = async(req, res, next) => {
    const user = await User.findById({_id: req.user._id}).select('name')
    if( !mongoose.Types.ObjectId.isValid(req.body.ProductId)){
        return res.status(400).send (" Product dosen't Exist")
    }
    let findcart = await Cart.findOne({ product:req.body.ProductId, customer:req.user._id })
    let product = await Product.findOne({ _id:req.body.ProductId })
    if (findcart) {
            findcart.quantity++
            product.numberInStock--
            await findcart.save()
            await product.save()
            return res.json({
                message :"+1"
            })
    }
    let cart = new Cart({
        customer: user._id,
        product: req.body.ProductId
    })

    cart.save()
    .then((result) => {
        product.numberInStock--
        product.save().then( () =>{
        })
        res.json({
            message :"Product has been added to cart successfully"
        })
    })
    .catch((err) => {
        res.json({
            message : err.message
        })
    })
}

const getCart = async (req, res) => {
    const user = await User.findById({_id: req.user._id}).select('name')
    Cart.find({ customer:user._id })
    .populate('customer')
    .populate('product')
    .then((cart) => {
        res.json({
            cart
        })
    })
    .catch((err) => {
        res.json({
            err: err.message
        })
    })
}

const removeFromCart = async (req ,res) => {
    // const user = await User.findById({_id: req.user._id}).select('name')
    const product = await Product.findOne({_id:req.params.product_id})
    Cart.deleteOne({customer: req.user._id, product:req.params.product_id})
    .then(() =>{
        res.json({
            message : "Product Has beeen removed from Cart"
        })
    })
    .catch((err) => {
        res.json({
            error : err.message
        })
    })
}

module.exports = {
    addToCart,
    getCart,
    removeFromCart
};