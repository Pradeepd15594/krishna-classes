let jwt = require('jsonwebtoken');
let config = require('./../config/config');


let awsLib = require('./../config/libs/aws');

// let uuidv4 = require('uuid/v4');

// var ShortUniqueId = require('short-unique-id');

// var uid = new ShortUniqueId();

let keyForPasswordEncryption = "YOUR_KEY";

var Cryptr = require('cryptr'),
    cryptr = new Cryptr(keyForPasswordEncryption);

let generateJWTForUser = (userData) => {
    return jwt.sign({ _id: userData._id, userRole: userData.userRole, email: userData.email, name: userData.name }, config.jwt.secret, config.jwt.options);
}

let generateJWTForAdmin = (userData) => {
    return jwt.sign({ _id: userData._id, role: userData.role, email: userData.email, name: userData.name }, config.jwt.secret, config.jwt.options);
}

let generateJWTForInspector = (userData) => {
    return jwt.sign({ _id: userData._id, role: userData.role, phone: userData.phone, name: userData.name }, config.jwt.secret, config.jwt.options);
}

let decodeJWTForUser = (token) => {
    return jwt.verify(token, config.jwt.secret);
}

let encryptPassword = (password) => {
    return cryptr.encrypt(password);
    // return password;
}

let decryptPassword = (encryptedPassword) => {
    return cryptr.decrypt(encryptedPassword);
}

// let generateUniqueId = () => {
//     return uuidv4(); // ⇨ 'df7cca36-3d7a-40f4-8f06-ae03cc22f045'
// }

let generateUserEmailVerificationLink = (token, email) => {
    return config.baseUrl + '/verify-email/' + token; // ⇨ 'df7cca36-3d7a-40f4-8f06-ae03cc22f045'
}


function formatUserData(userData) {
    if (userData) {
        if (userData.password)
            delete userData.password;
        // if(userData.emailVerification)
        //     delete userData.emailVerification;  
        // if (userData.profileImageUrl) {
        //     userData.profileImageKey = userData.profileImageUrl;
        //     userData.profileImageUrl = awsLib.getPresignedUrlOfAfile(userData.profileImageUrl);
        // }
        delete userData.isApproved;
    }
    return userData;
}

function formatDcfUserData(userData) {
    if (userData) {
        if (userData.password)
            delete userData.password;
            delete userData.userName;
            delete userData._id;
            delete userData.createdAt;
            delete userData.updatedAt;
            delete userData.__v;

    }
    return userData;
}





let generatePasswordResetLinkForUser = (email) => {
    let baseUrl = config.baseUrl;
    return baseUrl + "/auth/reset-password/" + jwt.sign({ email: email }, config.jwt.secret, { expiresIn: 30 * 60 });//30 mins
}

let decodePasswordResetToken = (token) => {
    return new Promise((resolve, reject) => {
        try {
            let decodedData = jwt.verify(token, config.jwt.secret);
            resolve(decodedData);
        } catch (err) {
            reject("Invalid or Expired");
        }
    });
}

let getDatesBetweenDates = (startDate, endDate) => {
	let dates = [];
	let onlyDates = [];
	//to avoid modifying the original date
	const theDate = new Date(startDate)
	while (theDate < endDate) {
		dates = [...dates, new Date(theDate)]
		theDate.setDate(theDate.getDate() + 1)
	}
	dates = [...dates, endDate];
	dates.map(function (v) {
		var date = v.toISOString().slice(0, 10)
		////console.log(date);
		onlyDates.push(date);
	});
	return onlyDates;
};

// let generateLeaveID = () => {
//     const uidWithTimestamp = uid.randomUUID(24).toLowerCase();
//     return uidWithTimestamp;
// };

module.exports = {
    generateJWTForUser,
    decodeJWTForUser,
    encryptPassword,
    decryptPassword,
    // generateUniqueId,
    generateUserEmailVerificationLink,
    // getUniquePaymentID,
    // getUniqueOrderID,
    formatUserData,
    formatDcfUserData,
    generatePasswordResetLinkForUser,
    decodePasswordResetToken,
    generateJWTForAdmin,
    generateJWTForInspector,
    getDatesBetweenDates,
    // generateLeaveID
}