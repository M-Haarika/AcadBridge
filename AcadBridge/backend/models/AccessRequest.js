const mongoose = require("mongoose");


const accessRequestSchema = new mongoose.Schema(
{
    fullName:
    {
        type:String,
        required:true,
        trim:true
    },

    collegeEmail:
    {
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },

    rollNumber:
    {
        type:String,
        required:true,
        unique:true
    },

    department:
    {
        type:String,
        required:true
    },

    year:
    {
        type:String,
        required:true
    },

    section:
    {
        type:String,
        required:true
    },

    phoneNumber:
    {
        type:String,
        required:true
    },

    password:
    {
        type:String,
        required:true
    },

    status:
    {
        type:String,
        enum:[
            "pending",
            "approved",
            "rejected"
        ],
        default:"pending"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "AccessRequest",
    accessRequestSchema
);