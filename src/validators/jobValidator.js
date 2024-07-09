const { body } = require("express-validator");

//registration validation
const validateJob = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .trim(),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string")
    .trim(),
  body("company")
    .notEmpty()
    .withMessage("Company is required")
    .isString()
    .withMessage("Company must be a string")
    .trim(),
  body("location")
    .notEmpty()
    .withMessage("Location is required")
    .isString()
    .withMessage("Location must be a string")
    .trim(),
];

module.exports = { validateJob };
