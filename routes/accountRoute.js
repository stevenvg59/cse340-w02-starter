// Needed Resources 
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

//Login View Route
router.get("/login", utilities.handleErrors(accountController.buildLogin));
//Register View Route
router.get("/register", utilities.handleErrors(accountController.buildRegister));
//Register post method
router.post(
    '/register', 
    regValidate.registrationRules(),
    regValidate.checkRegData, 
    utilities.handleErrors(accountController.registerAccount)
);

// Process the login attempt
router.post(
    "/login",
    regValidate.loginRules(),
    utilities.handleErrors(accountController.buildHomepage)
);

module.exports = router;