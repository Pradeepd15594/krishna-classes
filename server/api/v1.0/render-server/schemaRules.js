const Joi = require('@hapi/joi');

const loginSchema = {
    body: {
        mobile: Joi.string().required(),
        passCode: Joi.string().required()
    }
}

const signUpSchema = {
    body: {
        email: Joi.string().required(),
        passCode: Joi.string().required(),
        mobile: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        dob: Joi.number().required(),
        postCode: Joi.string().required(),
        postCode: Joi.string().required(),
        houseNo: Joi.string().required(),
        address1: Joi.string().required(),
        address2: Joi.string().allow(null, ''),
        townCity: Joi.string().required(),
        country: Joi.string().required(),
        employeeType: Joi.string().required(),
        lat: Joi.string().allow(null, ''),
        lng: Joi.string().allow(null, ''),
    }
}

module.exports = {
    loginSchema,
    signUpSchema,
};