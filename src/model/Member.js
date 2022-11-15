const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    fullName: {
        type: String
    },
    
    email: {
        type: String
    },
    password: {
        type: String
    },
    contact_no: {
        type:Number,
    },
    birthday: {
        type: String
    },
    HRCode: {
        type: String
    },
    MetaUser: {
        type: mongoose.Types.ObjectId,
        ref: "MetaData"
    },

    role: {
        type: String,
        enum: ['Staff', 'HR', 'Admin'],
        default: 'Staff'
    },
    media: {
        type: mongoose.Types.ObjectId,
        ref: "medias"

    }

},
    { timestamps: true },
)
module.exports = mongoose.model("Users", UserSchema);