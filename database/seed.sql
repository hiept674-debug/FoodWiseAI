
USE food_ai_db;

-- 1. Nhà hàng
INSERT INTO restaurants (name, description, address, phone, image_url)
VALUES
('FoodWise Healthy', 'Nhà hàng chuyên món ăn lành mạnh', 'Đà Nẵng', '0901234567', NULL),
('Vietnam Food', 'Nhà hàng món ăn truyền thống Việt Nam', 'Đà Nẵng', '0907654321', NULL);

-- 2. Danh mục
INSERT INTO categories (name, description)
VALUES
('Cơm', 'Các món cơm'),
('Bún - Phở', 'Các món bún và phở'),
('Salad', 'Các món salad'),
('Đồ uống', 'Nước uống và sinh tố');

-- 3. Món ăn
INSERT INTO foods
(restaurant_id, category_id, name, description, price, image_url, ingredients)
VALUES
(1, 1, 'Cơm gà rau củ', 'Cơm gà kết hợp rau củ tươi', 45000, NULL, 'Gà, cơm, cà rốt, bông cải'),
(1, 1, 'Cơm bò áp chảo', 'Cơm bò áp chảo và rau xanh', 55000, NULL, 'Thịt bò, cơm, rau xanh'),
(2, 2, 'Bún thịt nướng', 'Bún thịt nướng truyền thống', 40000, NULL, 'Bún, thịt heo, rau sống'),
(1, 3, 'Salad gà', 'Salad rau củ và thịt gà', 35000, NULL, 'Gà, xà lách, cà chua, dưa leo'),
(2, 1, 'Cơm sườn', 'Cơm sườn nướng', 40000, NULL, 'Sườn heo, cơm, dưa leo');

-- 4. Thông tin dinh dưỡng mẫu
-- Các chỉ số dưới đây chỉ là dữ liệu GIẢ LẬP để kiểm thử.
-- Không sử dụng như số liệu dinh dưỡng thực tế.

INSERT INTO food_nutrition
(food_id, calories, protein, carbohydrates, fat)
VALUES
(1, 550, 35, 65, 15),
(2, 620, 40, 70, 18),
(3, 580, 25, 75, 20),
(4, 320, 30, 20, 10),
(5, 650, 28, 80, 22);
