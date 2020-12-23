const mongoose = require("mongoose");
require("dotenv").config();
/* === Connect === */
const dbUrl = "mongodb://localhost:27017/curate" || process.env.MONGODB_URI;  

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
