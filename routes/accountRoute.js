// Needed Resources 
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")

//Login View Route
router.get("/login", utilities.handleErrors(accountController.buildLogin));
//Register View Route
router.get("/register", utilities.handleErrors(accountController.buildRegister));
//Register post method
router.post('/register', utilities.handleErrors(accountController.registerAccount))

module.exports = router;