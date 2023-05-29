const { Cart,validate } = require('../models/cart')
const { User } = require('../models/user')
const mongoose =  require('mongoose')

const addToCart = async(req, res, next) => {
    const user = await User.findById({_id: req.user._id}).select('name')
    if( !mongoose.Types.ObjectId.isValid(req.body.ProductId)){
        return res.status(400).send (" Product dosen't Exist")
    }
    let findcart = await Cart.findOne({ product:req.body.ProductId })
    if (findcart && user) {
       findcart.quantity++
       await findcart.save()
        return res.json({
            message :"Product has been added to cart successfully"
        })
    }
    let cart = new Cart({
        customer: user._id,
        product: req.body.ProductId
    })

    cart.save().then((result) => {
        res.json({
            message :"Product has been added to cart successfully"
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

module.exports = {
    addToCart,
    getCart
};