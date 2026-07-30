const express = require("express");

const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");


const {

    addBookmark,

    getMyBookmarks,

    removeBookmark

}
=
require("../controllers/bookmarkController");



// Add bookmark

router.post(

    "/:resourceId",

    authMiddleware,

    addBookmark

);



// Get bookmarks

router.get(

    "/",

    authMiddleware,

    getMyBookmarks

);



// Remove bookmark

router.delete(

    "/:resourceId",

    authMiddleware,

    removeBookmark

);



module.exports = router;