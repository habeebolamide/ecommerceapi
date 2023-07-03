const mongoose =  require('mongoose')
const Joi = require('joi')

const Product = mongoose.model('product', mongoose.Schema({
    product_name :{
        type : String, 
        required : true,
    },
    product_img :{
        type : String, 
        required : true,
    },
    category :{
        type : String, 
        required : true,
    },
    price:{
        type : Number
    },
    numberInStock:{
        type:Number
    }
},
{timestamps : true}

)
) 

// function validateProduct(product) {
//     const schema = {
//         product_name: Joi.string().min(3).required(),
//         category: Joi.string().min(3).required(),
//         price: Joi.number().required(),
//         numberInStock: Joi.number().min(0).required(),
//       };
    
//       return Joi.validate(product, schema);
// }

// exports.validate = validateProduct;
exports.Product = Product;
 