const express = require("express");

const router = express.Router();


const {
    createAccessRequest
}
=
require("../controllers/accessController");



router.post(
    "/request",
    createAccessRequest
);



module.exports = router;