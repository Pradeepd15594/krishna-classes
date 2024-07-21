let express = require('express');
let router = express.Router();
let customersRouter = require('../api/v1.0/render-server/route');
router.use('/render-server', customersRouter);
module.exports = router;