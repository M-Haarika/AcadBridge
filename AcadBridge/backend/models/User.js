const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    collegeEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    rollNumber: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },

    department: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },

    year: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },

    section: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },

    phoneNumber: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    // Profile Image
    profileImage: {
      type: String,
      default: "",
    },

    // About Me
    bio: {
      type: String,
      default: "",
    },

    // Social Links
    linkedin: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    portfolio: {
      type: String,
      default: "",
    },

    // Contribution Statistics
    contributionPoints: {
      type: Number,
      default: 0,
    },

    uploads: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Number,
      default: 0,
    },

    downloads: {
      type: Number,
      default: 0,
    },

    // Badge
    badge: {
      type: String,
      default: "New Member",
    },

    // Account Status
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);