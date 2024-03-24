const utilities = require(".")
const {body, validationResult} = require("express-validator")
const invModel = require("../models/inventory-model")
const validate = {}

validate.addClassRules = () => {
    return [
      // firstname is required and must be string
      body("classification_name")
        .trim()
        .isLength({ min: 1 })
        .isAlpha()
        .withMessage("Please provide a classification name."), // on error this message is sent.
    ]
  }

// Check data and return errors or continue to new vehicle 
// Assignment 4, Task 3
validate.addNewInvRules = async (req, res, next) => {
  const {
  inv_make,
  inv_model,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_year,
  inv_miles,
  inv_color, 
  classification_id,
  } = req.body

  console.log(inv_price)

  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    const classificationSelect = await utilities.buildClassSelect(
      classification_id
    )
    res.render("inventory/addInventory", {
      errors,
      title: "Add Vehicle",
      nav,
      classificationSelect,
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
      })
      return
  }
  next()
}

// Check data and return errors or continue to new vehicle 
// Assignment 4, Task 3
validate.checkUpdateData = async (req, res, next) => {
  const {
  inv_id,
  inv_make,
  inv_model,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_year,
  inv_miles,
  inv_color, 
  classification_id,
  } = req.body

  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    const classificationSelect = await utilities.buildClassSelect(
      classification_id
    )
    res.render("inventory/edit-inventory", {
      errors,
      title: "Edit " + title,
      nav,
      classificationSelect,
      inv_id,
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
      })
      return
  }
  next()
}

/*  **********************************
 *  Adding NEW Inventory Validation Rules
 * ********************************* */
validate.addNewInvRules = () => {
  return [
    body("vehicle_name")
    .trim()
    .isLength({ min: 1})
    .isAlphanumeric()
    .withMessage("Please add Vehicle name that matches the requested format."),
  ]
}

/*  **********************************
 *  Checking Inventory Data Validation
 * ********************************* */
validate.checkAddInvData = async (req, res, next) => {
  const { vehicle_name } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-inventory", {
      errors,
      title: "Add New Inventory",
      nav,
      vehicle_name,
    })
    return
  }
  next()
}


  module.exports = validate