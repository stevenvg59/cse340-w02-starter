// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const invValidate = require("../utilities/inventory-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build detail view for a single vehicle
router.get("/detail/:vehicleId", utilities.handleErrors(invController.buildVehicleDetailView));

// Route for the management page
router.get("/", utilities.handleErrors(invController.buildManagementView));

// Route for adding a new classification
router.get("/addClassification", utilities.handleErrors(invController.buildNewClassification));

//Registering process
router.post(
    "/addClassification",
    invValidate.addClassificationRules(),
    invValidate.checkClassificationData,
    utilities.handleErrors(invController.registerClassification)
);

// Route for adding a new inventory (vehicle)
router.get("/addInventory", utilities.handleErrors(invController.buildNewInventory))

router.post(
    "/addInventory",
    invValidate.addInventoryRules(),
    invValidate.checkInventoryData,
    utilities.handleErrors(invController.addInventory)
);

// Route for getting inventory by classification id
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

// Route for editing a vehicle by inventory id
router.get("/edit/:inv_id", utilities.handleErrors(invController.editInventoryView))


module.exports = router;