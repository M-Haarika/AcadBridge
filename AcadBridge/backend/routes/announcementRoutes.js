const express = require("express");

const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");


const {

    createAnnouncement,

    getAnnouncements,

    deleteAnnouncement

}
=
require("../controllers/announcementController");



// Admin Create Announcement

router.post(

    "/",

    authMiddleware,

    roleMiddleware("admin"),

    createAnnouncement

);



// Get announcements

router.get(

    "/",

    authMiddleware,

    getAnnouncements

);



// Delete announcement

router.delete(

    "/:id",

    authMiddleware,

    roleMiddleware("admin"),

    deleteAnnouncement

);



module.exports = router;