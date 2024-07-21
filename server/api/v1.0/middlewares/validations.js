let _ = require('underscore');


let requiresBody = (req,res,next)=>{
    if(req.body && _.isObject(req.body) && !_.isEmpty(req.body)){
        next();
    }else{
        res.status(400).json({status:false,message:"Invalid or empty data",data:null});
    }
}


module.exports = {
    requiresBody
}