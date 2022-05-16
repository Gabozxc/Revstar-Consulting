require("dotenv").config({ path: "variables.env" });

const express = require("express"),
  mongoSanitize = require("express-mongo-sanitize"),
  cors = require("cors");
  
const app = express(),
  port = process.env.PORT || "8000";

const corsOptions = {
  origin: process.env.FRONT,
  optionsSuccessStatus: 200,
},
  connectDB = require("./config/db"), 
  indexRoutes = require("./routes/index");

app.use(cors(corsOptions));
connectDB();
app
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(mongoSanitize({ replaceWith: "_" }));

indexRoutes(app);

app.listen(port, () => {
  console.log(`Server running in the port http://localhost:${port}/ `);
});
