// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build vehicle view by detail
router.get("/detail/:vehicleId", invController.buildVehicleViewDetail);

// Route to build inventory detail
//router.get("/error/", utilities.handleErrors(invController.errorRoute));


// Route for New Classification
router.get("/type/:classification_name", invController.buildByClassificationId);

// Route for New Vehicle Inventory
router.get("detail/:inv_make", invController.buildVehicleViewDetail);


module.exports = router;
