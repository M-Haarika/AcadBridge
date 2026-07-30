const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login Controller
const loginUser = async (req, res) => {
  try {
    const { collegeEmail, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ collegeEmail });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Send complete user details
    res.status(200).json({
      message: "Login successful",
      token,

      user: {
        _id: user._id,

        fullName: user.fullName,
        collegeEmail: user.collegeEmail,

        rollNumber: user.rollNumber,
        department: user.department,
        year: user.year,
        section: user.section,

        phoneNumber: user.phoneNumber,

        role: user.role,

        linkedin: user.linkedin || "",
        github: user.github || "",
        portfolio: user.portfolio || "",

        contributionPoints: user.contributionPoints || 0,
        uploads: user.uploads || 0,
        likes: user.likes || 0,
        downloads: user.downloads || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get Logged-in User Profile
const getProfile = async (req, res) => {
  try {
    // req.user.id comes from authMiddleware
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
// Update Logged-in User Profile
const updateProfile = async (req, res) => {
  try {

    const {
      fullName,
      phoneNumber,
      bio,
      linkedin,
      github,
      portfolio,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Update only editable fields
    if (fullName !== undefined) user.fullName = fullName;
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
    if (bio !== undefined) user.bio = bio;
    if (linkedin !== undefined) user.linkedin = linkedin;
    if (github !== undefined) user.github = github;
    if (portfolio !== undefined) user.portfolio = portfolio;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  loginUser,
  getProfile,
  updateProfile,
};