
import { useEffect, useState } from "react";
import { getFoods, searchFoods } from "../api/foodApi";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import FoodCard from "../components/FoodCard";

function HomePage() {
    const [foods, setFoods] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadFoods = async () => {
        try {
            setLoading(true);
            setError("");

            const result = await getFoods();
            setFoods(result.data);
        } catch (err) {
            console.error(err);
            setError("Không thể tải danh sách món ăn.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!keyword.trim()) {
            loadFoods();
            return;
        }

        try {
            setLoading(true);
            setError("");

            const result = await searchFoods(keyword);
            setFoods(result.data);
        } catch (err) {
            console.error(err);
            setError("Không thể tìm kiếm món ăn.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFoods();
    }, []);

    return (
        <>
            <Navbar />

            <main>
                <section className="hero">
                    <div className="hero-content">
                        <span className="hero-label">
                            FOODWISE AI - SMART FOOD
                        </span>

                        <h1>
                            Chọn món ăn thông minh,
                            <br />
                            sống khỏe mỗi ngày!
                        </h1>

                        <p>
                            Khám phá món ăn phù hợp với ngân sách,
                            sở thích và nhu cầu dinh dưỡng của bạn.
                        </p>

                        <SearchBar
                            keyword={keyword}
                            setKeyword={setKeyword}
                            onSearch={handleSearch}
                        />
                    </div>
                </section>

                <section id="categories" className="categories-section">
                    <h2>Khám phá món ăn</h2>
                    <p>Tìm kiếm món ăn yêu thích của bạn</p>

                    <div className="category-list">
                        <div className="category-item">🍚 Cơm</div>
                        <div className="category-item">🍜 Bún - Phở</div>
                        <div className="category-item">🥗 Salad</div>
                        <div className="category-item">🥤 Đồ uống</div>
                    </div>
                </section>

                <section id="foods" className="foods-section">
                    <div className="section-heading">
                        <div>
                            <h2>Món ăn dành cho bạn</h2>
                            <p>Khám phá thực đơn từ các nhà hàng</p>
                        </div>

                        <button
                            className="reset-btn"
                            onClick={() => {
                                setKeyword("");
                                loadFoods();
                            }}
                        >
                            Xem tất cả
                        </button>
                    </div>

                    {loading && <p>Đang tải món ăn...</p>}

                    {error && <p className="error-message">{error}</p>}

                    {!loading && !error && foods.length === 0 && (
                        <p>Không tìm thấy món ăn phù hợp.</p>
                    )}

                    {!loading && !error && foods.length > 0 && (
                        <div className="food-grid">
                            {foods.map((food) => (
                                <FoodCard
                                    key={food.id}
                                    food={food}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <footer id="about" className="footer">
                <h2>FoodWise AI</h2>
                <p>
                    Nền tảng đặt món ăn thông minh tích hợp trí tuệ nhân tạo.
                </p>
                <p>© 2026 FoodWise AI. All rights reserved.</p>
            </footer>
        </>
    );
}

export default HomePage;
