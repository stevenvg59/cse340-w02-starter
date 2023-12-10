const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **************************************
 *  Adding Classification Validation Rules
 * *************************************** */
validate.addClassificationRules = () => {
    return [
      // 
      body("classification_name")
        .trim()
        .isLength({ min: 2 })
        .custom(async (classification_name) => {
            const check = /^[a-zA-Z]+$/;
            const cont = check.test(classification_name)
            if (!cont)
            {
                throw new Error("Invalid classification name. Please try again.")
            }
        }),
    ]
}

/* ****************************************
 * Check data and return errors or continue
 * **************************************** */
validate.checkClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("./inventory/add-classification", {
        errors,
        title: "Add New Classification",
        nav,
        classification_name,
      })
      return
    }
    next()
}


/*  **************************************
 *  Adding Inventory Validation Rules
 * *************************************** */
validate.addInventoryRules = () => {
    return [
        // 
        body("inv_make")
            .trim()
            .isLength({ min: 3 })
            .withMessage("Please provide a maker."),
        
        body("inv_model")
            .trim()
            .isLength({ min: 3 })
            .withMessage("Please provide a model"),

        body("inv_description")
            .trim()
            .isLength({ min: 2 })
            .withMessage("Please provide a description."),
        
        body("inv_price")
            .trim()
            .custom(async (inv_price) => {
                const check = /^[0-9]+$/;
                const cont = check.test(inv_price)
                if (!cont)
                {
                    throw new Error("Invalid price. Please try again.")
                }
            })
            .withMessage("Please provide a valid price"),

        body("inv_year")
            .trim()
            .isLength({ max: 4 })
            .custom(async (inv_year) => {
                const check = /^[0-9]+$/;
                const cont = check.test(inv_year)
                if (!cont)
                {
                    throw new Error("Invalid year. Please try again.")
                }
            })
            .withMessage("Please provide a valid year"),
        
        body("inv_miles")
            .trim()
            .custom(async (inv_miles) => {
                const check = /^[0-9]+$/;
                const cont = check.test(inv_miles)
                if (!cont)
                {
                    throw new Error("Invalid miles. Please try again.")
                }
            })
            .withMessage("Please provide a valid miles"),

        body("inv_color")
            .trim()
            .isLength({ min: 3 })
            .withMessage("Please provide a color."),
    
    ]
}


/* ****************************************
 * Check data and return errors or continue
 * **************************************** */
validate.checkInventoryData = async (req, res, next) => {
    const { inv_make, inv_model, inv_description, inv_price, inv_year, inv_miles, inv_color } = req.body
    const grid = await utilities.builAddInventoryView()
    let errors = []
    errors = validationResult(req)
    //console.log(errors[0].msg)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("./inventory/add-inventory", {
        errors,
        title: "Add New Inventory",
        nav,
        grid,
        inv_make, 
        inv_model, 
        inv_description, 
        inv_price, 
        inv_year, 
        inv_miles, 
        inv_color,
      })
      return
    }
    next()
}

/* ****************************************
 * Check the update data and return errors
 * **************************************** */
validate.checkUpdateData = async (req, res, next) => {
    const { inv_id, inv_make, inv_model, inv_description, inv_price, inv_year, inv_miles, inv_color } = req.body
    const grid = await utilities.builAddInventoryView()
    let errors = []
    errors = validationResult(req)
    //console.log(errors[0].msg)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("./inventory/edit-inventory", {
        errors,
        title: "Edit",
        nav,
        grid,
        inv_id,
        inv_make, 
        inv_model, 
        inv_description, 
        inv_price, 
        inv_year, 
        inv_miles, 
        inv_color,
      })
      return
    }
    next()
}

module.exports = validate