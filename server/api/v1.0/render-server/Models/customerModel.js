let mongoose = require('mongoose');
let ObjectID = mongoose.Schema.ObjectId;

const Schema = new mongoose.Schema({
    fullName: { type: String, },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    mobile: { type: String },
    ipAddress: { type: String },
    passCode: { type: String },
    dob: { type: Date },
    houseNo: { type: String },
    address1: { type: String, default: '' },
    address2: { type: String, default: '' },
    townCity: { type: String },
    postCode: { type: String },
    employeeType: { type: String },
    country: { type: String },
    lat: { type: String },
    lng: { type: String },
    status: { type: Boolean, default: true },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    otp: { type: Number },
    expiresAt: { type: Date }
}, { timestamps: true })
let customerModel = mongoose.model('customers', Schema, 'customers');
module.exports = customerModel;