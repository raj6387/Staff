const Joi = require("joi")
const Schema = Joi.object({
    fullName: Joi.string().required().messages({ 'any.required': 'firstName is required field' }),
    email: Joi.string().email().required().messages({ 'any.required': 'email is required field' }),
    password: Joi.string().required().messages({ 'any.required': 'password is required field' }),
    contact_no: Joi.number().integer().min(10 ** 9).max(10 ** 10 - 1).required().messages({
        'number.min': 'Mobile number should be 10 digit.',
        'number.max': 'Mobile number should be 10 digit'
    }),
    birthday: Joi.string().required().messages({ 'any.required': 'birthday is required field' }),
    birthplace: Joi.string().empty(),
    sex: Joi.string().empty(),
    hometown: Joi.string().empty(),
    nation: Joi.string().empty(),
    religion: Joi.string().empty(),
    identification: Joi.string().empty(),
    daysOfIdentity: Joi.string().empty(),
    placeOfIssue: Joi.string().empty(),
    resident: Joi.string().empty(),
    currentAddress: Joi.string().empty(),
    literacy: Joi.string().empty(),
    bankAccount: Joi.number().empty(),
    bankName: Joi.string().empty(),
    bankOfIssue: Joi.string().empty(),
    facebook: Joi.string().empty(),
    linkedIn: Joi.string().empty(),
    skype: Joi.string().empty(),
    status: Joi.string().empty(),
    maritalStatus: Joi.string().empty(),
    jobPosition: Joi.string().empty(),
    workPlace: Joi.string().empty(),
    role: Joi.string().empty(),
    media: Joi.string().empty()

    //HRCode: Joi.number().required().messages({ 'any.required': 'HRCode is required field' }),

})
module.exports = { Schema }