const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: `Image could not be uploaded`,
      });
    }

    // checking all the fields

    const {
      name,
      description,
      price,
      category,
      quantity,
      deliveryCharge,
    } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !image ||
      !deliveryCharge
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    let product = new Product(fields);
    if (files.image) {
      if (files.image.size > 3000000) {
        return res.status(400).json({
          error: `file size should be less than 3mb`,
        });
      }
      product.image.data = fs.readFileSync(files.image.path);
      product.image.contentType = files.image.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          err,
        });
      }
      res.json(result);
    });
  });
};
