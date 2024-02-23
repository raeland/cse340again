// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
// Route to build vehicle view by detail
router.get("/detail/:vehicleId", invController.buildVehicleViewDetail);

module.exports = router;
