import mongoose from "mongoose";

const { Schema } = mongoose;

const soldProductSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
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
    soldUnits: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);
const SoldProduct = mongoose.model("SoldProduct", soldProductSchema);

export default SoldProduct;
