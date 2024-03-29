const { parse } = require("dotenv")
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
  const title = inv_make + " " + inv_model
    res.render("./inventory/detail", {
    title: title,
    nav,
    detail,
    wrap,
    errors: null,
  })
}

/* ***************************
 *  FUNCTION to Deliver Management View
 * ************************** */
invCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav()
    const classificationSelect = await utilities.buildClassSelect()
    res.render("./inventory/management", {
    title: "Inventory Management",
    nav,
    errors: null,
    classificationSelect
  } )
}

/* ***************************
 *  Build ADD NEW Classification Form View
 * ************************** */
invCont.buildAddClass = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add New Classification", 
    nav,
    errors: null,
  })
}

/* ***************************
 *  ADD a NEW Classification
 * ************************** */
invCont.addClass = async function (req, res, next) {
  //console.log ("addNewClass")
  const { classification_name } = req.body
  const addClass = await invModel.addClass(classification_name)
  let nav = await utilities.getNav()

  if (addClass) {
    req.flash("notice", 
      `You have Successfully Added New Classification - ${classification_name}.`)
    res.status(201).render("./inventory/management", {
      title: "Inventory Management",
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

/* ***************************
 *  Build ADD Inventory View
 * ************************** */
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let options = await utilities.buildClassSelect()
  res.render("./inventory/add-inventory", {
    title: "Add New Vehicle",
    nav,
    options: options,
    errors: null,
  })
}

/* ***************************
 *  Deliver Vehicle FORM View
 * ************************** */
invCont.vehicleForm = async function (req, res, next) {
  //I always always grab your navigation, always
  let nav = await utilities.getNav()
  let classificationSelect = await utilities.classificationSelect()

  res. render ("inventory/add-vehicle", {
     title: "Add New Vehicle", 
     nav,
     ClassificationSelect,
     errors: null,
  })
}

/* ***************************
 *  Deliver Edit  FORM View
 * ************************** 
invCont.vehicleForm = async function (req, res, next) {
  //I always always grab your navigation, always
  let nav = await utilities.getNav()
  let classificationSelect = await utilities.classificationSelect()

  res. render ("inventory/add-vehicle", {
     title: "Add New Vehicle", 
     nav,
     ClassificationSelect,
     errors: null,
  })
}
*/
/* ***************************
 *  ADD NEW Vehicle Inventory
 * ************************** */
invCont.addInventory = async function (req, res) {
  let nav = await utilities.getNav()
  let options = await utilities.buildClassSelect()
  const {inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  } = req.body

  const addInventory = await invModel.addInventory(
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  )
if (addInv) {
  req.flash("notice", "You Have Added a New Vehicle Successfully."
  )
  res.status(201).render("./inventory/management", {
    title: "Inventory Management",
    nav,
    errors: null,
    list: options,
  })
} else {
    req.flash("notice", "Sorry, Your Attempt to add New Vehicle Failed.")
    res.status(501).render("./inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      options: options,
      errors: null,
    })
  }
}

/* ***************************
 *  RETURN Inventory by Classification AS JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No Data Returned"))
  }
}

/* ***************************
 *  Build Edit Inventory View
 * ************************** */
invCont.buildEditInvView = async function (req, res, next) {
  const inv_id = req.params.invId
  let nav = await utilities.getNav()
  const data = await invModel.getInventoryByInventoryId(inv_id)
  const title = data.inv_make + " " + data.inv_model
  let options = await utilities.buildClassSelect(data.classification_id)
  const name = `${data.inv_make} ${data.inv_model}`

  res.render("./inventory/edit-inventory", {
    title: "Edit " + title,
    nav,
    classificationSelect,
    data,
    errors: null,
    inv_id: data.inv_id,
    inv_make: data.inv_make,
    inv_model: data.inv_model,
    inv_year: data.inv_year,
    inv_description: data.inv_description,
    inv_image: data.inv_image,
    inv_thumbnail: data.inv_thumbnail,
    inv_price: data.inv_price,
    inv_miles: data.inv_miles,
    inv_color: data.inv_color,
    classification_id: data.classification_id
})
}


/* ***************************
 *  UPDATE Inventory Data
 * ************************** */
invCont.updateInventory = async function (req, res) {
  let nav = await utilities.getNav()
  const {inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  } = req.body


const updateResult = await invModel.updateInventory(
  inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
)

if (updateResult) {
  const itemName = updateResult.inv_make + " " + updateResult.inv_model
  req.flash("notice", "The ${itemName} was Updated Successfully."
  )
  res.redirect("/inv/")
} else {
  const options = await utilities.buildClassSelect(classification_id)
  //const classSelect = await utilities.buildClassificationList(classification_id)
  const itemName = `${inv_make} ${inv_model}`
  req.flash("notice", "Sorry, the inserted Classification Failed.")
  res.status(501).render("./inventory/edit-inventory", {
    title: "Edit" + itemName,
    nav,
    options: options,
    errors: null,
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_color,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    classification_id
  })
}
}

/* ***************************
 *  Build DELETE Inventory View
 * ************************** */
invCont.buildDeleteInventoryView = async function (req, res, next) {
  const inv_id = parseInt(req.params.vehicleId)
  let nav = await utilities.getNav()
  const data = await invModel.getInventoryByInventoryId(inv_id)
  const name = `${data.inv_make} ${data.inv_model}`

  res.render("./inventory/delete-confirm", {
    title: "Delete" + name,
    nav,
    errors: null,
    inv_id: data.inv_id,
    inv_make: data.inv_make,
    inv_model: data.inv_model,
    inv_year: data.inv_year,
    inv_price: data.inv_price
})
}

/* ***************************
 *  DELETE Inventory Data
 * ************************** */
invCont.deleteInventory = async function (req, res) {
  //let nav = await utilities.getNav()
  const {inv_id,} = parseInt(req.body)

  const deleteResult = await invModel.deleteInventory(inv_id)

if (deleteResult) {
  req.flash(
    "notice", 
    `The Vehicle was Deleted Successfully.`
  )
  res.redirect("/inv/")
} else {
  req.flash(
    "notice", 
    "Sorry, the Attempted Deletion Failed.")
  res.status(501).redirect("inv/delete/" + inv_id)
}
}

/* ***************************
 *  Management Inventory Data 
 *  IDK if i need this or was this me attempting 
 *  to make the ACCOUNT MANAGEMENT PAGE ?????
 * ************************** */
invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  const data = await invModel.getInventoryByClassificationId()
  const classificationSelect = await utilities.buildClassSelect(data)
  res.render("./inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
    classificationSelect
    })
}

module.exports = invCont