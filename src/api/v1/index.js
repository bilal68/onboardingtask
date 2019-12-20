const express = require('express');

const router = express.Router();
// const ratesRoute = require('./rates');
const frequencyRoute = require('./frequency');

// router.use('/rates', ratesRoute);
router.use('/frequency', frequencyRoute);


module.exports = router;
