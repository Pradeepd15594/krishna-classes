let mongoose = require('mongoose');
let config = require('./../config');

console.log('====================================');
console.log(config, 'config');
console.log('====================================');

mongoose.set("strictQuery", false);
const uri = (config.db.mongo.uri || `mongodb+srv://pradeepd15594:pradeepd15594@aura-card.y9vyuct.mongodb.net/aura-card-db?retryWrites=true&w=majority`);
mongoose.connect(`${(uri || uri)}`, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        console.log(`uri => ${uri}` + err);
        console.log("Error while connecting to mongo : " + err);
    } else {
        console.log("connected to mongodb : " + uri);
        mongoose.connection.db.listCollections().toArray(function (err, names) {
            console.log(names, '77777');
        });
    }
});

module.exports = mongoose;