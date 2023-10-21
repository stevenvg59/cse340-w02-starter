// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build detail view for a single vehicle
router.get("/detail/:vehicleId", invController.buildVehicleDetailView);

module.exports = router;