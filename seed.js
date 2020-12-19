const db = require("./models");

// db.Artist.create({ name: "Jordan Casteel", bio:"Jordan Casteel is an American figurative painter. Casteel typically paints intimate portraits of friends, lovers, and family members as well as neighbors and strangers in Harlem and New York. Casteel lives and works in New York City", url: "http://www.jordancasteel.com/", artwork: "self portrait"}, function (err, createdArtist) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(createdArtist);
//   }
//   process.exit();
// });


db.Curator.create({ name: "Barbara Thompson", gallery: "5fde4270513672090d7b35dd"}, function (err, createdCurator) {
  if (err) {
    console.log(err);
  } else {
    console.log(createdCurator);
  }
  process.exit();
});