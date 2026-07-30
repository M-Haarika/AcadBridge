const Resource = require("../models/Resource");
const cloudinary = require("../config/cloudinary");


// Upload Resource Controller

const uploadResource = async(req,res)=>{

    try{

        console.log("BODY DATA:", req.body);


        const {
    resourceType,
    title,
    description,

    subject,
    department,
    year,
    semester,

    company,
    role,
    experienceType,

    category
} = req.body;

if (resourceType === "academics") {

    if (!subject || !department || !year || !semester) {
        return res.status(400).json({
            message: "Please fill all academic fields."
        });
    }

}

if (resourceType === "career") {

    if (!company || !role || !experienceType) {
        return res.status(400).json({
            message: "Please fill all career fields."
        });
    }

}



        // Check file

        if(!req.file){

            return res.status(400).json({
                message:"Please upload a file"
            });

        }


        // File details checking

        console.log("FILE DETAILS:");
        console.log("Name:", req.file.originalname);
        console.log("Type:", req.file.mimetype);
        console.log("Size:", req.file.size);

//console.log("Cloudinary Config:", cloudinary.config());

        // Upload file to Cloudinary

       console.log("Before Cloudinary Upload");

const result = await new Promise((resolve, reject) => {

    const stream = cloudinary.uploader.upload_stream(
        {
  folder: "acadbridge/resources",
  resource_type: "raw",
  public_id: req.file.originalname.replace(/\.[^/.]+$/, ""),
  use_filename: true,
  unique_filename: true
},
        (error, result) => {

            console.log("Cloudinary callback reached");

            if (error) {
                console.log("Cloudinary Error:", error);
                return reject(error);
            }

            console.log("Cloudinary Success:", result);

            resolve(result);
        }
    );

    console.log("Sending buffer...");

    stream.end(req.file.buffer);
});

console.log("After Cloudinary Upload");



        // Save Resource in MongoDB

        const resource = await Resource.create({

    resourceType,

    title,

    description,

    // Academic
    subject,
    department,
    year,
    semester,

    // Career
    company,
    role,
    experienceType,

    category,

    uploadedBy: req.user.id,

    fileUrl: result.secure_url,

    fileType: req.file.mimetype.split("/")[1],

    status: "pending"

});



        res.status(201).json({

            message:
            "Resource uploaded successfully. Waiting for admin approval",

            resource

        });


    }


    catch (error) {
    console.error("========== UPLOAD ERROR ==========");
    console.error(error);

    res.status(500).json({
        message: error.message,
    });
}

};




// Get Approved Resources Controller

const getApprovedResources = async(req,res)=>{


    try{


        const resources = await Resource.find({

            status:"approved"

        })

        .populate(
            "uploadedBy",
            "fullName department year"
        );



        res.status(200).json(resources);


    }


    catch(error){


        res.status(500).json({

            message:error.message

        });


    }

};





// Download Resource Controller


const downloadResource = async(req,res)=>{


    try{


        const resourceId = req.params.id;



        const resource = await Resource.findById(resourceId);



        if(!resource){


            return res.status(404).json({

                message:"Resource not found"

            });


        }



        if(resource.status !== "approved"){


            return res.status(403).json({

                message:"Resource is not available for download"

            });


        }




        resource.downloads += 1;


        await resource.save();




        res.status(200).json({


            message:"Download started",


            fileUrl:resource.fileUrl,


            downloads:resource.downloads


        });



    }


    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};

// ================= Get Single Resource Controller =================

const getResourceById = async (req, res) => {

    try {

        const resource = await Resource.findById(req.params.id)
            .populate(
                "uploadedBy",
                "fullName department year bio linkedin github portfolio collegeEmail"
            );

        const uploadCount = await Resource.countDocuments({
    uploadedBy: resource.uploadedBy._id,
    status: "approved"
});

        if (!resource) {

            return res.status(404).json({
                message: "Resource not found"
            });

        }

        if (resource.status !== "approved") {

            return res.status(403).json({
                message: "Resource is not approved yet."
            });

        }

        res.status(200).json(resource);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};




module.exports = {

    uploadResource,

    getApprovedResources,

    downloadResource,

    getResourceById

};