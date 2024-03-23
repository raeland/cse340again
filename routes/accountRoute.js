// Needed Resources 
const express = require("express")
const router = new express.Router() 
const acctController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')


// Route to show login form
router.get("/login", acctController.buildLogin);

// Route to show registration form
router.get("/register", utilities.handleErrors(acctController.buildRegister))

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
        
// Route to process user registration
router.post(
    "/register", 
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(acctController.registerAccount)
)

router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(acctController.accountLogin)
)

router
    .get("/", 
    utilities.checkLogin, 
    utilities.handleErrors(acctController.buildAccountManagement))

module.exports = router