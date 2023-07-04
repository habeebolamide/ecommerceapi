const mongoose =  require('mongoose')

const User = mongoose.model('user', mongoose.Schema({
    name :{
        type : String, 
        required : [true, 'Name is required'],
    },
    email :{
        type : String, 
        required : [true, 'Email is required'],
        unique:true
    },
    phone:{
        type : String,
        required : [true, 'Phone is required']
    },
    password:{
        type:String,
        required : [true, 'Password is required']
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
 