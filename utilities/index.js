const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
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

/* **********************************
* Build the classification view HTML
* ******************************** */
Util.buildClassificationGrid = async function(data){
  let grid
  if (data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => {
      grid += '<li>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id
      + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model
      + ' details"><img src="' + vehicle.inv_thumbnail
      + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
      + ' on CSE Motors"/></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View '
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

/* *****************************************
* Build the single vehicle details view HTML
* ****************************************** */
Util.buildVehicleDetailView = async function(data) {
  let display

  let price =  parseInt(data[0].inv_price)
  let fprice = price.toLocaleString("en", {useGrouping:true})

  let miles = data[0].inv_miles
  let fmiles = miles.toLocaleString("en", {useGrouping:true})

  if (data.length > 0){
   display = '<div id="single-vehicle">'

   display += '<h1>'
   display += data[0].inv_year + " " + data[0].inv_make + " " + data[0].inv_model
   display += '</h1>'

   display += '<div id="single-vehicle-grid-display">'
   display += '<img src="' + data[0].inv_image
   + '" alt="Image of ' + data[0].inv_make + ' ' + data[0].inv_model
   + ' on CSE Motors"/>'

   display += '<div id="details-right">'
   display += '<h2>'
   display += data[0].inv_make + " " + data[0].inv_model + " Details"
   display += '</h2>'

   display += '<h2>'
   display += 'Price: $' + fprice
   display += '</h2>'

   display += '<h2>'
   display += 'Description: <span class="unbold-description">' + data[0].inv_description
   display += '</span></h2>'

   display += '<h2>'
   display += 'Color: <span class="unbold-description">' + data[0].inv_color
   display += '</span></h2>'

   display += '<h2>'
   display += 'Miles: <span class="unbold-description">' + fmiles
   display += '</span></h2>'

   display += '</div>'
   display += '</div>'
   display += '</div>'

  } else {
   display += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return display
}

/* *****************************************
* Build the vehicle management view HTML
* ****************************************** */

Util.buildManagementView = async function(){
  let grid

  grid = '<div class="management-links">'

  grid += '<a href="../../inv/newClassification">Add New Classification</a>'
  grid += '<a href="../../inv/newVehicle">Add New Vehicle</a>' 

  grid += '</div>'

  return grid
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util