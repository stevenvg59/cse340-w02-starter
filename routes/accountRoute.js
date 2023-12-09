// Needed Resources 
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

//Logged in View
router.get("/", utilities.handleErrors(accountController.accountHomepage))

//Register View Route
router.get("/register", utilities.handleErrors(accountController.buildRegister));

//Register post method
router.post(
    '/register', 
    regValidate.registrationRules(),
    regValidate.checkRegData, 
    utilities.handleErrors(accountController.registerAccount)
);

//Login View Route
router.get("/login", utilities.handleErrors(accountController.buildLogin));

//Process login attempt
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin)
);

module.exports = router;