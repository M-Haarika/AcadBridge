// const express = require("express");

// const router = express.Router();


// const upload = require("../middleware/uploadMiddleware");

// const authMiddleware = require("../middleware/authMiddleware");

// const {
//     uploadResource,
//     getApprovedResources,
//     downloadResource
// }
// =
// require("../controllers/resourceController");

// router.get("/test", (req, res) => {
//     res.send("Resource route working");
// });

// router.post(

//     "/upload",

//     authMiddleware,

//     upload.single("file"),

//     uploadResource

// );

// router.get(

//     "/approved",

//     authMiddleware,

//     getApprovedResources

// );

// router.get(

//     "/download/:id",

//     authMiddleware,

//     downloadResource

// );



// module.exports = router;

const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const {
    uploadResource,
    getApprovedResources,
    downloadResource,
    getResourceById          // <-- NEW
} = require("../controllers/resourceController");


// Test Route
router.get("/test", (req, res) => {
    res.send("Resource route working");
});


// Upload Resource
router.post(
    "/upload",
    authMiddleware,
    upload.single("file"),
    uploadResource
);


// Get All Approved Resources
router.get(
    "/approved",
    authMiddleware,
    getApprovedResources
);


// NEW: Get Single Resource Details
router.get(
    "/:id",
    authMiddleware,
    getResourceById
);


// Download Resource
router.get(
    "/download/:id",
    authMiddleware,
    downloadResource
);


module.exports = router;