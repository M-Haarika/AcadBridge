// const AccessRequest = require("../models/AccessRequest");
// const User = require("../models/User");
// const Resource = require("../models/Resource");


// // =======================================
// // Get Pending Access Requests
// // =======================================
// const getAccessRequests = async (req, res) => {
//   try {
//     const requests = await AccessRequest.find({
//       status: "pending",
//     });

//     res.status(200).json(requests);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };



// // =======================================
// // Approve Student Request
// // =======================================
// const approveRequest = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const request = await AccessRequest.findById(id);

//     if (!request) {
//       return res.status(404).json({
//         message: "Access request not found",
//       });
//     }

//     if (request.status === "approved") {
//       return res.status(400).json({
//         message: "Request already approved",
//       });
//     }

//     // Check whether user already exists
//     const existingUser = await User.findOne({
//       collegeEmail: request.collegeEmail,
//     });

//     if (existingUser) {
//       return res.status(400).json({
//         message: "User already exists",
//       });
//     }

//     // Create student account
//     const newUser = await User.create({
//       fullName: request.fullName,
//       collegeEmail: request.collegeEmail,
//       rollNumber: request.rollNumber,
//       department: request.department,
//       year: request.year,
//       section: request.section,
//       phoneNumber: request.phoneNumber,
//       password: request.password,
//       role: "student",
//     });

//     // Update request status
//     request.status = "approved";
//     await request.save();

//     res.status(200).json({
//       success: true,
//       message: "Student approved successfully",
//       user: newUser,
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };


// // =======================================
// // Reject Student Request
// // =======================================
// const rejectRequest = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const request = await AccessRequest.findById(id);

//     if (!request) {
//       return res.status(404).json({
//         message: "Access request not found",
//       });
//     }

//     if (request.status === "rejected") {
//       return res.status(400).json({
//         message: "Request already rejected",
//       });
//     }

//     request.status = "rejected";
//     await request.save();

//     res.status(200).json({
//       success: true,
//       message: "Request rejected successfully",
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };


// // =======================================
// // Get All Registered Users
// // =======================================
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find()
//       .select("-password")
//       .sort({ createdAt: -1 });

//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({
//       message: err.message,
//     });
//   }
// };

// // =======================================
// // Get Pending Resources
// // =======================================
// const getPendingResources = async (req, res) => {
//   try {
//     const resources = await Resource.find({
//       status: "pending",
//     }).populate(
//       "uploadedBy",
//       "fullName collegeEmail"
//     );

//     res.status(200).json(resources);

//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };


// // =======================================
// // Approve Resource
// // =======================================
// const approveResource = async (req, res) => {
//   try {

//     const resource = await Resource.findByIdAndUpdate(
//       req.params.id,
//       {
//         status: "approved",
//       },
//       {
//         new: true,
//       }
//     );

//     if (!resource) {
//       return res.status(404).json({
//         message: "Resource not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Resource approved successfully",
//       resource,
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };


// // =======================================
// // Reject Resource
// // =======================================
// const rejectResource = async (req, res) => {
//   try {

//     const resource = await Resource.findByIdAndDelete(
//       req.params.id
//     );

//     if (!resource) {
//       return res.status(404).json({
//         message: "Resource not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Resource rejected successfully",
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };


// // =======================================
// // Export All Controllers
// // =======================================
// module.exports = {
//   getAccessRequests,
//   approveRequest,
//   rejectRequest,
//   getAllUsers,
//   getPendingResources,
//   approveResource,
//   rejectResource,
// };

const AccessRequest = require("../models/AccessRequest");
const User = require("../models/User");
const Resource = require("../models/Resource");


// =======================================
// Get Pending Access Requests
// =======================================
const getAccessRequests = async (req, res) => {
  try {

    const requests = await AccessRequest.find({
      status: "pending",
    });

    res.status(200).json(requests);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// =======================================
// Approve Student Request
// =======================================
const approveRequest = async (req, res) => {
  try {

    const { id } = req.params;

    const request = await AccessRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        message: "Access request not found",
      });
    }

    if (request.status === "approved") {
      return res.status(400).json({
        message: "Request already approved",
      });
    }

    const existingUser = await User.findOne({
      collegeEmail: request.collegeEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const newUser = await User.create({
      fullName: request.fullName,
      collegeEmail: request.collegeEmail,
      rollNumber: request.rollNumber,
      department: request.department,
      year: request.year,
      section: request.section,
      phoneNumber: request.phoneNumber,
      password: request.password,
      role: "student",
    });

    request.status = "approved";
    await request.save();

    res.status(200).json({
      success: true,
      message: "Student approved successfully",
      user: newUser,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// =======================================
// Reject Student Request
// =======================================
const rejectRequest = async (req, res) => {
  try {

    const { id } = req.params;

    const request = await AccessRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        message: "Access request not found",
      });
    }

    if (request.status === "rejected") {
      return res.status(400).json({
        message: "Request already rejected",
      });
    }

    request.status = "rejected";
    await request.save();

    res.status(200).json({
      success: true,
      message: "Request rejected successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// =======================================
// Get All Registered Users
// =======================================
const getAllUsers = async (req, res) => {
  try {

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// =======================================
// Get Pending Resources
// =======================================
const getPendingResources = async (req, res) => {
  try {

    const resources = await Resource.find({
      status: "pending",
    }).populate(
      "uploadedBy",
      "fullName collegeEmail"
    );

    res.status(200).json(resources);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// =======================================
// Approve Resource
// =======================================
const approveResource = async (req, res) => {
  try {

    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      {
        status: "approved",
      },
      {
        new: true,
      }
    );

    if (!resource) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resource approved successfully",
      resource,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// =======================================
// Reject Resource
// =======================================
const rejectResource = async (req, res) => {
  try {

    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      {
        status: "rejected",
      },
      {
        new: true,
      }
    );

    if (!resource) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resource rejected successfully",
      resource,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// =======================================
// Export Controllers
// =======================================
module.exports = {
  getAccessRequests,
  approveRequest,
  rejectRequest,
  getAllUsers,
  getPendingResources,
  approveResource,
  rejectResource,
};