// const express = require("express");
// const router = express.Router();

// const authMiddleware = require("../middleware/authMiddleware");
// const roleMiddleware = require("../middleware/roleMiddleware");

// const {
//   getAccessRequests,
//   approveRequest,
//   rejectRequest,
//   getAllUsers,
//   getPendingResources,
//   approveResource,
//   rejectResource,
// } = require("../controllers/adminController");


// // ================= Student Access Requests =================

// // Get Pending Access Requests
// router.get(
//   "/access-requests",
//   authMiddleware,
//   roleMiddleware("admin"),
//   getAccessRequests
// );

// // Approve Student Request
// router.put(
//   "/approve/:id",
//   authMiddleware,
//   roleMiddleware("admin"),
//   approveRequest
// );

// // Reject Student Request
// router.put(
//   "/reject/:id",
//   authMiddleware,
//   roleMiddleware("admin"),
//   rejectRequest
// );


// // ================= Resource Management =================

// // Get Pending Resources
// router.get(
//   "/resources",
//   authMiddleware,
//   roleMiddleware("admin"),
//   getPendingResources
// );

// // Approve Resource
// router.put(
//   "/resource/approve/:id",
//   authMiddleware,
//   roleMiddleware("admin"),
//   approveResource
// );

// // Reject Resource
// router.put(
//   "/resource/reject/:id",
//   authMiddleware,
//   roleMiddleware("admin"),
//   rejectResource
// );

// // ================= All Users =================

// // Get All Registered Users
// router.get(
//   "/users",
//   authMiddleware,
//   roleMiddleware("admin"),
//   getAllUsers
// );

// module.exports = router;

const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getAccessRequests,
  approveRequest,
  rejectRequest,
  getAllUsers,

  getPendingResources,
  approveResource,
  rejectResource,

} = require("../controllers/adminController");


// ================= Student Requests =================

router.get(
  "/access-requests",
  authMiddleware,
  adminMiddleware,
  getAccessRequests
);

router.put(
  "/approve/:id",
  authMiddleware,
  adminMiddleware,
  approveRequest
);

router.put(
  "/reject/:id",
  authMiddleware,
  adminMiddleware,
  rejectRequest
);


// ================= Users =================

router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);


// ================= Resources =================

router.get(
  "/resources",
  authMiddleware,
  adminMiddleware,
  getPendingResources
);

router.put(
  "/resources/approve/:id",
  authMiddleware,
  adminMiddleware,
  approveResource
);

router.put(
  "/resources/reject/:id",
  authMiddleware,
  adminMiddleware,
  rejectResource
);


module.exports = router;