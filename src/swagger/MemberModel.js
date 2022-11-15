const Member={
    fullName: {
        type: "string"
    },
    
    email: {
        type: "string"
    },
    password: {
        type: "string"
    },
    contact_no:{
        type: "number"
    },
    birthday: {
        type: "string"
    },
    HRCode: {
        type: "string"
    },
    // MetaUser: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "MetaData"
    // },

    role: {
        type: "string",
        enum: ['Staff', 'HR', 'Admin'],
        default: 'Staff'
    },
    // media: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "medias"

    // }

}
module.exports={Member}
