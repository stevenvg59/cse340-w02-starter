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
    grid
  })
}

/* ***************************
 *  Build Single Vehicle Detail view
 * ************************** */
invCont.buildVehicleDetailView = async function (req, res, next) {
  const vehicle_id = req.params.vehicleId
  const data = await invModel.getSingleVehicleData(vehicle_id)
  const grid = await utilities.buildVehicleDetailView(data)
  let nav = await utilities.getNav()
  const modelName = data[0].inv_make + " - " + data[0].inv_model 
  res.render("./inventory/singleVehicle", {
    title: modelName,
    nav,
    grid
  })

}

/* ***************************
 *  Build Management view
 * ************************** */
invCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav()
  const grid = await utilities.buildManagementView()
  res.render("./inventory/management", {
    title: "Vehicle Management",
    nav,
    grid
  })
}

/* ***********************************
 *  Build New Classification Form view
 * *********************************** */
invCont.buildNewClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  })
}

/* ***********************************
 *  Registering a new classification
 * *********************************** */
invCont.registerClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  const grid = await utilities.buildManagementView()
  const { classification_name } = req.body
  const regResult = await invModel.addClassification(classification_name)
  console.log(classification_name)

  if (regResult) {
    req.flash(
      "green",
      `Congratulations, you\'ve added ${classification_name} as a new Classification!`
    )
    res.status(201).render("./inventory/management", {
      title: "Vehicle Management",
      nav,
      grid,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed. Try again.")
    res.status(501).render("./inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors: null,
    })
  }
}

/* ***********************************
 *  Build New Inventory Page
 * *********************************** */
invCont.buildNewInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const grid = await utilities.builAddInventoryView()
  res.render("./inventory/add-inventory", {
    title: "Add New Inventory",
    nav,
    errors: null,
    grid
  })
}

/* ***********************************
 *  Registering a new classification
 * *********************************** */
invCont.addInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const grid = await utilities.buildManagementView()
  const { inv_make, inv_model, inv_year, inv_description, inv_image,inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
  const price = parseInt(inv_price)
  const miles = parseInt(inv_miles)
  const class_id = parseInt(classification_id)
  const regResult = await invModel.addInventory(inv_make, inv_model, inv_year, inv_description, inv_image,inv_thumbnail, price, miles, inv_color, class_id)

  if (regResult) {
    req.flash(
      "green",
      `Congratulations, you\'ve added a new Vehicle!`
    )
    res.status(201).render("./inventory/management", {
      title: "Vehicle Management",
      nav,
      grid,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed. Try again.")
    res.status(501).render("./inventory/add-inventory", {
      title: "Add New Inventory",
      nav,
      errors: null,
    })
  }
}

module.exports = invCont
