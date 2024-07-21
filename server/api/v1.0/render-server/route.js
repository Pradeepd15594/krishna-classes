const express = require('express');
const router = express.Router();
const AuraCustomerController = require('./controller');
const validationBody = require('../middlewares/validations');
const multiparty = require('connect-multiparty');
const multipartymiddleware = multiparty();
const validateForm = require('express-joi-validator');
const schemaRules = require('./schemaRules');
const authMiddleware = require('../middlewares/auth');


/*@Customer login */
router.post('/login', validationBody.requiresBody, validateForm(schemaRules.loginSchema, {}), ((req, res) => {
    AuraCustomerController.loginCtrl(req.body).then((response) => {
        res.status(response.statusCode).json(response);
    }).catch((err) => {
        res.status(err.statusCode).json(err);
    })
}));


/*@Sign Up Customer */
router.post('/signUp', validationBody.requiresBody, validateForm(schemaRules.signUpSchema, {}), ((req, res) => {
    AuraCustomerController.signUpCtrl(req.body, req.ip).then((response) => {
        res.status(response.statusCode).json(response);
    }).catch((err) => {
        res.status(err.statusCode).json(err);
    })
}));

/*@Sign Up Customer */
router.post('/getOtp', validationBody.requiresBody, ((req, res) => {
    AuraCustomerController.getOtpToMobileCtrl(req.body).then((response) => {
        res.status(response.statusCode).json(response);
    }).catch((err) => {
        res.status(err.statusCode).json(err);
    })
}));

/*@verify otp mobile*/
router.post('/verifyOtp', ((req, res) => {
    console.log(req.body, 'req.body+');
    AuraCustomerController.verifyOtpCtrl(req.body).then((response) => {
        res.status(response.statusCode).json(response);
    }).catch((err) => {
        res.status(err.statusCode).json(err);
    })
}));

/*@Get transactions*/
router.get('/getTransactions/:id', ((req, res) => {
    AuraCustomerController.getTransactions(req.query, req.params.id)
        .then((response) => {
            res.status(response.statusCode).json(response);
        }).catch((err) => {
            res.status(err.statusCode).json(err);
        })
}));

/*@change password*/
router.put('/changePassword/:id', ((req, res) => {
    AuraCustomerController.changePassword(req.params.id, req.body).then((response) => {
        res.status(response.statusCode).json(response)
    }).catch((err) => {
        res.status(err.statusCode).json(err)
    })
}));

/*@send otp to mail*/
router.post('/sendOtpToMail', validationBody.requiresBody, ((req, res) => {
    AuraCustomerController.sendOtpToMail(req.body).then((response) => {
        res.status(response.statusCode).json(response);
    }).catch((err) => {
        res.status(err.statusCode).json(err);
    })
}));
/*@verify otp email*/
router.post('/verifyOtpEmail', ((req, res) => {
    AuraCustomerController.verifyOtpEmail(req.body, req.params.id).then((response) => {
        res.status(response.statusCode).json(response);
    }).catch((err) => {
        res.status(err.statusCode).json(err);
    })
}));
/*@update vendor*/
router.put('/updateVendor/:id', ((req, res) => {
    AuraCustomerController.updateVendor(req.body, req.params.id).then((response) => {
        res.status(response.statusCode).json(response)
    }).catch((err) => {
        res.status(err.statusCode).json(err)
    })
}));
/*@updateVendorBusinessOverviewDetails*/
router.put('/updateVendorBusinessOverviewDetails/:id', ((req, res) => {
    AuraCustomerController.updateVendorBusinessOverviewDetails(req.body, req.params.id).then((response) => {
        res.status(response.statusCode).json(response)
    }).catch((err) => {
        res.status(err.statusCode).json(err)
    })
}));
/*@updateVendorBusinessDetails*/
router.put('/updateVendorBusinessDetails/:id', ((req, res) => {
    AuraCustomerController.updateVendorBusinessDetails(req.body, req.params.id).then((response) => {
        res.status(response.statusCode).json(response)
    }).catch((err) => {
        res.status(err.statusCode).json(err)
    })
}));
/*@updateVendorAccountDetails*/
router.put('/updateVendorAccountDetails/:id', ((req, res) => {
    AuraCustomerController.updateVendorAccountDetails(req.body, req.params.id).then((response) => {
        res.status(response.statusCode).json(response)
    }).catch((err) => {
        res.status(err.statusCode).json(err)
    })
}));
/*@add offers*/





/*@forgot password by id*/
router.put('/forgotPassword/:id', ((req, res) => {
    AuraCustomerController.forgotPassword(req.params.id, req.body).then((response) => {
        res.status(response.statusCode).json(response)
    }).catch((err) => {
        res.status(err.statusCode).json(err)
    })
}));

//vendorsReport_Transaction
router.get('/vendorsReport_Transaction/:id1/:id2/:id3', ((req, res) => {
    AuraCustomerController.vendorsReport_Transaction(req.params.id1, req.params.id2, req.params.id3).then((response) => {
        res.download(response.file, function (err, response) {
            if (err) {
                console.log(err)
            } else {
                console.log(response)
            }
        })
    }).catch((err) => {
        res.status(err.statusCode).json(err);
    })
}));
/*@change password with oldpassword*/
router.put('/resetPassword/:id', ((req, res) => {
    AuraCustomerController.changePassword_oldPassword(req.params.id, req.body).then((response) => {
        res.status(response.statusCode).json(response)
    }).catch((err) => {
        res.status(err.statusCode).json(err)
    })
}));



module.exports = router;