const mongoose = require("mongoose");


const resourceSchema = new mongoose.Schema(
{
    title:
    {
        type:String,
        required:true,
        trim:true
    },

    resourceType: {
    type: String,
    enum: ["academics", "career"],
    required: true,
},

    description:
    {
        type:String,
        required:true
    },


// Career Fields

company: {
    type: String
},

role: {
    type: String
},

experienceType: {
    type: String
},

    category:
    {
        type:String,
       enum: [
"Notes",
"Previous Papers",
"Lab Material",
"Books",
"Resume",
"Interview Experience",
"Company Questions",
"Aptitude",
"Placement Material",
"Other"
],
        default:"Notes"
    },


   subject: {
    type: String
},

department: {
    type: String
},

year: {
    type: String
},

semester: {
    type: String
},

    uploadedBy:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    fileUrl:
    {
        type:String,
        required:true
    },


    fileType:
    {
        type:String,
        enum:[
            "pdf",
            "image"
        ]
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
    },


    downloads:
    {
        type:Number,
        default:0
    }

    

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Resource",
    resourceSchema
);