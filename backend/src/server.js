
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const foodRoutes = require("./modules/foods/foods.routes");
const authRoutes = require("./modules/auth/auth.routes");
const db = require("./config/database");
const {verifyToken,requireAdmin} = require("./middleware/authMiddleware");
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL
}));

app.use(express.json());

app.use("/api/foods", foodRoutes);
app.use("/api/auth", authRoutes);

// API chỉ dành cho người đã đăng nhập
app.get("/api/auth/profile", verifyToken, (req, res) => {
    res.json({
        success: true,
        message: "Xác thực JWT thành công!",
        user: req.user
    });
});

// API chỉ dành cho ADMIN
app.get(
    "/api/auth/admin",
    verifyToken,
    requireAdmin,
    (req, res) => {
        res.json({
            success: true,
            message: "Chào mừng ADMIN!"
        });
    }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
