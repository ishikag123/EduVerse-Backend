const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const Connection = require("./db.js");
const studentRoute = require("./Routes/StudentRoute.js");

dotenv.config();
const PORT = process.env.PORT;
const app = express();

//Database connection
Connection();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/student", studentRoute);

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});