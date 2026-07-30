const multer = require("multer");


// Store file temporarily in memory
const storage = multer.memoryStorage();


const upload = multer({

    storage: storage,

    limits:{
        fileSize: 50 * 1024 * 1024 // 10 MB
    },


    fileFilter:(req,file,cb)=>{


        const allowedTypes = [
            "application/pdf",

            "application/msword",

            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

            "application/vnd.ms-powerpoint",

            "application/vnd.openxmlformats-officedocument.presentationml.presentation",

            "image/jpeg",

            "image/png"
        ];


        if(allowedTypes.includes(file.mimetype))
        {
            cb(null,true);
        }
        else
        {
            cb(
                new Error(
                    "Only PDF, DOC, DOCX, PPT, PPTX and image files are allowed"
                )
            );
        }

    }

});


module.exports = upload;