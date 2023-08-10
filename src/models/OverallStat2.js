import mongoose from "mongoose";

const OverallStat2Schema = new mongoose.Schema(
  {
    yearlySalesTotal: {
      type: Number,
      required: false,
    },
    yearlyTotalSoldUnits: {
      type: Number,
      required: false,
    },
    year: {
      type: Number,
      required: false,
    },
    monthlyData: [
      {
        month: {
          type: String,
          required: false,
        },
        totalSales: {
          type: Number,
          required: false,
        },
        totalUnits: {
          type: Number,
          required: false,
        },
      },
    ],
    dailyData: [
      {
        date: {
          type: String,
          required: false,
        },
        totalSales: {
          type: Number,
          required: false,
        },
        totalUnits: {
          type: Number,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

// Add a pre-save middleware to populate the year, month, and date fields
// OverallStat2Schema.pre("save", function (next) {
//   const now = new Date();
//   this.year = now.getFullYear();

//   // Populate monthlyData with year and month
//   if (this.monthlyData && this.monthlyData.length > 0) {
//     this.monthlyData.forEach((monthData) => {
//       monthData.month = now.toLocaleString("default", { month: "long" });
//     });
//   }

//   // Populate dailyData with date (format: YYYY/MM/DD)
//   if (this.dailyData && this.dailyData.length > 0) {
//     this.dailyData.forEach((dayData) => {
//       dayData.date = now.toISOString().slice(0, 10);
//     });
//   }

//   next();
// });

const OverallStat2 = mongoose.model("OverallStat2", OverallStat2Schema);
export default OverallStat2;
