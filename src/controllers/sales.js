import OverallStat2 from "../models/OverallStat2.js";

import Product from "../models/product.model.js";
import SoldProduct from "../models/soldProduct.model.js";
import updateOverallState from "../utils/updateOverallState.js";

export const getSales = async (req, res) => {
  try {
    const overallStats = await OverallStat2.find();

    res.status(200).json(overallStats[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSoldProducts = async (req, res) => {
  try {
    const soldProducts = await SoldProduct.find().sort({ soldUnits: -1 });

    res.status(200).json(soldProducts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addToSoldProducts = async (req, res) => {
  const product = req.body;

  try {
    const alreadyExist = await SoldProduct.findById(product._id);

    let soldProduct = "";

    if (alreadyExist?.quantity < 1)
      return res.status(400).send("Product out of stock");

    if (alreadyExist) {
      alreadyExist.soldUnits += 1;
      alreadyExist.quantity -= 1;

      await Product.updateOne({ _id: product._id }, { $inc: { quantity: -1 } });
      updateOverallState(product);
      alreadyExist.save();
      res.status(200).json(alreadyExist);
    } else {
      soldProduct = new SoldProduct({ ...req.body, soldUnits: 1 });
      soldProduct.quantity -= 1;
      await Product.updateOne({ _id: product._id }, { $inc: { quantity: -1 } });
      updateOverallState(product);
      await soldProduct.save();
      res.status(200).json(soldProduct);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const handleOverallStat = async (req, res) => {
  try {
    // const existingStat = await OverallStat.findOne({ year: req.body.year });

    // if (existingStat) {
    //   // Check if the month exists within the existingStat.monthlyData array
    //   const existingMonth = existingStat.monthlyData.find(
    //     (data) => data.month === month
    //   );

    //   if (!existingMonth) {
    //     existingStat.monthlyData.push({
    //       month: month,
    //       totalSales: 0,
    //       totalUnits: 0,
    //     });
    //     await existingStat.save();
    //   }
    // }
    const newStat = new OverallStat2();
    console.log(newStat);
    await newStat.save();
    res.status(201).json(newStat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
