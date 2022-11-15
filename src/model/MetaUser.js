const mongoose = require("mongoose");
const MetaUserSchema = mongoose.Schema({
    birthplace:
    {
        type: String,
    },
    sex: {
        type: String,
    },
    hometown: {
        type: String,
    },
    nation: {
        type: String,
    },
    religion: {
        type: String,
    },
    identification: {
        type: String,
    },
    daysOfIdentity: {
        type: String,
    },
    placeOfIssue: {
        type: String
    },
    resident: {
        type: String,
    },
    currentAddress: {
        type: String,
    },
    literacy: {
        type: String,
    },
    bankAccount: {
        type: Number
    },
    bankName: {
        type: String,
    },
    bankOfIssue: {
        type: String
    },
    facebook: {
        type: String
    },
    linkedIn: {
        type: String,
    },
    skype: {
        type: String,
    },
    status: {
        type: String

    },
    maritalStatus: {
        type: String,
    },
    jobPosition: {
        type: String,
    },
    workPlace: {
        type: String,
    },





})
module.exports = mongoose.model("MetaData", MetaUserSchema)