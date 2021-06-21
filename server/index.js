const express = require("express");
const app = express();
const mongoose = require("mongoose");
const employeeRoute = require("./routes/employeeRouter");
const userRouter = require("./routes/userRouter");
const cors = require("cors");
require("dotenv").config();


//Connecting to mongodb atlas
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to mongodb atlas"))
  .catch((e) => console.log(e));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Greeting route to heroku
app.get("/", (req, res) => res.send("hello world man"));

app.use("/api", employeeRoute);
app.use("/api", userRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => `Listening on PORT ${PORT}`);
