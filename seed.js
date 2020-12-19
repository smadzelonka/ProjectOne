const db = require("./models");

db.Curator.create({ name: "Micheal Jordan" }, function (err, createdCurator) {
  if (err) {
    console.log(err);
  } else {
    console.log(createdCurator);
  }
  process.exit();
});
