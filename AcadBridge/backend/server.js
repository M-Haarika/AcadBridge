const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const accessRoutes = require("./routes/accessRoutes");
const adminRoutes = require("./routes/adminRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
dotenv.config();

require("./models/User");
require("./models/AccessRequest");
require("./models/Resource");
require("./models/Announcement");
require("./models/Bookmark");


dotenv.config();

console.log(process.env.CLOUDINARY_CLOUD_NAME);
console.log(process.env.CLOUDINARY_API_KEY);
console.log(process.env.CLOUDINARY_API_SECRET);

const app = express();


// Database
connectDB();


// Middleware
app.use(cors());

app.use(express.json());   // ⭐ Important


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/access", accessRoutes);

app.use(
    "/api/admin",
    adminRoutes
);

app.use("/api/resources", resourceRoutes);

app.get("/", (req,res)=>{
    res.send("AcadBridge Backend Running 🚀");
});


const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});