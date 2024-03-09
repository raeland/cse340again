// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities")
const invController = require("../controllers/invController")
const validate = require("../utilities/account-validation")


// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

// Route to build vehicle view by detail
router.get("/detail/:vehicleId", utilities.handleErrors(invController.buildVehicleViewDetail))

// Route for Management View
router.get("/", utilities.handleErrors(invController.buildManagementView))

// Route for New Classification
router.get("/add-classification", utilities.handleErrors(invController.buildAddClass))

router.post(
    "/add-classification", 
    validate.addNewClassRules(),
    validate.checkAddClassData, 
    utilities.handleErrors(invController.addClass)
);

// Route for Adding Vehicle Inventory
router.get("/add-inventory", utilities.handleErrors(invController.buildNewInventory))
   
router.post(
    "/add-inventory", 
    //validate.addNewInvRules(),
    //validate.checkAddInvData, 
    utilities.handleErrors(invController.addNewInventory))


module.exports = router
