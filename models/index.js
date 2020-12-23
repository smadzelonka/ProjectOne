const mongoose = require("mongoose");
require("dotenv").config();
/* === Connect === */
const dbUrl = process.env.MONGODB_URI;
/*  "mongodb://localhost:27017/curate"  // connnect
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(function () {
    console.log("Mongodb connected");
  })
  .catch(function (error) {
    console.log("Mongodb error");
    console.log(error);
  });

mongoose.connection.on("disconnected", function () {
  console.log("Mongodb disconnected");
});

/* ===== export ===== */

module.exports = {
  Artist: require("./Artist"),
  Curator: require("./Curator"),
  Username: require("./Auth"),
};
