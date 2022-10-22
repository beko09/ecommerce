const express = require('express')
const router = express.Router();

const {
    processPayment,
    sendStripApi
} = require('./paymentController')

const { isAuthenticateUser, authorizeRole } = require("../middleware/auth");

router.post('/payment/process', isAuthenticateUser, processPayment);
router.get('/stripeapi', isAuthenticateUser, sendStripApi);

module.exports = router;