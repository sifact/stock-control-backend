import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";

import productRoute from "./routes/product.route.js";
import authRoute from "./routes/auth.route.js";
import salesRoutes from "./routes/sales.route.js";

import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// const PORT = 8800;
const PORT = process.env.PORT || 8800;
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "product-ability", // Specify the desired database name
    });

    console.log("connected to mongodb");
  } catch (error) {
    // handleError(error);
    console.log("failed to connect");
  }
};

// middleware
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://control-stock.netlify.app",
    credentials: true,
  })
);
// app.use(cors());
app.use(express.json());

app.use(cookieParser());

// routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/sales", salesRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

// app.get("/", (req, res) => {
//   res.send("Hey works...");
// });
// app
//   .listen(PORT, () => {
//     connect();
//     console.log(`Backend server is running on ${PORT}`);
//   })
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

//     OverallStat.insertMany(dataOverallStat);
//   })
//   .catch((error) => console.log(`${error} did not connect`));

app.get("/", (req, res) => {
  res.send("Hey works...");
});

connect(); // Assuming this is your function to connect to the database

app.listen(PORT, () => {
  console.log(`Backend server is running on ${PORT}`);
  // You can perform other operations here after the server has started, such as inserting data into the database
  // OverallStat.insertMany(dataOverallStat)
  // .then((result) => {
  //   console.log("Data inserted successfully:", result);
  // })
  // .catch((error) => {
  //   console.error("Error inserting data:", error);
  // });
});
