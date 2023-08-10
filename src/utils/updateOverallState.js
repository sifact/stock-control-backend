import OverallStat2 from "../models/OverallStat2.js";

const updateOverallState = async (product) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.toLocaleString("default", { month: "long" });

  // Format date to YYYY-MM-DD
  const date = `${year}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;

  const overallStat = await OverallStat2.find();

  await OverallStat2.updateOne(
    {
      year: year,
    },
    {
      $inc: {
        yearlySalesTotal: product.sellingPrice,
        yearlyTotalSoldUnits: 1,
      },
    }
  );

  const isMonthExist = await OverallStat2.find({
    year: 2023,
    "monthlyData.month": month,
  });

  if (isMonthExist.length > 0) {
    await OverallStat2.updateOne(
      {
        year: 2023,
        "monthlyData.month": month,
      },
      {
        $inc: {
          "monthlyData.$.totalSales": product.sellingPrice,
          "monthlyData.$.totalUnits": 1,
        },
      }
    );
  } else {
    overallStat[0].monthlyData.push({
      month: month,
      totalSales: product.sellingPrice,
      totalUnits: 1,
    });
    await overallStat[0].save();
  }

  const isDayExist = await OverallStat2.find({
    year: 2023,

    "dailyData.date": date,
  });
  console.log(isDayExist);

  if (isDayExist.length > 0) {
    console.log("inside if");
    await OverallStat2.updateOne(
      {
        year: 2023,

        "dailyData.date": date,
      },
      {
        $inc: {
          "dailyData.$.totalSales": product.sellingPrice,
          "dailyData.$.totalUnits": 1,
        },
      }
    );
  } else {
    console.log("inside else");
    overallStat[0].dailyData.push({
      date: date,
      totalSales: product.sellingPrice,
      totalUnits: 1,
    });
    await overallStat[0].save();
  }
};

export default updateOverallState;
