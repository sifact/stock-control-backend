// import Product from "../models/product.model.js";

import Product from "../models/product.model.js";

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);

    await newProduct.save();

    res.status(201).json("Product has been created...");
  } catch (error) {
    next(error);
  }
};
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json("product has been deleted...");
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateData = req.body.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};
