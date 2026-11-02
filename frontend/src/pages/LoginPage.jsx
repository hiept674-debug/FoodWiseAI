
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await loginUser(form);

            if (result.success) {
                login(result);

                if (result.user.role === "ADMIN") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Đăng nhập thất bại. Vui lòng thử lại."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h1>Đăng nhập</h1>
                <p>Chào mừng bạn quay trở lại FoodWise AI!</p>

                {error && <div className="auth-error">{error}</div>}

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Nhập email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <label>Mật khẩu</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>

                <p className="auth-switch">
                    Chưa có tài khoản?
                    <Link to="/register"> Đăng ký ngay</Link>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;
