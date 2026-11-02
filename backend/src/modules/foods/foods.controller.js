
const db = require("../../config/database");

// GET: Lấy danh sách món ăn
const getAllFoods = async (req, res) => {
    try {
        const { category, restaurant, minPrice, maxPrice } = req.query;

        let sql = `
            SELECT
                f.id,
                f.name,
                f.description,
                f.price,
                f.image_url,
                f.ingredients,
                f.is_available,
                r.id AS restaurant_id,
                r.name AS restaurant_name,
                c.id AS category_id,
                c.name AS category_name,
                n.calories,
                n.protein,
                n.carbohydrates,
                n.fat
            FROM foods f
            JOIN restaurants r ON f.restaurant_id = r.id
            JOIN categories c ON f.category_id = c.id
            LEFT JOIN food_nutrition n ON f.id = n.food_id
            WHERE f.is_available = TRUE
        `;

        const params = [];

        if (category) {
            sql += " AND f.category_id = ?";
            params.push(category);
        }

        if (restaurant) {
            sql += " AND f.restaurant_id = ?";
            params.push(restaurant);
        }

        if (minPrice !== undefined) {
            sql += " AND f.price >= ?";
            params.push(minPrice);
        }

        if (maxPrice !== undefined) {
            sql += " AND f.price <= ?";
            params.push(maxPrice);
        }

        sql += " ORDER BY f.id DESC";

        const [foods] = await db.query(sql, params);

        res.status(200).json({
            success: true,
            total: foods.length,
            data: foods
        });
    } catch (error) {
        console.error("Get foods error:", error);

        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy danh sách món ăn"
        });
    }
};

// GET: Lấy chi tiết một món ăn
const getFoodById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!/^\d+$/.test(id)) {
            return res.status(400).json({
                success: false,
                message: "ID món ăn không hợp lệ"
            });
        }

        const [foods] = await db.query(
            `SELECT
                f.id,
                f.name,
                f.description,
                f.price,
                f.image_url,
                f.ingredients,
                f.is_available,
                r.name AS restaurant_name,
                c.name AS category_name,
                n.calories,
                n.protein,
                n.carbohydrates,
                n.fat
             FROM foods f
             JOIN restaurants r ON f.restaurant_id = r.id
             JOIN categories c ON f.category_id = c.id
             LEFT JOIN food_nutrition n ON f.id = n.food_id
             WHERE f.id = ?`,
            [id]
        );

        if (foods.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy món ăn"
            });
        }

        res.status(200).json({
            success: true,
            data: foods[0]
        });
    } catch (error) {
        console.error("Get food detail error:", error);

        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy chi tiết món ăn"
        });
    }
};

// GET: Tìm kiếm món ăn theo tên
const searchFoods = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || !q.trim()) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng nhập tên món ăn cần tìm"
            });
        }

        const keyword = `%${q.trim()}%`;

        const [foods] = await db.query(
            `SELECT
                f.id,
                f.name,
                f.description,
                f.price,
                f.image_url,
                r.name AS restaurant_name,
                c.name AS category_name,
                n.calories
             FROM foods f
             JOIN restaurants r ON f.restaurant_id = r.id
             JOIN categories c ON f.category_id = c.id
             LEFT JOIN food_nutrition n ON f.id = n.food_id
             WHERE f.is_available = TRUE
             AND f.name LIKE ?
             ORDER BY f.id DESC`,
            [keyword]
        );

        res.status(200).json({
            success: true,
            total: foods.length,
            data: foods
        });
    } catch (error) {
        console.error("Search foods error:", error);

        res.status(500).json({
            success: false,
            message: "Lỗi khi tìm kiếm món ăn"
        });
    }
};

module.exports = {
    getAllFoods,
    getFoodById,
    searchFoods
};
