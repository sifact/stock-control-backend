import Category from "../models/Categories.js";

export const createCategory = async (req, res, next) => {
  try {
    const newCategory = new Category(req.body);

    await newCategory.save();

    res.status(201).json("Category has been created...");
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.status(201).send(categories);
  } catch (error) {
    next(error);
  }
};
