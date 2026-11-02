
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                FoodWise AI
            </Link>

            <div className="nav-links">
                <Link to="/">Trang chủ</Link>
                <Link to="/cart">Giỏ hàng</Link>

                {!isLoggedIn ? (
                    <>
                        <Link to="/login">Đăng nhập</Link>
                        <Link to="/register" className="register-link">
                            Đăng ký
                        </Link>
                    </>
                ) : (
                    <>
                        <span>Xin chào, {user.full_name}</span>

                        {user.role === "ADMIN" && (
                            <Link to="/admin">Quản trị</Link>
                        )}

                        <button onClick={handleLogout}>
                            Đăng xuất
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
