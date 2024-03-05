const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build view of detail for vehicle
 * ************************** */
invCont.buildVehicleViewDetail = async function (req, res, next) {
  const inv_id = req.params.vehicleId
  const data = await invModel.getInventoryByInventoryId(inv_id)
  const wrap = await utilities.buildVehicleWrap(data)
  let nav = await utilities.getNav()
  const inv_make = data.inv_make
  const inv_model = data.inv_model
  res.render("./inventory/detail", {
    title: inv_make + " " + inv_model,
    nav,
    wrap,
  })
}

/* ***************************
 *  Build ADD NEW Classification
 * ************************** */
invCont.addNewClassification = async function (req, res, next) {
  const classification_name = req.params.classification_name
  const data = await invModel.getClassifications(classification_name)
  const grid = await utilities.addNewClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render(".inventory/classification", {
    title: className + " vehicles", 
    nav,
    grid,
  })
}

//{ inv_make, ...} = req.body

/* ***************************
 *  Build ADD NEW car to Inventory
 * ************************** */
invCont.addNewVehicle = async function (req, res, next) {
  const inv_model = req.params.vehicle_name
  const wrap = await utilities.buildVehicleWrap(data)
  let nav = await utilities.getNav()
//  const inv_make = data.inv_make
  const inv_model = data.inv_model
  res.render("./inventory/detail", {
    title: inv_make + " " + inv_model,
    nav,
    wrap,
  })
}

module.exports = invCont