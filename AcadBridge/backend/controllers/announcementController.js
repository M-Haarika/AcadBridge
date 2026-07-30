const Announcement = require("../models/Announcement");


// Create Announcement (Admin)

const createAnnouncement = async(req,res)=>{

    try{

        const {
            title,
            message,
            priority
        } = req.body;


        const announcement = await Announcement.create({

            title,

            message,

            priority,

            createdBy:req.user.id

        });


        res.status(201).json({

            message:"Announcement created successfully",

            announcement

        });


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};



// Get All Announcements

const getAnnouncements = async(req,res)=>{

    try{

        const announcements = await Announcement.find()
.populate(
    "createdBy",
    "fullName"
)
.sort({
    createdAt:-1
});


        res.status(200).json(announcements);


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};



// Delete Announcement (Admin)

const deleteAnnouncement = async(req,res)=>{

    try{

        const announcement = await Announcement.findById(
            req.params.id
        );


        if(!announcement){

            return res.status(404).json({

                message:"Announcement not found"

            });

        }


        await announcement.deleteOne();


        res.status(200).json({

            message:"Announcement deleted successfully"

        });


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};



module.exports = {

    createAnnouncement,

    getAnnouncements,

    deleteAnnouncement

};