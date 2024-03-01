const express = require("express");
const homePageRoute = require("./routes/homePage");
const app = express();
const PORT = 4000;
const connectDB = require("./db/connect");
const cors = require("cors");

// app.use(
//   cors({
//     origin: ["http://localhost:3001"],
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("", homePageRoute);

const start = async () => {
  try {
    await connectDB();
    console.log("Connected to Database");
    app.listen(PORT, () => {
      console.log(`Server is listening at port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
