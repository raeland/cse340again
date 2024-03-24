const utilities = require("../utilities/")
const bcrypt = require("bcryptjs")
const acctModel = require("../models/account-model")
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
//console.log('REGISTER ACCOUNT LINE 49');
  const regResult = await acctModel.registerNewAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )
    if (regResult) {
      req.flash(
        "notice",
        `Congratulations, you're registered ${account_firstname}. Please log in.`
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
*  Process Login Request
* *************************************** */ 
async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body
  const accountData = await acctModel.getAccountByEmail(account_email)
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
    if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 })
      if(process.env.NODE_ENV === 'development') {
        res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
        } else {
          res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
        }
      return res.redirect("/account/")
      }
     } catch (error) {
      return new Error('Access Forbidden')
     }
    }

/* ****************************************
*  Deliver Account Management View
* *************************************** */
async function accountManagement(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/account-management", {
    title: "Account Management",
    nav,
    errors: null,
  })
}

/*buildUpdateAccount
updatePassword
updateAccount
editError

/* ****************************************
*  Deliver registration view
* ***************************************
async function buildUpdateAccount(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/update-account", {
    title: "Update Account",
    nav,
    errors: null,
  })
*/

/* ****************************************
*  BUILD Account Logging View
* *************************************** */
async function buildAccountLog(req, res, next) {
  const account_email = req.params.account_email
  let nav = await utilities.getNav()
  let accountInfo = await utilities.getAccountType(account_email)
  let accountType = accountInfo.account_type
  let accountName = accountInfo.account_firstname + ' ' + account_lastname
  let account_id = accountInfo.account_id
  let updateAccount = "/account/update-account/" + account_id
  res.render("account/showLogin", {
    title: "You are Signed In!",
    nav,
    errors: null,
    accountType,
    accountName,
    account_id,
    updateAccount
  })
}

module.exports = { buildLogin, buildRegister, accountLogin, registerAccount, accountManagement, buildAccountLog }
