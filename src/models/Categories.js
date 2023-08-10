import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);
const Category = mongoose.model("Category", categorySchema);

export default Category;
