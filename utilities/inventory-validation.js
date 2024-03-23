const utilities = require(".")
const {body, validationResult} = require("express-validator")
const invModel = require("../models/inventory-model")
const validate = {}

validate.addClassRules = () => {
    return [
      // firstname is required and must be string
      body("classification_name")
        .trim()
        .isLength({ min: 1 })
        .isAlpha()
        .withMessage("Please provide a classification name."), // on error this message is sent.
    ]
  }

  module.exports = validate