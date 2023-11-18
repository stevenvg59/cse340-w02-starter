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

module.exports = invCont
