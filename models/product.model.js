import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    costPrice: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },

    sellingPrice: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

export default Product;
