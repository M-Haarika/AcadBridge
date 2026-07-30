const AccessRequest = require("../models/AccessRequest");
const bcrypt = require("bcrypt");


// Submit Access Request

const createAccessRequest = async (req,res)=>{
    console.log(req.body);

    try{

        const {
            fullName,
            collegeEmail,
            rollNumber,
            department,
            year,
            section,
            phoneNumber,
            password
        } = req.body;


        // Check existing request

        const existingRequest =
        await AccessRequest.findOne({
            collegeEmail
        });


        if(existingRequest)
        {
            return res.status(400).json({
                message:"Access request already exists"
            });
        }



        // Encrypt password

        const hashedPassword =
        await bcrypt.hash(password,10);



        // Create request

        const request =
        await AccessRequest.create({

            fullName,
            collegeEmail,
            rollNumber,
            department,
            year,
            section,
            phoneNumber,
            password:hashedPassword

        });



        res.status(201).json({

            message:"Access request submitted successfully",
            request

        });



    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



module.exports={
    createAccessRequest
};