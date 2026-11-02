
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("foodwise_cart")) || [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("foodwise_cart", JSON.stringify(cart));
    }, [cart]);

    // Thêm món ăn vào giỏ
    const addToCart = (food) => {
        setCart((prev) => {
            const existing = prev.find(
                (item) => item.id === food.id
            );

            if (existing) {
                return prev.map((item) =>
                    item.id === food.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prev, { ...food, quantity: 1 }];
        });
    };

    // Xóa món ăn
    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    // Cập nhật số lượng
    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;

        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    // Xóa toàn bộ giỏ hàng
    const clearCart = () => {
        setCart([]);
    };

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    const totalPrice = cart.reduce(
        (total, item) => total + Number(item.price) * item.quantity, 0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalQuantity,
                totalPrice
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
