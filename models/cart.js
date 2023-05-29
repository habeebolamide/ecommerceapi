const mongoose =  require('mongoose')
const Joi = require('joi')

const Cart = mongoose.model('cart', mongoose.Schema({
    customer: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
      },
    quantity:{
        type:Number,
        default :1
    }  
})
) 


function validateProduct(cart) {
    const schema = {
      ProductId: Joi.objectId().required(),
    };
  
    return Joi.validate(cart, schema);
  }

exports.validate = validateProduct;
exports.Cart = Cart;
 