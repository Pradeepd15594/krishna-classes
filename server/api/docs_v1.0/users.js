
//HEADERAccessCode
/**
 * @apiDefine HEADERAccessCode
 *  @apiHeader {String} x-access-token User AccessCode
 * */
//Unauthorized
/**
 * @apiDefine Unauthorized
 *  @apiErrorExample {json} Error-Response-Invalid-Token
 *  HTTP/1.1 401 Unauthorized
 {
   status: false
   messages : "Access Denied for this operation"
   data:null
 }
 * */
//InternalServerError
/**
 * @apiDefine InternalServerError
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500
 *     {
 *       status: false
 *       messages : "Internal server error"
 *       data:null
 *     }
 * */
//UserNotFound
/**
 * @apiDefine UserNotFound
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal server error
 *     {
 *       status: false
 *       messages : "User Not Found"
 *       data:null
 *     }
 * */
//InvalidData
/**
 * @apiDefine InvalidData
 *  @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad request
 *     {
 *       status: false
 *       messages : ["Invalid data"]
 *       data:null
 *     }
 * */
//UserAlreadyExists
/**
 * @apiDefine UserAlreadyExists
 *  @apiErrorExample {json} User-Already-Exists:
 *     HTTP/1.1 409 conflict
 *     {
 *       status: false
 *       messages : "User Already Exists data"
 *       data:null
 *     }
 * */

 /**
 * @api {post} /users/register Register
 * @apiName Register
 * @apiGroup Users
 * 
 
 * @apiParamExample {json} Request-Example:
 *{
	"name":{
		"first":"Naresh",
		"last":"dasireddi"
	},
	"email":"naresh.d@mtwlabs.com",
	"mobile":{
		"countryCode":"+91",
        "number":"7382042321"
	},
	"password":"Naresh@123"
}
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "status": true,
    "message": "User registered",
    "data": {
        "role": "normal",
        "signUpType": "manual",
        "_id": "5c712d551b21ea5d503d2238",
        "name": {
            "first": "Naresh",
            "last": "dasireddi"
        },
        "email": "naresh.d@mtwlabs.com",
        "mobile": {
            "countryCode": "+91",
            "number": "7382042321"
        },
        "createdAt": "2019-02-23T11:24:05.012Z",
        "updatedAt": "2019-02-23T11:24:05.012Z",
        "__v": 0,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzcxMmQ1NTFiMjFlYTVkNTAzZDIyMzgiLCJyb2xlIjoibm9ybWFsIiwiaWF0IjoxNTUwOTIxMDQ1LCJleHAiOjE1ODI0NTcwNDV9.sZqjyiVb0blrvdAWNKq6K_jiPEQ12BjPoc-1jVGBDFA"
    }
}
 *  @apiErrorExample {json} Error-Response-Without-Data:
 *     HTTP/1.1 400 Bad request
 *  {
    "status": false,
    "message": "Invalid or empty data",
    "data": null
}
*@apiUse UserAlreadyExists
* @apiUse InternalServerError
 *
 * */

/**
 * @api {post} /users/login Login
 * @apiName Login
 * @apiGroup Users
 * @apiPermission ALL

 * @apiParamExample {json} Request-Example:
 * {
	"email":"naresh.d@mtwlabs.com",
	"password":"Naresh@123"
}
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "status": true,
    "message": "User Authenticaton successful",
    "data": {
        "name": {
            "first": "Naresh",
            "last": "dasireddi"
        },
        "mobile": {
            "countryCode": "+91",
            "number": "7382042321"
        },
        "role": "normal",
        "signUpType": "manual",
        "_id": "5c712f23e3c9d6660ddc3a40",
        "email": "naresh.d@mtwlabs.com",
        "createdAt": "2019-02-23T11:31:47.860Z",
        "updatedAt": "2019-02-23T11:31:47.860Z",
        "__v": 0,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzcxMmYyM2UzYzlkNjY2MGRkYzNhNDAiLCJyb2xlIjoibm9ybWFsIiwiaWF0IjoxNTUwOTIxNjExLCJleHAiOjE1ODI0NTc2MTF9.gd6chI4ivMUvtyH6heyvVtvvRIoWoCxui1PYUhQ6FSo"
    }
}

 *  @apiErrorExample {json} Error-Response-Without-Data:
 *     HTTP/1.1 400 Bad request
 *    {
    "status": false,
    "message": "Invalid or empty data",
    "data": null
}
 *  @apiErrorExample {json} Error-Invalid-Credentials:
 *     HTTP/1.1 400 Bad request
 *    {
    "status": false,
    "message": "Invalid credentials",
    "data": null
}
 *
 * @apiUse Unauthorized
* @apiUse InternalServerError
 *
 * */


 

  /**
 * @api {post} /users/password-reset-link Password ResetLink
 * @apiName Password ResetLink
 * @apiGroup Users
 
 * @apiParamExample {json} Request-Example:
 *{
	"email":"naresh.d@gmail.com"
}
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "status": true,
    "message": "reset password link sent",
    "data": null
}
 *  @apiErrorExample {json} Error-Response-Without-Data:
 *     HTTP/1.1 400 Bad request
 *  {
    "status": false,
    "message": "User not found",
    "data": null
}
 
* @apiUse InternalServerError
 *
 * */

 /**
 * @api {post} /users/passwordresetlink Password ResetLink
 * @apiName Password ResetLink
 * @apiGroup Users
 
 * @apiParamExample {json} Request-Example:
 *{
	"email":"naresh.d@gmail.com"
}
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "status": true,
    "message": "reset password link sent",
    "data": null
}
 *  @apiErrorExample {json} Error-Response-Without-Data:
 *     HTTP/1.1 400 Bad request
 *  {
    "status": false,
    "message": "User not found",
    "data": null
}
 
* @apiUse InternalServerError
 *
 * */

 /**
 * @api {post} /users/reset-password-with-token Reset Password with token
 * @apiName Reset Password with token
 * @apiGroup Users
 
 * @apiParamExample {json} Request-Example:
 *{
	"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hcmVzaC5kQG10d2xhYnMuY29tIiwiaWF0IjoxNTQ5ODcxNzYxLCJleHAiOjE1NDk4NzIzNjF9.GdUJFnNS6ohLblyjOa9WBE5n5iJSypcEQaZ6oKKhQ_o",
	"password":"Naresh@123"
}
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "status": false,
    "message": "Password changed successfully",
    "data": null
}
 *  @apiErrorExample {json} Error-Response-Without-Data:
 *     HTTP/1.1 400 Bad request
 *  {
    "status": false,
    "message": "User not found",
    "data": null
}
 
* @apiUse InternalServerError
 *
 * */

 /**
 * @api {post} /users/ Change Password
 * @apiName Change Password
 * @apiGroup Users
 
 * @apiParamExample {json} Request-Example:
 *{
        "password":"Naresh@123",
        "newPassword":"Naresh@321"
}
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "status": false,
    "message": "Password changed successfully",
    "data": null
}
 *  @apiErrorExample {json} Error-Response-Without-Data:
 *     HTTP/1.1 400 Bad request
 *  {
    "status": false,
    "message": "User not found",
    "data": null
}
 
* @apiUse InternalServerError
 *
 * */

 /**
 * @api {get} /users/ logged User Details
 * @apiName logged User Details
 * @apiGroup Users
 * @apiUse HEADERAccessCode
 

 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "status": true,
    "message": "User Details fetched",
    "data": {
        "name": {
            "first": "Naresh",
            "last": "dasireddi"
        },
        "mobile": {
            "countryCode": "+91",
            "number": "7382042321"
        },
        "role": "normal",
        "signUpType": "manual",
        "_id": "5c712f23e3c9d6660ddc3a40",
        "email": "naresh.d@mtwlabs.com",
        "createdAt": "2019-02-23T11:31:47.860Z",
        "updatedAt": "2019-02-23T11:31:47.860Z",
        "__v": 0
    }
}
 *  @apiErrorExample {json} Token-Not-Found:
 *     HTTP/1.1 400 Bad request
 *  {
    "status": false,
    "message": "User token not found",
    "data": null
}
 *  @apiErrorExample {json} Invalid-Token:
 *     HTTP/1.1 400 Bad request
 *  {
    "status": false,
    "message": "Invalid token",
    "data": null
}
 
* @apiUse InternalServerError
 *
 * */

 /**
 * @api {get} /users/5c712f23e3c9d6660ddc3a40 Other User Details
 * @apiName Other User Details
 * @apiGroup Users
 * @apiPermission Admin
 * @apiUse HEADERAccessCode
 

 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "status": true,
    "message": "User Details fetched",
    "data": {
        "name": {
            "first": "Naresh",
            "last": "dasireddi"
        },
        "mobile": {
            "countryCode": "+91",
            "number": "7382042321"
        },
        "role": "normal",
        "signUpType": "manual",
        "_id": "5c712f23e3c9d6660ddc3a40",
        "email": "naresh.d@mtwlabs.com",
        "createdAt": "2019-02-23T11:31:47.860Z",
        "updatedAt": "2019-02-23T11:31:47.860Z",
        "__v": 0
    }
}
 *  @apiErrorExample {json} Token-Not-Found:
 *     HTTP/1.1 400 Bad request
 *  {
    "status": false,
    "message": "User token not found",
    "data": null
}
 *  @apiErrorExample {json} Invalid-Token:
 *     HTTP/1.1 400 Bad request
 *  {
    "status": false,
    "message": "Invalid token",
    "data": null
}

* @apiUse Unauthorized
 
* @apiUse InternalServerError
 *
 * */

/**
 * @api {put} /users/ Update logged user details
 * @apiName Update logged user details
 * @apiGroup Users
 * @apiUse HEADERAccessCode
 * @apiParamExample {json} Request-Example:
 *{
	"name":{
		"first":"Naresh",
		"last":"Dasireddi"
	},
	"email":"naresh.d@mtwlabs.com",
	"mobile":{
		"countryCode":"+91",
        "number":"7382042321"
	}
	
}

 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "status": true,
    "message": "User Details updated",
    "data": null
}
 *  @apiErrorExample {json} Token-Not-Found:
 *     HTTP/1.1 400 Bad request
 *  {
    "status": false,
    "message": "User token not found",
    "data": null
}
 *  @apiErrorExample {json} Email-Not-Updated:
 *     HTTP/1.1 400 Bad request
 *  {
    "status": false,
    "message": "email cannot be updated",
    "data": null
}
*  @apiErrorExample {json} Invalid-Token:
 *     HTTP/1.1 400 Bad request
 *  {
    "status": false,
    "message": "Invalid token",
    "data": null
}

* @apiUse Unauthorized
 
* @apiUse InternalServerError
 *
 * */
/**
 * @api {put} /users/5c712f23e3c9d6660ddc3a40 Update other user details
 * @apiName Update other user details
 * @apiGroup Users
 * @apiPermission Admin
 * @apiUse HEADERAccessCode
 * @apiParamExample {json} Request-Example:
 *{
	"name":{
		"first":"Naresh",
		"last":"Dasireddi"
	},
	"email":"naresh.d@mtwlabs.com",
	"mobile":{
		"countryCode":"+91",
        "number":"7382042321"
	}
	
}

 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "status": true,
    "message": "User Details updated",
    "data": null
}
 *  @apiErrorExample {json} Token-Not-Found:
 *     HTTP/1.1 400 Bad request
 *  {
    "status": false,
    "message": "User token not found",
    "data": null
}
 *  @apiErrorExample {json} Email-Not-Updated:
 *     HTTP/1.1 400 Bad request
 *  {
    "status": false,
    "message": "email cannot be updated",
    "data": null
}
*  @apiErrorExample {json} Invalid-Token:
 *     HTTP/1.1 400 Bad request
 *  {
    "status": false,
    "message": "Invalid token",
    "data": null
}

* @apiUse Unauthorized
 
* @apiUse InternalServerError
 *
 * */

 /**
 * @api {get} /users/all Get All Users
 * @apiName Get All Users
 * @apiGroup Users
 * @apiPermission Admin
 * @apiUse HEADERAccessCode
*
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "status": true,
    "message": "Users data fetched",
    "data": [
        {
            "name": {
                "first": "Naresh",
                "last": "Dasireddi"
            },
            "mobile": {
                "countryCode": "+91",
                "number": "7382042321"
            },
            "role": "admin",
            "signUpType": "manual",
            "_id": "5c712f23e3c9d6660ddc3a40",
            "email": "naresh.d@mtwlabs.com",
            "password": "Naresh@123",
            "createdAt": "2019-02-23T11:31:47.860Z",
            "updatedAt": "2019-02-23T11:49:07.024Z",
            "__v": 0
        }
    ]
}
 *  @apiErrorExample {json} Token-Not-Found:
 *     HTTP/1.1 400 Bad request
 *  {
    "status": false,
    "message": "User token not found",
    "data": null
}
 
*  @apiErrorExample {json} Invalid-Token:
 *     HTTP/1.1 400 Bad request
 *  {
    "status": false,
    "message": "Invalid token",
    "data": null
}

* @apiUse Unauthorized
 
* @apiUse InternalServerError
 *
 * */

  /**
 * @api {delete} /users/5c712f23e3c9d6660ddc3a50 Delete User
 * @apiName Delete User
 * @apiGroup Users
 * @apiPermission Admin
 * @apiUse HEADERAccessCode
*
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "status": true,
    "message": "User deleted successfully",
    "data": null
}
 *  @apiErrorExample {json} Token-Not-Found:
 *     HTTP/1.1 400 Bad request
 *  {
    "status": false,
    "message": "User token not found",
    "data": null
}
 
*  @apiErrorExample {json} Invalid-Token:
 *     HTTP/1.1 400 Bad request
 *  {
    "status": false,
    "message": "Invalid token",
    "data": null
}
*  @apiErrorExample {json} Invalid-User:
 *     HTTP/1.1 400 Bad request
{
    "status": true,
    "message": "Invalid User",
    "data": null
}
* @apiUse Unauthorized
 
* @apiUse InternalServerError
 *
 * */

 /**
 * @api {get} /users/verify-email/e2df7bfe-0e68-4dea-acda-ff2c3c0f2eab Verify Email
 * @apiName Verify Email
 * @apiGroup Users
 
 * @apiUse HEADERAccessCode
*
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 {
    "status": true,
    "message": "Verified successfully",
    "data": null
}
 *  @apiErrorExample {json} Token-Not-Found:
 *     HTTP/1.1 400 Bad request
 *  {
    "status": false,
    "message": "User token not found",
    "data": null
}
 
*  @apiErrorExample {json} Invalid-Token:
 *     HTTP/1.1 400 Bad request
 *  {
    "status": false,
    "message": "Invalid Token, could not verify email",
    "data": null
}
*  @apiErrorExample {json} Invalid-User:
 *     HTTP/1.1 400 Bad request
{
    "status": true,
    "message": "Invalid User",
    "data": null
}
* @apiUse Unauthorized
 
* @apiUse InternalServerError
 *
 * */