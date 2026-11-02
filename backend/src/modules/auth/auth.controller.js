
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../config/database");

// ĐĂNG KÝ
const register = async (req, res) => {
    try {
        const { full_name, email, phone, password } = req.body;

        // Kiểm tra dữ liệu
        if (!full_name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng nhập họ tên, email và mật khẩu."
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Mật khẩu phải có ít nhất 8 ký tự."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Kiểm tra email đã tồn tại
        const [existingUsers] = await db.execute(
            "SELECT id FROM users WHERE email = ?",
            [normalizedEmail]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email đã được sử dụng."
            });
        }

        // Mã hóa mật khẩu
        const passwordHash = await bcrypt.hash(password, 12);

        // Luôn cấp USER cho tài khoản đăng ký thông thường
        const [result] = await db.execute(
            `INSERT INTO users
            (full_name, email, phone, password_hash, role, is_active)
            VALUES (?, ?, ?, ?, 'USER', 1)`,
            [
                full_name.trim(),
                normalizedEmail,
                phone?.trim() || null,
                passwordHash
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Đăng ký tài khoản thành công!",
            user: {
                id: result.insertId,
                full_name: full_name.trim(),
                email: normalizedEmail,
                phone: phone?.trim() || null,
                role: "USER"
            }
        });

    } catch (error) {
        console.error("Register error:", error);

        return res.status(500).json({
            success: false,
            message: "Lỗi máy chủ khi đăng ký."
        });
    }
};


// ĐĂNG NHẬP
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng nhập email và mật khẩu."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Tìm tài khoản
        const [users] = await db.execute(
            "SELECT * FROM users WHERE email = ?",
            [normalizedEmail]
        );

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Email hoặc mật khẩu không chính xác."
            });
        }

        const user = users[0];

        if (!user.is_active) {
            return res.status(403).json({
                success: false,
                message: "Tài khoản đã bị vô hiệu hóa."
            });
        }

        // So sánh mật khẩu
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Email hoặc mật khẩu không chính xác."
            });
        }

        // Tạo JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "1d"
            }
        );

        return res.status(200).json({
            success: true,
            message: "Đăng nhập thành công!",
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            success: false,
            message: "Lỗi máy chủ khi đăng nhập."
        });
    }
};

module.exports = {
    register,
    login
};
