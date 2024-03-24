// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities")
const acctController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

// DEFAULT Route to /account/ root
router
    .get("/", 
    utilities.checkLogin,
    utilities.handleErrors(acctController.accountManagement))

// Route to show login form
router
    .get("/login", acctController.buildLogin);

// Route to Process login Attempt
router
    .post(
      "/login-user",
      regValidate.loginRules(),
      regValidate.checkLoginData,
      utilities.handleErrors(acctController.accountLogin)
  )
// Route to show registration form
router
    .get("/register", utilities.handleErrors(acctController.buildRegister))
        
// Route to process user registration
router
    .post(
      "/register-user", 
      regValidate.registrationRules(),
      regValidate.checkRegData,
      utilities.handleErrors(acctController.registerAccount)
)

// Route to show login status
router
    .get("/:account_email", 
        utilities.checkLogin,
        utilities.handleErrors(acctController.buildAccountLog))
    .get("/update-info/:account_id",
        utilities.checkLogin,
        utilities.handleErrors(acctController.buildUpdateAccount))

// Route to update password
router
    .post("/update-password/:account_id",
        utilities.checkLogin,
        utilities.handleErrors(acctController.updatePassword))

// Route to update account        
router
    .post("/update-account/:account_id",
        utilities.checkLogin,
        utilities.handleErrors(acctController.updateAccount))    

// Route to offer unable to edit
    .get("/sorry",
        utilities.handleErrors(acctController.editError))


module.exports = router