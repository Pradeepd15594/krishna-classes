let customerModel = require('./Models/customerModel');
const utils = require('../../../common/utils');
const helpers = require('../../../common/helpers');
const bcrypt = require('bcrypt');
const config = require('../../../config/config');
const crypto = require('crypto');
const { log } = require('console');
const secret = "pradeep@2022!";

const newUser = {};

//login
const loginCtrl = (body) => {
    try {
        return new Promise(async (resolve, reject) => {
            if (!body.mobile || body.mobile.length != 10) {
                reject({
                    status: false,
                    statusCode: 400,
                    message: "Please enter valid mobile"
                });
                return;
            }

            customerModel.findOne({ mobile: body.mobile }).then(async (res) => {
                if (res) {
                    if (res.status == "Disable") {
                        reject({
                            status: false,
                            statusCode: 401,
                            message: "Unauthorised, Please contact Admin"
                        });
                    } else {
                        let en = await encrypt(body.passCode);
                        if (en && en === res.passCode) {
                            let data = res.toJSON();
                            data = utils.formatUserData(res.toJSON());
                            data.token = utils.generateJWTForUser(data);
                            delete data['passCode'];
                            delete data['expiresAt'];
                            delete data['otp'];
                            resolve({
                                status: true,
                                statusCode: 200,
                                message: "Login successfull",
                                data: data
                            });
                        } else {
                            reject({
                                status: false,
                                statusCode: 400,
                                message: "User password not matched",
                            });
                        }
                    }
                } else {
                    reject({
                        status: false,
                        statusCode: 400,
                        message: "Vendor not found",
                        err: response
                    });
                }
            }).catch(error => {
                console.log('====================================');
                console.log(error, 'error');
                console.log('====================================');
                reject({
                    status: false,
                    statusCode: 500,
                    message: "Internal server error 3",
                    err: error
                });
            })
        })
    } catch (error) {
        reject({
            status: false,
            statusCode: 500,
            message: "Internal server error 4",
            err: error
        });
    }
}


//login
const signUpCtrl = (body, ip) => {
    try {
        return new Promise(async (resolve, reject) => {
            if (!body.mobile || body.mobile.length != 10) {
                reject({
                    status: false,
                    statusCode: 400,
                    message: "Please enter valid mobile"
                });
                return;
            }
            let pc = await encrypt(body.passCode);
            const obj = {
                ...body,
                "ipAddress": ip,
                "fullName": `${body.firstName} ${body.lastName}`,
                "passCode": pc,
            }
            customerModel.create(obj).then((res) => {
                let data = res;
                delete data['passCode'];
                if (res) {
                    resolve({
                        status: true,
                        statusCode: 200,
                        data: data,
                        message: "Registration added successfully"
                    });
                } else {
                    reject({
                        status: false,
                        statusCode: 400,
                        message: "Invalid request",
                        error: "Bad request"
                    });
                }
            }).catch((err) => {
                reject({
                    status: false,
                    statusCode: 500,
                    message: "Internal server error",
                    error: err.message
                });
            })

        })
    } catch (err) {
        reject({
            status: false,
            statusCode: 500,
            message: "Internal server error 4",
            err: err
        });
    }
}


/*@Send otp to Mobile*/
const getOtpToMobileCtrl = (body) => {
    return new Promise((resolve, reject) => {
        var digits = '0123456789';
        let randomgen = function (n, a) {
            var index = (Math.random() * (a.length - 1)).toFixed(0);
            return n > 0 ? a[index] + randomgen(n - 1, a) : '';
        };
        const OTP = Number(randomgen(6, digits));

        customerModel.findOne({ 'mobile': body.mobile }).then(async (response) => {
            if (response) {
                let expireDate = Date.now();
                expireDate += config.emailVericationOtpExpireTime;
                expireDate = new Date(expireDate);
                response[body.mobile] = OTP;
                response['expiresAt'] = expireDate;
                response.save().then(function (success) {
                    resolve({
                        status: true,
                        statusCode: 200,
                        userExist: true,
                        message: "OTP sent successfully",
                        data: { otp: OTP }
                    });
                }).catch((err) => {
                    reject({
                        status: false,
                        statusCode: 500,
                        message: "Internal server error",
                        error: err
                    });
                })
            } else {
                let expireDate = Date.now();
                expireDate += config.emailVericationOtpExpireTime;
                expireDate = new Date(expireDate);
                newUser[body.mobile] = OTP;
                resolve({
                    status: false,
                    statusCode: 200,
                    userExist: false,
                    message: "OTP sent successfully",
                    data: { otp: OTP }
                });

            }
        })
    }).catch((err) => {
        reject({
            status: false,
            statusCode: 400,
            message: err,
            error: err
        });
    })
}

/*@Send otp to mail*/
let verifyOtpCtrl = (body) => {
    return new Promise((resolve, reject) => {
        console.log(newUser, 'newUser');
        if (newUser[body.mobile]) {
            if (newUser[body.mobile] === body.otp) {
                console.log('verifyed');
                resolve({
                    status: true,
                    statusCode: 200,
                    message: "OTP verified",
                });
            } else {
                console.log('not verifyed');
                resolve({
                    status: false,
                    statusCode: 200,
                    message: "OTP Not verified",
                });
            }
        } else {
            customerModel.findOne({ mobile: body.mobile, otp: body.otp }).then(async (response) => {
                console.log(response, 'response');
                if (response) {
                    resolve({
                        status: true,
                        statusCode: 200,
                        message: "OTP sent successfully",
                        data: body
                    });
                } else {
                    resolve({
                        status: false,
                        statusCode: 200,
                        message: "Please Enter Valid OTP",
                        err: response
                    });
                }
            })
        }

    }).catch((err) => {
        reject({
            status: false,
            statusCode: 400,
            message: err,
            error: err
        });
    })
}

/*@Send otp to mail*/
let sendOtpToMail = (body) => {
    return new Promise((resolve, reject) => {
        customerModel.findOne({
            'email': body.email
        })
            .then(async (response) => {
                if (response) {
                    if (body.email) {
                        let randomgen = function (n, a) {
                            var index = (Math.random() * (a.length - 1)).toFixed(0);
                            return n > 0 ? a[index] + randomgen(n - 1, a) : '';
                        };
                        let rand = randomgen(6, '123456789')
                        let otp = rand;
                        // let otp = await utils.generateOtp()
                        let expireDate = Date.now();
                        expireDate += config.emailVericationOtpExpireTime;
                        expireDate = new Date(expireDate);
                        response.emailVerification = {
                            otp: otp,
                            expiresAt: expireDate
                        }
                        response.save().then(function (success) {

                            resolve({
                                status: true,
                                statusCode: 200,
                                message: "OTP sent successfully",
                                data: null
                            });
                        }).catch((err) => {
                            reject({
                                status: false,
                                statusCode: 500,
                                message: "Internal server error",
                                error: err
                            });
                        })
                    }
                } else {
                    resolve({
                        status: false,
                        statusCode: 200,
                        message: "User not found",
                        err: response
                    });
                }

            })
    }).catch((err) => {
        reject({
            status: false,
            statusCode: 400,
            message: err,
            error: err
        });
    })
}

/*@verify otp with mail*/
let verifyOtpEmail = (body, id) => {
    return new Promise((resolve, reject) => {
        customerModel.findOne({
            _id: id
        }).then(async (response) => {
            if (response) {
                let toDay = Date.now();
                let expireDay = response.emailVerification.expiresAt;
                expireDay = new Date(expireDay).getTime();
                if (response.emailVerification.status) {
                    resolve({
                        status: false,
                        statusCode: 200,
                        message: 'OTP already verified successfully',
                        data: null
                    });
                    return;
                }
                if (toDay <= expireDay) {
                    if (body.otp === response.emailVerification.otp) {
                        response.emailVerification.status = true;
                        response.emailVerification.otp = null;
                        response.emailVerification.expiresAt = null;
                        response.save(function (err, data) {
                            if (err) {
                                reject({
                                    status: false,
                                    statusCode: 500,
                                    message: "Internal server error",
                                    error: err.message
                                });
                            } else {
                                data = utils.formatUserData(data.toJSON());
                                resolve({
                                    status: true,
                                    statusCode: 200,
                                    message: "OTP verified successfully",
                                    data: data
                                });
                            }
                        });
                    } else {
                        reject({
                            status: false,
                            statusCode: 400,
                            message: "Please enter valid OTP",
                            error: null
                        });
                    }
                } else {
                    reject({
                        status: false,
                        statusCode: 400,
                        message: "Otp expired",
                        error: null
                    });
                }
            } else {
                reject({
                    status: false,
                    statusCode: 400,
                    message: "User not found",
                    error: null
                });
            }
        }).catch((err) => {
            reject({
                status: false,
                statusCode: 500,
                message: "Internal server error",
                error: err.message
            });
        })
    })
}



/*@Update vendor profile*/
let updateVendor = (body, id) => {
    return new Promise(async (resolve, reject) => {
        let getVenodrData = await customerModel.findOne({ _id: id })
        if (getVenodrData) {
            let updateBasicDetails = await customerModel.findByIdAndUpdate({
                _id: id
            }, {
                $set: body
            }, {
                new: true
            })
            if (body.brandName) {
                let updateVendorBusinessOverviewDetails1 = await updateVendorBusinessOverviewDetails(body, id)
            }
            if (body.panCard) {
                let updateVendorBusinessDetails1 = await updateVendorBusinessDetails(body, id)
            }
            if (body.beneficiaryName) {
                let updateVendorAccountDetails1 = await updateVendorAccountDetails(body, id)
            }
            if (body.documents) {
                let updateVendorDocuments1 = await updateVendorDocuments(body, id)
            }
            resolve({
                status: true,
                statusCode: 200,
                message: "Vendor updated successfully",
                data: null
            })

        } else {
            reject({
                status: false,
                statusCode: 400,
                message: "No vendor found"
            });
        }
    });
};
let bcryptPWd = (pwd) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(pwd, 10, function (err, hash) {
            if (err) reject(err);
            else if (hash) resolve(hash)
        })
    })
}
/*@Change Password*/
let changePassword = (_id, body) => {
    return new Promise((resolve, reject) => {
        if (!helpers.isValidPasword(body.password)) {
            reject({
                status: false,
                statusCode: 400,
                message: "Password must contain atleast one lowercase, uppercase, number, special character"
            });
        } else if (body.confirmPassword !== body.password) {
            reject({
                status: false,
                statusCode: 400,
                message: "New password and Confirm password did not match"
            });
        } else {
            customerModel.findOne({
                _id: _id
            }).then(async response => {
                // bcrypt.compare(body.oldPassword, response.password, async function (err, hash) {
                if (response) {
                    // delete body.oldPassword;
                    body.password = await bcryptPWd(body.password);
                    body.passwordLastUpdate = Date.now();
                    customerModel.updateOne({
                        _id: _id
                    }, {
                        $set: body
                    }).then((savedDoc) => {
                        if (savedDoc) {
                            resolve({
                                status: true,
                                statusCode: 200,
                                message: "Password has been successfully updated",
                                data: savedDoc
                            });
                        } else {
                            reject({
                                status: false,
                                statusCode: 400,
                                message: "Password update failed",
                                error: "Bad request"
                            });
                        }
                    }).catch((err) => {
                        reject({
                            status: false,
                            statusCode: 500,
                            message: "Internal Server Error",
                            error: err
                        });
                    });

                } else {
                    reject({
                        status: false,
                        statusCode: 400,
                        message: "Invalid old password",
                        error: err
                    });
                }
                // })
            }).catch(err => {
                reject({
                    status: false,
                    statusCode: 500,
                    message: "Internal Server Error",
                    error: err
                });
            });
        }
    })
}


count = function (ary, classifier) {
    classifier = classifier || String;
    return ary.reduce(function (counter, item) {
        var p = classifier(item);
        counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
        return counter;
    }, {})
};






/*@forgot password*/
let forgotPassword = (id, body) => {
    return new Promise((resolve, reject) => {
        if (!helpers.isValidPasword(body.password)) {
            reject({
                status: false,
                statusCode: 400,
                message: "Password must contain atleast one lowercase, uppercase, number, special character"
            });
        } else if (body.confirmPassword !== body.password) {
            reject({
                status: false,
                statusCode: 400,
                message: "New password and Confirm password did not match"
            });
        } else {
            customerModel.findOne({
                _id: id
            }).then(async response => {
                if (response) {
                    body.password = await bcryptPWd(body.password);
                    body.passwordLastUpdate = Date.now();
                    customerModel.updateOne({
                        _id: id
                    }, {
                        $set: body
                    }).then((savedDoc) => {
                        if (savedDoc) {
                            resolve({
                                status: true,
                                statusCode: 200,
                                message: "Password has been successfully updated",
                                data: savedDoc
                            });
                        } else {
                            reject({
                                status: false,
                                statusCode: 400,
                                message: "Password update failed",
                                error: "Bad request"
                            });
                        }
                    }).catch((err) => {
                        reject({
                            status: false,
                            statusCode: 500,
                            message: "Internal Server Error",
                            error: err
                        });
                    });
                } else {
                    reject({
                        status: false,
                        statusCode: 400,
                        message: "No data found",
                    });
                }
            }).catch((err) => {
                reject({
                    status: false,
                    statusCode: 500,
                    message: "Internal Server Error",
                    error: err
                });
            });
        }
    })
}

let changePassword_oldPassword = (_id, body) => {
    return new Promise((resolve, reject) => {
        if (body.oldPassword == body.password) {
            reject({
                status: false,
                statusCode: 400,
                message: "Both old and new passwords cannot be same"
            });
        } else if (!helpers.isValidPasword(body.password)) {
            reject({
                status: false,
                statusCode: 400,
                message: "Password must contain atleast one lowercase, uppercase, number, special character"
            });
        } else if (body.confirmPassword !== body.password) {
            reject({
                status: false,
                statusCode: 400,
                message: "New password and Confirm password did not match"
            });
        } else {
            customerModel.findOne({
                _id: _id
            }).then(async response => {
                bcrypt.compare(body.oldPassword, response.password, async function (err, hash) {
                    if (hash) {
                        delete body.oldPassword;
                        body.password = await bcryptPWd(body.password);
                        body.passwordLastUpdate = Date.now();
                        customerModel.updateOne({
                            _id: _id
                        }, {
                            $set: body
                        }).then((savedDoc) => {
                            if (savedDoc) {
                                resolve({
                                    status: true,
                                    statusCode: 200,
                                    message: "Password has been successfully updated",
                                    data: savedDoc
                                });
                            } else {
                                reject({
                                    status: false,
                                    statusCode: 400,
                                    message: "Password update failed",
                                    error: "Bad request"
                                });
                            }
                        }).catch((err) => {
                            reject({
                                status: false,
                                statusCode: 500,
                                message: "Internal Server Error",
                                error: err
                            });
                        });

                    } else {
                        reject({
                            status: false,
                            statusCode: 400,
                            message: "Invalid old password",
                            error: err
                        });
                    }
                })
            }).catch(err => {
                reject({
                    status: false,
                    statusCode: 500,
                    message: "Internal Server Error",
                    error: err
                });
            });
        }
    })
}


//Encrypting text
const encrypt = async (text) => {
    const sha256Hasher = crypto.createHmac("sha256", secret);
    return sha256Hasher.update(text).digest("hex");
}


module.exports = {
    loginCtrl,
    signUpCtrl,
    getOtpToMobileCtrl,
    verifyOtpCtrl,
    changePassword,
    sendOtpToMail,
    verifyOtpEmail,
    updateVendor,
    forgotPassword,
    changePassword_oldPassword
}