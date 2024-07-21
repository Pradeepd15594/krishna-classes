"use strict";

let _ = require("underscore");


var Helper = function () {
};

Helper.prototype.isValidEmail = function (email) {
    return _.isString(email) && /^\S+@\S+\.\S+/.test(email);
}

Helper.prototype.isValidPhoneNumber = function (phNo) {
    return /[0-9]{10}/.test(phNo);
}

Helper.prototype.isValidPasword = function (password) {
    // var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    // return strongRegex.test(password);
    return true;
}

module.exports = new Helper();
