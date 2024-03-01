// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')

// Route to show login form
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Route to show registration form
router.get("/register", utilities.handleErrors(accountController.buildRegister));

// Route to process user registration
router.post('/register', regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)

// Process the login attempt
router.post(
    "/login",
    (req, res) => {
      res.status(200).send('login process')
    }
  )   

module.exports = router;
