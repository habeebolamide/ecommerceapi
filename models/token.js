
const mongoose =  require('mongoose')

const Token = mongoose.model('token', mongoose.Schema({
    userId: {
        type:  mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
    },
    )
) 



exports.Token = Token;
 