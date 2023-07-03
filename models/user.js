const { timestamp } = require('joi/lib/types/date');
const mongoose =  require('mongoose')

const User = mongoose.model('user', mongoose.Schema({
    name :{
        type : String, 
        required : true,
    },
    email :{
        type : String, 
        required : true,
        unique:true
    },
    phone:{
        type : String
    },
    password:{
        type:String
    },
    isAdmin: { 
        type:Boolean,
        default : false
    }
    },
    {timestamps : true}
    
)
) 



exports.User = User;
 