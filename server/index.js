const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

mongoose.set("useCreateIndex", true);
mongoose
  .connect('mongodb://localhost/Login', {useNewUrlParser: true, useUnifiedTopology: true})
  .catch(err => {
    console.log({database_error: err});
  });

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan("dev")); 

const systemRoutes = require("./api/user/route/system");
app.use("/system", systemRoutes);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});