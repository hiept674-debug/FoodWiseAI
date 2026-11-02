
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartPage() {
    const {
        cart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice
    } = useCart();

    const formatPrice = (price) =>
        Number(price).toLocaleString("vi-VN") + " VNĐ";

    return (
        <div className="cart-page">
            <h1>Giỏ hàng của bạn</h1>

            {cart.length === 0 ? (
                <div className="empty-cart">
                    <div>🛒</div>
                    <h2>Giỏ hàng đang trống</h2>
                    <p>Hãy chọn những món ăn bạn yêu thích nhé!</p>
                    <Link to="/" className="continue-shopping">
                        Tiếp tục mua hàng
                    </Link>
                </div>
            ) : (
                <>
                    <div className="cart-list">
                        {cart.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <div className="cart-item-image">
                                    {item.image_url ? (
                                        <img
                                            src={item.image_url}
                                            alt={item.name}
                                        />
                                    ) : (
                                        "🍲"
                                    )}
                                </div>

                                <div className="cart-item-info">
                                    <h3>{item.name}</h3>
                                    <p>{formatPrice(item.price)}</p>

                                    <div className="quantity-control">
                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    item.id,
                                                    item.quantity - 1
                                                )
                                            }
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    item.id,
                                                    item.quantity + 1
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <button
                                    className="remove-cart"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Xóa
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Tổng thanh toán</h2>

                        <h2 className="cart-total">
                            {formatPrice(totalPrice)}
                        </h2>

                        <button
                            className="clear-cart"
                            onClick={clearCart}
                        >
                            Xóa giỏ hàng
                        </button>

                        <button className="checkout-btn" disabled>
                            Thanh toán (sẽ triển khai tiếp)
                        </button>
                    </div>
                </>
            )}

            <Link to="/" className="back-link">
                ← Tiếp tục chọn món
            </Link>
        </div>
    );
}

export default CartPage;
