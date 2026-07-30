const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const User = require("./models/User");


dotenv.config();


const createAdmin = async()=>{

    try{

        await mongoose.connect(
            process.env.MONGO_URI
        );


        console.log(
            "MongoDB Connected"
        );


        const hashedPassword =
        await bcrypt.hash(
            "admin123",
            10
        );


        const admin =
        await User.create({

            fullName:"AcadBridge Admin",

            collegeEmail:
            "admin@acadbridge.com",

            password:hashedPassword,

            role:"admin"

        });


        console.log(
            "Admin Created Successfully",
            admin
        );


        mongoose.connection.close();


    }
    catch(error){

        console.log(error);

        mongoose.connection.close();

    }

};


createAdmin();