const jwt = require('jsonwebtoken')
const userModel = require('../user/model')
const env = require('dotenv').config()
const ObjectId = require('mongoose').Types.ObjectId
const constants = require('../../../common/constants')
const DcfUserModel = require('../dcfUser/model')



/**
 * This method is used to verify the token passed in the request header and then validate the user and pass the roleId of the user in the request for 
 * the API to validate if the user can perform the action on it or not.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getTokenAndValidateUser = (req, res, next) => {

    let userToken = ''

    try {
        userToken = req.headers['authorization'].split(' ')[1]
    } catch (err) {
        res.status(401).json({ status: false, statusCode: 401, message: "Invalid or Missing Header", data: null });
    }

    if (userToken != '') {

        jwt.verify(userToken, process.env.JWT_SECRET, function (err, decodedToken) {
            if (err) {
                //console.log(err)
                res.status(401).json({ status: false, statusCode: 401, message: "Invalid Token", data: null });
            }

            let decodedTokenAttributes = decodedToken



            let username = { "userName": decodedTokenAttributes.username };
            if (decodedTokenAttributes.email) {
                username = { "email": decodedTokenAttributes.email }
            }

            // Getting the username and useid from the token
            // let username = decodedTokenAttributes.username
            let userId = (decodedTokenAttributes.userId ? decodedTokenAttributes.userId : decodedTokenAttributes._id)

            // Validating that the user with the matching username and userid exists, if yes than return the role of the user else return 
            // unauthorised personnel message
            // //console.log('=============decodedTokenAttributes=======================');
            // //console.log(JSON.stringify(decodedTokenAttributes));
            // //console.log(username,'username');
            // //console.log('====================================');

            userModel.find({
                $and: [username,
                    //{"userRole":userRoleId},
                    { _id: new ObjectId(userId) }]
            }, function (dbError, userDetails) {

                if (dbError) {
                    // In case of a DB error
                    res.status(500).json({ status: false, statusCode: 500, message: "Internal Server Error", data: null });
                } else {
                    // In case user exists and their details are fetched
                    if (userDetails != undefined && userDetails != null && Array.isArray(userDetails)) {
                        // In case user details are obtained - pass role id of the user
                        if (userDetails[0] != undefined) {

                            let roleId = userDetails[0].userRoleId
                            let userRole = userDetails[0].userRole

                            roleId = (roleId != undefined) ? roleId :
                                (roleId === undefined && userRole === constants.rolesAndIds[0].roleName) ? constants.rolesAndIds[0].roleId :
                                    (roleId === undefined && userRole === constants.rolesAndIds[1].roleName) ? constants.rolesAndIds[1].roleId :
                                        (roleId === undefined && userRole === constants.rolesAndIds[2].roleName) ? constants.rolesAndIds[2].roleId :
                                            (roleId === undefined && userRole === constants.rolesAndIds[3].roleName) ? constants.rolesAndIds[3].roleId :
                                                (roleId === undefined && userRole === constants.rolesAndIds[4].roleName) ? constants.rolesAndIds[4].roleId : 0
                            // //console.log(roleId);

                            if (roleId === 0 && !decodedTokenAttributes._id) {
                                // User has some role that is not present in the organization
                                res.status(401).json({ status: false, statusCode: 401, message: "User with specified role not found must be a customer", data: null })
                            } else {
                                req.userRoleId = roleId
                                next()
                            }

                        } else {
                            // If the user details are not found then return the user not found message - unauthorised
                            res.status(401).json({ status: false, statusCode: 401, message: "User not found", data: null });
                        }
                    } else {
                        // If the user is not found then return the user not found message - unauthorised
                        res.status(401).json({ status: false, statusCode: 401, message: "User not found", data: null });
                    }

                }
            })

        })
    } else {
        // If the user itoken s not found then return the user token not found message - unauthorised
        res.status(401).json({ status: false, statusCode: 401, message: "User token not found", data: null });
    }
}

module.exports.getTokenAndValidatedcfUser = (req, res, next) => {

    let userToken = ''

    try {
        userToken = req.headers['authorization'].split(' ')[1]
    } catch (err) {
        res.status(401).json({ status: false, statusCode: 401, message: "Invalid or Missing Header", data: null });
    }

    if (userToken != '') {

        jwt.verify(userToken, process.env.JWT_SECRET, function (err, decodedToken) {
            if (err) {
                res.status(401).json({ status: false, statusCode: 401, message: "Invalid Token", data: null });
            }

            let decodedTokenAttributes = decodedToken



            let username = { "userName": decodedTokenAttributes.userName };


            // Getting the username and useid from the token
            // let username = decodedTokenAttributes.username
            let userId = (decodedTokenAttributes.userId ? decodedTokenAttributes.userId : decodedTokenAttributes._id)

            // Validating that the user with the matching username and userid exists, if yes than return the role of the user else return 
            // unauthorised personnel message
            // //console.log('=============decodedTokenAttributes=======================');
            // //console.log(JSON.stringify(decodedTokenAttributes));
            // //console.log(username,'username');
            // //console.log('====================================');

            userModel.find({
                $and: [username,
                    //{"userRole":userRoleId},
                    { _id: new ObjectId(userId) }]
            }, function (dbError, userDetails) {

                if (dbError) {
                    // In case of a DB error
                    res.status(500).json({ status: false, statusCode: 500, message: "Internal Server Error", data: null });
                } else {
                    // In case user exists and their details are fetched
                    if (userDetails != undefined && userDetails != null && Array.isArray(userDetails)) {
                        // In case user details are obtained - pass role id of the user
                        next();
                    } else {
                        // If the user is not found then return the user not found message - unauthorised
                        res.status(401).json({ status: false, statusCode: 401, message: "Dcf User not found", data: null });
                    }

                }
            })

        })
    } else {
        // If the user itoken s not found then return the user token not found message - unauthorised
        res.status(401).json({ status: false, statusCode: 401, message: "DcfUser token not found", data: null });
    }
}

/**
 * This API is used to grab the user role from the user's token
 * @param {*} req 
 * @param {*} res 
 */
module.exports.getUserRoleFromToken = (req, res) => {

    return new Promise((resolve, reject) => {

        let userToken = req.userToken

        if (userToken == undefined) {
            res.status(401).json({ status: false, statusCode: 401, message: "Invalid or Missing key for token", data: null });
        }

        if (userToken != '') {

            jwt.verify(userToken, process.env.JWT_SECRET, function (err, decodedToken) {
                if (err) {
                    res.status(401).json({ status: false, statusCode: 401, message: "Invalid Token", data: null });
                }

                let decodedTokenAttributes = decodedToken

                // Getting the username and useid from the token
                let username = decodedTokenAttributes.username
                let userId = decodedTokenAttributes.userId

                // Validating that the user with the matching username and userid exists, if yes than return the role of the user else return 
                // unauthorised personnel message

                DcfUserModel.find({
                    $and: [{ "userName": username },
                    //{"userRole":userRoleId},
                    { _id: new ObjectId(userId) }]
                }, function (dbError, userDetails) {

                    // //console.log(userDetails);

                    if (dbError) {
                        // In case of a DB error
                        reject({ status: false, statusCode: 500, message: "Internal Server Error", data: null })
                    } else {
                        // In case user exists and their details are fetched
                        if (userDetails != undefined && userDetails != null && Array.isArray(userDetails)) {
                            // In case user details are obtained - pass role id of the user
                            if (userDetails[0] != undefined) {

                                let roleId = (userDetails[0].userRoleId != undefined) ? userDetails[0].userRoleId :
                                    (userDetails[0].userRole == constants.rolesAndIds[0].roleName) ? constants.rolesAndIds[0].roleId :
                                        (userDetails[0].userRole == constants.rolesAndIds[1].roleName) ? constants.rolesAndIds[1].roleId :
                                            (userDetails[0].userRole == constants.rolesAndIds[2].roleName) ? constants.rolesAndIds[2].roleId :
                                                (userDetails[0].userRole == constants.rolesAndIds[3].roleName) ? constants.rolesAndIds[3].roleId :
                                                    (userDetails[0].userRole == constants.rolesAndIds[4].roleName) ? constants.rolesAndIds[4].roleId : 0

                                // //console.log(roleId);

                                if (roleId == 0) {
                                    // User has some role that is not present in the organization
                                    resolve({ status: false, statusCode: 401, message: "User specified role not found must be a customer", data: null })
                                } else {
                                    resolve({ status: true, statusCode: 200, message: "User found", roleId })
                                }
                            } else {
                                // If the user details are not found then return the user not found message - unauthorised
                                resolve({ status: false, statusCode: 401, message: "User not found", data: null })
                            }
                        } else {
                            // If the user is not found then return the user not found message - unauthorised
                            resolve({ status: false, statusCode: 401, message: "User not found", data: null })
                        }

                    }
                })

            })
        } else {
            // If the user token is not found then return the user token not found message - unauthorised
            resolve({ status: false, statusCode: 401, message: "User token not found", data: null })
            // res.status(401).json({ status: false, statusCode: 401, message: "User token not found", data: null });
        }

    })
}
