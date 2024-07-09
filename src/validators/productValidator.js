const { body } = require("express-validator");
const Product = require("../models/Product");
const Category = require("../models/Category");
const mongoose = require("mongoose");

const commonProductValidation = [
  body("name")
    .exists()
    .withMessage("Product name is required")
    .isString()
    .withMessage("Product name must be a string")
    .custom(async (value, { req }) => {
      const product = await Product.findOne({ name: value });
      if (product) {
        throw new Error("Product name must be unique");
      }
      return true;
    }),

  body("slug")
    .optional()
    .trim()
    .isSlug()
    .withMessage("Invalid slug format")
    .custom(async (slug, { req }) => {
      const existingSlug = await Product.findOne({ slug });
      if (existingSlug) {
        throw new Error("Slug must be unique");
      }
    }),

  body("category")
    .exists()
    .withMessage("Category is required")
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid category ID format");
      }
      const category = await Category.findById(value);
      if (!category) {
        throw new Error("Category not found");
      }
      return true;
    }),

  body("description")
    .exists()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),

  body("sizes")
    .exists()
    .withMessage("Sizes are required")
    .isArray({ min: 1 })
    .withMessage("Sizes must be an array with at least one item")
    .custom((sizes) => {
      sizes.forEach((size, index) => {
        if (typeof size.size !== "number" || size.size <= 0) {
          throw new Error(`Size at index ${index} must be a positive number`);
        }
        if (size.size < 18 || size.size > 54) {
          throw new Error(`Size at index ${index} must be between 18 to 54`);
        }
        if (typeof size.price !== "number" || size.price <= 0) {
          throw new Error(`Price at index ${index} must be a positive number`);
        }
        if (
          size.offerPrice != null &&
          (typeof size.offerPrice !== "number" || size.offerPrice <= 0)
        ) {
          throw new Error(
            `Offer price at index ${index} must be a positive number`
          );
        }
        if (size.offerPrice != null && size.offerPrice >= size.price) {
          throw new Error(
            `Offer price at index ${index} must be less than price`
          );
        }
        if (typeof size.stock !== "number" || size.stock < 0) {
          throw new Error(
            `Stock at index ${index} must be a non-negative integer`
          );
        }
        if (typeof size.sku !== "string" || !size.sku.trim()) {
          throw new Error(`SKU at index ${index} must be a non-empty string`);
        }
      });
      return true;
    }),
];

const productValidation = [
  ...commonProductValidation,
  body("featuredImage").exists().withMessage("Featured image is required"),
  body("hoverImage").exists().withMessage("Hover image is required"),
  body("images")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Images must be an array with at least one item")
    .custom((images) => {
      images.forEach((image) => {
        if (typeof image !== "string") {
          throw new Error("Each image must be a string");
        }
      });
      return true;
    }),
];

module.exports = {
  productValidation,
  commonProductValidation,
};
