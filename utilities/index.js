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

  grid += '<a href="../../inv/addClassification">Add New Classification</a>'
  grid += '<a href="../../inv/addInventory">Add New Vehicle</a>' 

  grid += '</div>'

  return grid
}

/* *****************************************
* Build the Adding New Inventory view HTML
* ****************************************** */
Util.builAddInventoryView = async function(){
  let grid

  let data = await invModel.getClassifications()
  grid = '<div class="newInventoryForm">'
  grid += '<div class="form">'

  grid += '<label class="instruction">All fields are required.</label>'
  grid += '<form id="newInventoryForm" action="/inv/addInventory" method="post">'

  grid += '<label class="bigger">New Vehicle</label>'

  grid += '<label>Classification</label>'

  grid += '<select id="classification_id" name="classification_id">'
  grid += '<option value="" selected>Choose a classification</option>'
  data.rows.forEach(item => {
    grid += '<option value="' + item.classification_id + '">' + item.classification_name + '</option>'
  })

  grid += '</select>'

  grid += '<label>Make</label>'
  grid += '<input type="text" name="inv_make" id="inv_make" required placeholder="Min of 3 characters">'

  grid += '<label>Model</label>'
  grid += '<input type="text" name="inv_model" id="inv_model" required placeholder="Min of 3 characters">'

  grid += '<label>Description</label>'
  grid += '<textarea type="text" id="inv_description" name="inv_description" required placeholder="Enter a description"></textarea>'

  grid += '<label>Image Path</label>'
  grid += '<input type="text" name="inv_image" id="inv_image" value="/images/vehicles/no-image.png" readonly>'

  grid += '<label>Thumbnail Path</label>'
  grid += '<input type="text" name="inv_thumbnail" id="inv_thumbnail" value="/images/vehicles/no-image.png" readonly>'

  grid += '<label>Price</label>'
  grid += '<input type="text" name="inv_price" id="inv_price" required placeholder="decimal or integer">'

  grid += '<label>Year</label>'
  grid += '<input type="text" name="inv_year" id="inv_year" required placeholder="4-digit year">'

  grid += '<label>Miles</label>'
  grid += '<input type="text" name="inv_miles" id="inv_miles" required placeholder="Digits only">'

  grid += '<label>Color</label>'
  grid += '<input type="text" name="inv_color" id="inv_color" required>'

  grid += '<input type="submit" id="addInventory" value="Add Vehicle">'

  grid += '</form>'


  grid += '</div>'
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