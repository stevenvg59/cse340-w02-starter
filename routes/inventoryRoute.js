// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build detail view for a single vehicle
router.get("/detail/:vehicleId", utilities.handleErrors(invController.buildVehicleDetailView));

// Route for the management page
router.get("/", utilities.handleErrors(invController.buildManagementView));

// Route for adding a new classification
router.get("/addClassification", utilities.handleErrors(invController.buildNewClassification));

module.exports = router;