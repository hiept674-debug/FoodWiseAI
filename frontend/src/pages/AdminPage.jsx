import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const menus = [
        {
            title: "Quản lý món ăn",
            description: "Thêm, sửa, xóa và xem danh sách món ăn",
            icon: "🍲",
            path: "/admin/foods"
        },
        {
            title: "Quản lý danh mục",
            description: "Quản lý các danh mục món ăn",
            icon: "📂",
            path: "/admin/categories"
        },
        {
            title: "Quản lý người dùng",
            description: "Xem và quản lý tài khoản người dùng",
            icon: "👥",
            path: "/admin/users"
        },
        {
            title: "Quản lý đơn hàng",
            description: "Theo dõi và cập nhật đơn hàng",
            icon: "🛒",
            path: "/admin/orders"
        }
    ];

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <h2>FoodWise AI</h2>
                <p className="admin-label">ADMIN PANEL</p>

                <nav>
                    <Link to="/admin">📊 Dashboard</Link>
                    <Link to="/admin/foods">🍲 Món ăn</Link>
                    <Link to="/admin/categories">📂 Danh mục</Link>
                    <Link to="/admin/users">👥 Người dùng</Link>
                    <Link to="/admin/orders">🛒 Đơn hàng</Link>
                    <Link to="/">🌐 Xem website</Link>
                </nav>

                <button onClick={handleLogout}>
                    Đăng xuất
                </button>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <div>
                        <h1>Dashboard</h1>
                        <p>Chào mừng bạn đến trang quản trị FoodWise AI.</p>
                    </div>

                    <div className="admin-account">
                        <span>👤 {user?.full_name}</span>
                        <span className="admin-role">ADMIN</span>
                    </div>
                </header>

                <section className="admin-welcome">
                    <h2>Xin chào, {user?.full_name}!</h2>
                    <p>Quản lý hệ thống FoodWise AI tại đây.</p>
                </section>

                <section className="admin-grid">
                    {menus.map((menu) => (
                        <Link
                            to={menu.path}
                            className="admin-card"
                            key={menu.path}
                        >
                            <span className="admin-card-icon">
                                {menu.icon}
                            </span>

                            <h3>{menu.title}</h3>
                            <p>{menu.description}</p>

                            <span className="admin-card-link">
                                Quản lý →
                            </span>
                        </Link>
                    ))}
                </section>
            </main>
        </div>
    );
}

export default AdminPage;