/* ===== IMAGE DOWNLOAD ===== */
/* image bs */
// const express = require("express");
// const router = express.Router();
// const Grid = require("gridfs-stream");
// /* engine */
// const crypto = require("crypto");
// const path = require("path");
// const GridFsStorage = require("multer-gridfs-storage");
// const multer = require("multer");
// img upload + method overide
// const bodyParser = require("body-parser");
// /* Img test */
// router.use(bodyParser.json());
// init gfs
/* let gfs;
const conn = mongoose.createConnection(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
}); */

/* stream engine */
// const storage = new GridFsStorage({
//   url: dbUrl,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString("hex") + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: "uploads",
//         };
//         resolve(fileInfo);
//       });
//     });
//   },
// });
// const upload = multer({ storage });

// router.get("/", (req, res) => {
//   res.render("artists/index");
// });
// upload
/* router.post("/upload", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
}); */

/* ========================Show page curator======================== */
{
}
