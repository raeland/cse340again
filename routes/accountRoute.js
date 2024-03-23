// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')


// Route to show login form
router.get("/login", accountController.buildLogin);

// Route to show registration form
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Route to show login status
router
    .get("/:account_email", 
        utilities.checkLogin,
        utilities.handleErrors(accountController.buildAccountLog))
    .get("/update-info/:account_id",
        utilities.checkLogin,
        utilities.handleErrors(accountController.buildUpdateAccount))

// Route to update password
router
    .post("/update-password/:account_id",
        utilities.checkLogin,
        utilities.handleErrors(accountController.updatePassword))

// Route to update account        
router
    .post("/update-account/:account_id",
        utilities.checkLogin,
        utilities.handleErrors(accountController.updateAccount))    

// Route to offer unable to edit
    .get("/sorry",
        utilities.handleErrors(accountController.editError))
        
// Route to process user registration
router.post(
    "/register", 
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)

// Process the login attempt
/*router.post(
    "/login",
    (req, res) => {
      res.status(200).send('login process')
    }
)   */

router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManagement))

module.exports = router