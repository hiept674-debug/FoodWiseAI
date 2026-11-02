
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

function RegisterPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        full_name: "",
        email: "",
        phone: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
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
        setSuccess("");
        setLoading(true);

        try {
            const result = await registerUser(form);

            if (result.success) {
                setSuccess("Đăng ký thành công! Đang chuyển đến đăng nhập...");

                setTimeout(() => {
                    navigate("/login");
                }, 1200);
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Đăng ký thất bại. Vui lòng thử lại."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h1>Tạo tài khoản</h1>
                <p>Tham gia FoodWise AI ngay hôm nay!</p>

                {error && <div className="auth-error">{error}</div>}
                {success && <div className="auth-success">{success}</div>}

                <label>Họ và tên</label>
                <input
                    name="full_name"
                    placeholder="Nhập họ tên"
                    value={form.full_name}
                    onChange={handleChange}
                    required
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Nhập email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <label>Số điện thoại</label>
                <input
                    type="tel"
                    name="phone"
                    placeholder="Nhập số điện thoại"
                    value={form.phone}
                    onChange={handleChange}
                />

                <label>Mật khẩu</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Tối thiểu 8 ký tự"
                    value={form.password}
                    onChange={handleChange}
                    minLength={8}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Đang đăng ký..." : "Đăng ký"}
                </button>

                <p className="auth-switch">
                    Đã có tài khoản?
                    <Link to="/login"> Đăng nhập</Link>
                </p>
            </form>
        </div>
    );
}

export default RegisterPage;
