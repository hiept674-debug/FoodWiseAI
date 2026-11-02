import { Link } from "react-router-dom";
function FoodCard({ food }) {
    return (
        <div className="food-card">
            <div className="food-image">
                {food.image_url ? (
                    <img src={food.image_url} alt={food.name} />
                ) : (
                    <div className="image-placeholder">
                        <span>🍽️</span>
                    </div>
                )}
            </div>

            <div className="food-content">
                <span className="food-category">
                    {food.category_name}
                </span>

                <h3>{food.name}</h3>

                <p className="food-description">
                    {food.description || "Món ăn thơm ngon, hấp dẫn"}
                </p>

                <p className="restaurant-name">
                    🏪 {food.restaurant_name}
                </p>

                <div className="food-info">
                    <span>🔥 {food.calories ?? "--"} kcal</span>
                    <strong>
                        {Number(food.price).toLocaleString("vi-VN")}đ
                    </strong>
                </div>

                <Link to={`/foods/${food.id}`} className="detail-btn">Xem chi tiết</Link>
            </div>
        </div>
    );
}

export default FoodCard;
