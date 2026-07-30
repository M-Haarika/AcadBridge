require("dotenv").config();

const cloudinary = require("./config/cloudinary");


cloudinary.uploader.upload(
    "bharathi7.jpg",
    {
        folder:"acadbridge/test"
    }
)
.then(result=>{
    console.log("Upload success");
    console.log(result.secure_url);
})
.catch(error=>{
    console.log(error);
});