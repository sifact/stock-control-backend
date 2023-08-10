// import Product from "../models/product.model.js";

import Category from "../models/Categories.js";
import Product from "../models/product.model.js";
import pick from "../utils/pick.js";

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    await Category.updateOne(
      { label: req.body.category },
      { $inc: { value: 1 } }
    );

    await newProduct.save();

    res.status(201).json("Product has been created...");
  } catch (error) {
    next(error);
  }
};
export const getProducts = async (req, res, next) => {
  const filters = pick(req.query, ["search", "category"]);

  const { search, ...filtersData } = filters;
  const bookSearchableFields = ["title"];

  const andConditions = [];

  // searching
  if (search) {
    andConditions.push({
      $or: bookSearchableFields.map((field) => ({
        [field]: {
          $regex: search,
          $options: "i",
        },
      })),
    });
  }
  // filtering
  if (Object.keys(filtersData).length) {
    Object.entries(filtersData).forEach(([field, value]) => {
      if (value !== "All") {
        andConditions.push({
          $and: Object.entries(filtersData).map(([field, value]) => ({
            [field]: value,
          })),
        });
      }
    });
  }

  console.log(andConditions);
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  try {
    const books = await Product.find(whereConditions).sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    await Category.updateOne(
      { label: product.category },
      { $inc: { value: -1 } }
    );
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
