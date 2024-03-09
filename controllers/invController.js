const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")
const invCont = {}

/* ***************************
 *  BUILD Inventory by Classification View
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
 *  BUILD Vehicle Detail View
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
 *  Build Management View
 * ************************** */
invCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
  } )
}

/* ***************************
 *  Build ADD NEW Classification View
 * ************************** */
invCont.buildAddClass = async function (req, res, next) {
  let nav = await utilities.getNav()
  //const classification_name = req.params.classification_name
  //const data = await invModel.getClassifications(classification_name)
  //const grid = await utilities.addNewClassificationGrid(data)
  //const className = data[0].classification_name
  res.render(".inventory/add-classification", {
    title: "Add New Classification", 
    nav,
    errors: null,
  })
}

/* ***************************
 *  ADD a NEW Class
 * ************************** */
invCont.addNewClassData = async function (req, res, next) {
  const { classification_name } = req.body
  const addClass = await invModel.addClass(classification_name)
  let nav = await utilities.getNav()

  if (addClass) {
    req.flash("notice", `You have Successfully Added New Classification - ${classification_name}.`)
    res.status(201).render("./inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the entered new classification process failed.")
    res.status(501).render("./inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors: null,
    })
  }
}

//{ inv_make, ...} = req.body

/* ***************************
 *  Build ADD NEW Inventory View
 * ************************** */
invCont.buildNewInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const inv_make = req.params.vehicle_name
  const wrap = await utilities.buildVehicleWrap(data)

//  const inv_make = data.inv_make
  const inv_model = data.inv_model
  res.render("./inventory/detail", {
    title: inv_make + " " + inv_model,
    nav,
    wrap,
  })
}

module.exports = invCont