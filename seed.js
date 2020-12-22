const db = require("./models");

// db.Artist.create({ name: "Jordan Casteel", bio:"Jordan Casteel is an American figurative painter. Casteel typically paints intimate portraits of friends, lovers, and family members as well as neighbors and strangers in Harlem and New York. Casteel lives and works in New York City", url: "http://www.jordancasteel.com/", artwork: "self portrait"}, function (err, createdArtist) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(createdArtist);
//   }
//   process.exit();
// });

db.Artist.create(
  {name: "Mike Dirosa",
  bio: { type: String, required: true },
  url: "https://michael-dirosa.tumblr.com/",
  artwork: "https://michael-dirosa.tumblr.com/post/184997831091/ancient-but-necessary-5x35-oil-oil-stick-on" /* data: Buffer, contentType: String */ /* Img url? */,
  artCollection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Curator",
  },
  function (err, createdArtist) {
    if (err) {
      console.log(err);
    } else {
      console.log(createdArtist);
    }
    process.exit();
  },
  });

  db.Artist.create(
    {name: "Mike Dirosa",
    bio: "{ type: String, required: true }",
    url: "https://michael-dirosa.tumblr.com/",
    artwork: "https://michael-dirosa.tumblr.com/post/184997831091/ancient-but-necessary-5x35-oil-oil-stick-on" /* data: Buffer, contentType: String */ /* Img url? */,
    artCollection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Curator",
    },
    function (err, createdArtist) {
      if (err) {
        console.log(err);
      } else {
        console.log(createdArtist);
      }
      process.exit();
    },
    });

    db.Artist.create(
      {name: "Julia Genzano",
      bio: "{ type: String, required: true }",
      url: "https://www.flickr.com/photos/juliagenzanophotography/",
      artwork: "https://www.flickr.com/photos/juliagenzanophotography/8166723879/",
      artCollection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Curator",
      },
      function (err, createdArtist) {
        if (err) {
          console.log(err);
        } else {
          console.log(createdArtist);
        }
        process.exit();
      },
      });

db.Curator.create(
  { name: "Seasons Greetings", gallery: ["5fde4270513672090d7b35dd"] },
  function (err, createdCurator) {
    if (err) {
      console.log(err);
    } else {
      console.log(createdCurator);
    }
    process.exit();
  },
);

