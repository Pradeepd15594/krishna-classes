var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// const fs = require('fs')
const swaggerUi = require('swagger-ui-express');
var app = express();

app.use(logger('dev'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
let routesV1_0 = require('./server/routes/routes.v1.0');

require('./server/config/libs/mongoose'); //initializing mongoose
let config = require('./server/config/config');

/* CORS ISSUE */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'x-access-token,authorization,Content-Type,Access-Control-Request-Headers,enctype,platform,version');
    // Set to true if you need the website to include cookies in  requests
    res.setHeader('Access-Control-Allow-Credentials', true);
    //console.log("method type", req.method);
    if (req.method === 'OPTIONS') {
        //console.log("going to options")
        res.status(200);
        res.end();
    } else {
        // Pass to next layer of middleware
        next();
    }
});
/* CORS */
app.use('/api/v1.0', routesV1_0);


app.get('/', (req, res)=>{
    res.send('Welcome krishna home')
})

app.use(function (err, req, res, next) {
    if (err.isBoom) {
        //console.log('err', err);
        let obj = err.output.payload;
        if (err.data.length && err.data[0]) {
            obj.message = err.data[0].message;
            obj.path = err.data[0].path
        }

        return res.status(err.output.statusCode).json(obj);
    }
});

app.listen(config.port);

console.log('welcome to my server started on port : ' + config.port + " with " + process.env.NODE_ENV + ' mode');

//module.exports = app;