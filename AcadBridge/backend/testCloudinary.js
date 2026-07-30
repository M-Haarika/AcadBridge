const dotenv = require("dotenv");
dotenv.config();

const cloudinary = require("./config/cloudinary");

cloudinary.api.ping()
  .then((result) => {
    console.log("Connected!");
    console.log(result);
  })
  .catch((err) => {
    console.log("Error:");
    console.log(err);
  });