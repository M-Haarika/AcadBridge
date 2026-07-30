const Bookmark = require("../models/Bookmark");

console.log("Bookmark Model:", Bookmark);
// Add Bookmark

const addBookmark = async(req,res)=>{

    try{

        const { resourceId } = req.params;


        const bookmark = await Bookmark.create({

            user:req.user.id,

            resource:resourceId

        });


        res.status(201).json({

            message:"Resource bookmarked successfully",

            bookmark

        });


    }
    catch(error){

        if(error.code === 11000){

            return res.status(400).json({

                message:"Resource already bookmarked"

            });

        }


        res.status(500).json({

            message:error.message

        });

    }

};



// Get My Bookmarks

const getMyBookmarks = async(req,res)=>{

    try{

        const bookmarks = await Bookmark.find({

            user:req.user.id

        })
        .populate(
            "resource",
            "title description subject category fileUrl fileType"
        );


        res.status(200).json(bookmarks);


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};



// Remove Bookmark

const removeBookmark = async(req,res)=>{

    try{

        const { resourceId } = req.params;


        const bookmark = await Bookmark.findOneAndDelete({

            user:req.user.id,

            resource:resourceId

        });


        if(!bookmark){

            return res.status(404).json({

                message:"Bookmark not found"

            });

        }


        res.status(200).json({

            message:"Bookmark removed successfully"

        });


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};



module.exports = {

    addBookmark,

    getMyBookmarks,

    removeBookmark

};