
CREATE DATABASE IF NOT EXISTS food_ai_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE food_ai_db;

-- 1. Người dùng
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN') DEFAULT 'USER',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Nhà hàng
CREATE TABLE restaurants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    address VARCHAR(255),
    phone VARCHAR(20),
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Danh mục món ăn
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- 4. Món ăn
CREATE TABLE foods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT NOT NULL,
    category_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(12,2) NOT NULL,
    image_url VARCHAR(500),
    ingredients TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 5. Thông tin dinh dưỡng
CREATE TABLE food_nutrition (
    id INT AUTO_INCREMENT PRIMARY KEY,
    food_id INT NOT NULL UNIQUE,
    calories DECIMAL(10,2) DEFAULT 0,
    protein DECIMAL(10,2) DEFAULT 0,
    carbohydrates DECIMAL(10,2) DEFAULT 0,
    fat DECIMAL(10,2) DEFAULT 0,

    FOREIGN KEY (food_id) REFERENCES foods(id)
);

-- 6. Sở thích và mục tiêu người dùng
CREATE TABLE user_preferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    budget DECIMAL(12,2),
    target_calories DECIMAL(10,2),
    favorite_ingredients TEXT,
    disliked_ingredients TEXT,

    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 7. Giỏ hàng
CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    food_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY unique_cart_food (user_id, food_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (food_id) REFERENCES foods(id)
);

-- 8. Đơn hàng
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(12,2) NOT NULL,
    delivery_address VARCHAR(500) NOT NULL,
    note TEXT,
    order_status ENUM(
        'PENDING',
        'CONFIRMED',
        'PREPARING',
        'DELIVERING',
        'COMPLETED',
        'CANCELLED'
    ) DEFAULT 'PENDING',
    payment_status ENUM(
        'UNPAID',
        'PAID',
        'FAILED',
        'REFUNDED'
    ) DEFAULT 'UNPAID',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 9. Chi tiết đơn hàng
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    food_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(12,2) NOT NULL,

    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (food_id) REFERENCES foods(id)
);

-- 10. Đánh giá món ăn
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    food_id INT NOT NULL,
    rating INT NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY unique_user_food_review (user_id, food_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (food_id) REFERENCES foods(id)
);

-- 11. Món ăn yêu thích
CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    food_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY unique_favorite (user_id, food_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (food_id) REFERENCES foods(id)
);

-- 12. Lịch sử tương tác phục vụ AI
CREATE TABLE user_food_interactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    food_id INT NOT NULL,
    interaction_type ENUM(
        'VIEW',
        'LIKE',
        'ADD_TO_CART',
        'ORDER',
        'REVIEW'
    ) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (food_id) REFERENCES foods(id),

    INDEX idx_user_food (user_id, food_id)
);

-- 13. Thanh toán
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    provider VARCHAR(50) NOT NULL,
    transaction_ref VARCHAR(150),
    amount DECIMAL(12,2) NOT NULL,
    status ENUM(
        'PENDING',
        'SUCCESS',
        'FAILED',
        'REFUNDED'
    ) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY unique_transaction (provider, transaction_ref),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
