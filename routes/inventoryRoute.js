// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities")
const invController = require("../controllers/invController")
const validate = require("../utilities/inventory-validation")

// Route to build inventory by classification view
router
    .get("/type/:classificationId", 
        //authorizeAccess.authorizeAccess,
        utilities.handleErrors(invController.buildByClassificationId))

// Route to build vehicle view by detail
router
    .get("/detail/:vehicleId", 
        //authorizeAccess.authorizeAccess,
        utilities.handleErrors(invController.buildVehicleViewDetail))

// Route to error
router
    .get("/error/", 
        //authorizeAccess.authorizeAccess,
        utilities.handleErrors(invController.errorRoute))

// Route for Management View
router
    .get("/", 
        //authorizeAccess.authorizeAccess,
        utilities.handleErrors(invController.buildManagement))

// Route for New Classification Form
router
    .get("/add-classification", 
    //authorizeAccess.authorizeAccess,
    utilities.handleErrors(invController.buildAddClass))
    .post("/add-classification", 
        validate.addClassRules(),
        //validate.checkAddClassData, 
        utilities.handleErrors(invController.addClass)
)

// Route for Adding Vehicle Inventory
router
    .get("/add-inventory", 
        //authorizeAccess.authorizeAccess,
        utilities.handleErrors(invController.buildAddInventory))
    
    .post("/add-inventory", 
        //validate.addNewInvRules(),
        //validate.checkAddInvData, 
        utilities.handleErrors(invController.addInventory)
)

// Route to Create Table in MANAGEMENT view - modify inventories section
router
    .get("/getInventory/:classification_id", 
        //authorizeAccess.authorizeAccess,
        utilities.handleErrors(invController.getInventoryJSON))

// Route Modify Vehicle View
router
    .get("/edit/:vehicleId", 
        //authorizeAccess.authorizeAccess,
        utilities.handleErrors(invController.buildEditInvView))

// Route to UPDATE Vehicle Data
router.post("/update/",
    //alidate.addNewInvRules(),
    //validate.checkUpdateData,
    utilities.handleErrors(invController.updateInventory)
)

// Route to DELETE Vehilce Data
router
    .get("/delete/:vehicleId", 
        //authorizeAccess.authorizeAccess,
        utilities.handleErrors(invController.buildDeleteInventoryView))
    .post("/delete", utilities.handleErrors(invController.deleteInventory))

module.exports = router