const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()

  //console.log(data)
  //console.log(data.rows)

  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors"></a>'
      grid += '<div class="namePrice">'
      grid += '<hr>'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build inventory detail view HTML
* ************************************ */
Util.buildVehicleWrap = async function(data) {
  let detail
  if (data) {
    detail = '<div id="inv-wrap">'
    detail += '<img src="' + data.inv_image + '" alt="' + data.inv_make + " " + data.inv_model
    detail += ' on CSE Motors">'
    detail += '<span>$' + new Intl.NumberFormat('en-us').format(data.inv_price) + '</span>'
    detail += '<table>' 
    detail += '<tr><th>Mileage</th><th>Color</th></tr>'
    detail += '<tr><td>' + new Intl.NumberFormat('en-us').format(data.inv_miles) + '</td></td>' + data.inv_color + '</td><tr>'
    detail += '<tr><td colspan="2">Description</th></tr>'
    detail += '<tr><td colspan="2">' + data.inv_description + '</th></tr>'
    detail += '</table>'
    detail += '</div>'
  } else {
    detail += '<p class="notice">Sorry, vehicle not found.</p>'
  }
  return detail
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util