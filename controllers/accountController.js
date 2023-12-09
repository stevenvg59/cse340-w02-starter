// Resource required
const utilities = require("../utilities")
const accountModel = require("../models/account-model")
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")
require("dotenv").config()

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

  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
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
// async function buildHomepage(req, res, next) {
//   let nav = await utilities.getNav()
//   const { account_email, account_password } = req.body
//   const loginResult = await accountModel.checkPasswordMatches(account_email, account_password)

//   if (accountModel.checkExistingEmail(account_email)){
//     if (loginResult.account_password == account_password){
//       req.flash(
//         "green",
//         `Welcome ${loginResult.account_firstname}. This is your homepage.`
//       )
//       res.render("index", {
//         title: "Home", 
//         nav,
//         errors: null,
//       })
//     } else {
//       req.flash("notice", "Sorry, login failed. Enter a valid password")
//       res.status(501).render("account/login", {
//         title: "Login",
//         nav,
//         errors: null,
//       })
//     }
//   } else {
//     req.flash("notice", "Sorry, login failed. Enter a valid username")
//       res.status(501).render("account/login", {
//         title: "Login",
//         nav,
//         errors: null,
//       })
//   }
// }

/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body
  const accountData = await accountModel.getAccountByEmail(account_email)
  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.")
    res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email,
    })
    return
  }
  try {
    console.log("Error here")
    if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password
      console.log("Error here")
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
      res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
      return res.redirect("/account")
    }
  } catch (error) {
    console.log("Not logged in")
    return new Error('Access Forbidden')
  }
 }

 async function accountHomepage(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/management", {
    title: "Account Management",
    nav,
    errors: null,
  })
 }


module.exports = { buildLogin, buildRegister, registerAccount, /*buildHomepage,*/ accountLogin, accountHomepage }