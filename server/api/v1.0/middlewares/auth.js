// let AdminColl = require('../superadmin/model');
// let UserColl = require('../customer/model');
// let InspectorColl = require('../inspector/model');
let utils = require('./../../../common/utils');
// let VendorColl = require('../superadmin/vendor');

// let isUserLogin = (req, res, next) => {
//     if(req.headers.authorization!=null || req.headers['x-access-token']!=undefined ||req.cookies['token']!=undefined) {
//     let token = req.headers['x-access-token'] || req.cookies['token'] || req.headers['authorization'].split(' ')[1];
//     if(token){
//         let decodedData;
//         try {
//             decodedData = utils.decodeJWTForUser(token);

//         } catch (err) {
//             res.status(401).json({ status: false, message: "Invalid token", data: null });
//             return;
//         }
//         UserColl.findOne({ _id: decodedData._id})
//             .then(function (user) {
//                         if (user.phoneVerification.status == false) {
//                             res.status(401).json({ status: false, statusCode: 401, message: "Invalid token", data: null });
//                             return;
//                         }


//                 req.jwt = decodedData;
//                 req.jwt._id = decodedData._id;
//                 req.jwt.firstName= user.firstName;
//                 req.jwt.lastName= user.lastName;
//                 console.log(req.jwt)

//                 // req.jwt.projectId=user.projectId
//                 next();
//             }).catch(function (err) {
//                 res.status(401).json({ status: false, statusCode: 401, message: "User not found", data: null });
//             });
//     } else
//     {
//         res.status(401).json({ status: false, statusCode: 401, message: "User token not found", data: null });
//     }
// }else{
//     res.status(401).json({ status: false, statusCode: 401, message: "User token not found", data: null });

// }
// }


let isCustomer = (req, res, next) => {
    if (req.jwt.userRole === 'Customer') {
        next();
    } else {
        res.status(401).json({ status: false, message: "Access Denied for this operation", data: null });
    }
}

let isAdmin = (req, res, next) => {
    if (req.jwt.userRole === 'SuperAdmin') {
        next();
    } else {
        res.status(401).json({ status: false, message: "Access Denied for this operation", data: null });
    }
}

let isResearchTeam = (req, res, next) => {
    if (req.jwt.userRole === 'ResearchTeam') {
        next();
    } else {
        res.status(401).json({ status: false, message: "Access Denied for this operation", data: null });
    }
}

let isAdminOrResearchTeam = (req, res, next) => {
    if ((req.jwt.userRole === 'SuperAdmin') || (req.jwt.userRole === 'ResearchTeam')) {
        next();
    } else {
        res.status(401).json({ status: false, message: "Access Denied for this operation", data: null });
    }
}
/* let decodeTokenIfAvailable = (req,res,next)=>{
    let token = req.headers['x-access-token'] || req.cookies['token'];
    //   let token = ;
    if(token){
        let decodedData;
        try{
            decodedData =  utils.decodeJWTForUser(token);
        }catch (err){
            next();
        }
        UserColl.findOneByValues({_id:decodedData._id,role:decodedData.role})
            .then(function (user) {

                req.jwt = decodedData;
                req.jwt.email = user.email; 
                req.jwt.name = user.name; 
                req.jwt.role = user.role; 
                req.jwt.isEmailVerified = user.emailVerification.status;

                next();
            }).catch(function (err) {
                next();
        });
    }else{
        next();
    }
} */

let isUserEmailVerified = (req, res, next) => {
    if (req.jwt.isEmailVerified) {
        next();
    } else {
        res.status(401).json({ status: false, message: "User email not verified", data: null });
    }
}

// let isAdminLogin = (req, res, next) => {
//     if(req.headers.authorization!=null || req.headers['x-access-token']!=undefined ||req.cookies['token']!=undefined) {
//         let token = req.headers['x-access-token'] || req.cookies['token'] || req.headers['authorization'].split(' ')[1];    if (token) {
//         let decodedData;
//         try {
//             decodedData = utils.decodeJWTForUser(token);
//         } catch (err) {
//             res.status(401).json({ status: false, message: "Invalid token", data: null });
//             return;
//         }
//         AdminColl.findOne({ _id: decodedData._id, userRole: decodedData.userRole })
//             .then(function (admin) {
//                 req.jwt = decodedData;
//                 req.jwt.email = admin.email;
//                 // req.jwt.firstName = admin.firstName;
//                 // req.jwt.lastName = admin.lastName;
//                 req.jwt.userRole = admin.userRole;
//                 req.jwt._id = decodedData._id;

//                 next();
//             }).catch(function (err) {
//                 res.status(401).json({ status: false, statusCode: 401, message: "User data not found", data: null });
//             });
//     } else {
//         res.status(401).json({ status: false, statusCode: 401, message: "User token not found", data: null });
//     }
//     }else{
//     res.status(401).json({ status: false, statusCode: 401, message: "User not found", data: null });

// }
// }


module.exports = {
    // isUserLogin,
    isAdmin,
    isCustomer,
    // decodeTokenIfAvailable,
    isUserEmailVerified,
    isResearchTeam,
    isAdminOrResearchTeam,
    // isAdminLogin,
    // isVendorLogin
}