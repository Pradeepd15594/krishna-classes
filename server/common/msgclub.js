var request = require("request");
// let config = require('./../config/config');
// const client = require('twilio')(config.twilio.accountSid, config.twilio.authToken);

// new test create reusable transporter object using the default SMTP transport
async function sendOtpToUser(mobileNo,otp){

var options = { method: 'GET',
  url: 'http://msg.smscluster.com/rest/services/sendSMS/sendGroupSms',
  qs: 
   { AUTH_KEY: 'e032cf98bf49f9572ed7dcdaa74da6f',
     message: `your tagit app login otp is ${otp}`,
     senderId: 'LAURYL',
     routeId: '1',
     mobileNos: `${mobileNo}`,
     smsContentType: 'Unicode' },
  headers: 
   { 'Cache-Control': 'no-cache' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  //console.log(body);
});

}

module.exports = {
    sendOtpToUser,
}