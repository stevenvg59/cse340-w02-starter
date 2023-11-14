// Resource required
const utilities = require("../utilities")
const accountModel = require("../models/account-model")

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  })
}
  
/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    account_password
  )

  if (regResult) {
    req.flash(
      "green",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }
}

/* ****************************************
*  Landing Homepage after login
* *************************************** */
async function buildHomepage(req, res, next) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body
  const loginResult = await accountModel.checkPasswordMatches(account_email, account_password)

  if (loginResult.account_password == account_password){
    req.flash(
      "green",
      `Welcome ${loginResult.account_firstname}. This is your homepage.`
    )
    res.render("index", {
      title: "Home", 
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, login failed. Enter a valid username and/or password")
    res.status(501).render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  }
  
}


module.exports = { buildLogin, buildRegister, registerAccount, buildHomepage }