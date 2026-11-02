
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getFoodById } from "../api/foodApi";
import { useCart } from "../context/CartContext";
function FoodDetailPage() {
    const { id } = useParams();

    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { addToCart } = useCart();

    const navigate = useNavigate();
    useEffect(() => {
        const fetchFood = async () => {
            try {
                setLoading(true);
                const data = await getFoodById(id);

                // Hỗ trợ API trả về trực tiếp hoặc bọc trong data
                setFood(data.data ?? data);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Không thể tải thông tin món ăn."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchFood();
    }, [id]);

    if (loading) {
        return <div className="detail-message">Đang tải món ăn...</div>;
    }

    if (error || !food) {
        return (
            <div className="detail-message">
                {error || "Không tìm thấy món ăn."}
                <p><Link to="/">Quay lại trang chủ</Link></p>
            </div>
        );
    }

    return (
        <div className="food-detail-page">
            <Link to="/" className="back-link">
                ← Quay lại trang chủ
            </Link>

            <div className="food-detail-container">
                <div className="food-detail-image">
                    {food.image_url ? (
                        <img src={food.image_url} alt={food.name} />
                    ) : (
                        <span>🍲</span>
                    )}
                </div>

                <div className="food-detail-info">
                    <span className="food-category">
                        {food.category_name || "Món ăn"}
                    </span>

                    <h1>{food.name}</h1>

                    <p>{food.description || "Chưa có mô tả món ăn."}</p>

                    <h2>
                        {Number(food.price || 0).toLocaleString("vi-VN")} VNĐ
                    </h2>

                    <div className="nutrition-info">
                        <h3>Thông tin dinh dưỡng</h3>

                        <p>Calories: {food.calories ?? "Chưa có"} kcal</p>
                        <p>Protein: {food.protein ?? "Chưa có"} g</p>
                        <p>Carbohydrates: {food.carbohydrates ?? "Chưa có"} g</p>
                        <p>Fat: {food.fat ?? "Chưa có"} g</p>
                    </div>

                    <p>
                        Nhà hàng: {food.restaurant_name || "Đang cập nhật"}
                    </p>

                    <button
                        className="add-cart-btn"
                        onClick={() => {
                            addToCart(food);
                            navigate("/cart");
                        }}
                    >
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FoodDetailPage;
