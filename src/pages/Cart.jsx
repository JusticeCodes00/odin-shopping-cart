import styles from "../styles/Cart.module.css";
import { useOutletContext, Link} from "react-router";
import { useState} from "react";
import CartItem from "../components/CartItem";
import EmptyCart from "../components/EmptyCart";
import ACTIONS from "../cartActions";

const Cart = () => {
  const [cartItems, dispatch] = useOutletContext();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const items = cartItems ? Object.values(cartItems) : [];

  const handleIncrease = (id) => {
    dispatch({ type: ACTIONS.INCREASED_ITEM_QUANTITY, payload: { id } });
  };

  const handleDecrease = (id) => {
    dispatch({ type: ACTIONS.DECREASED_ITEM_QUANTITY, payload: { id } });
  };

  const handleRemove = (id) => {
    dispatch({ type: ACTIONS.REMOVED_ITEM_FROM_CART, payload: { id } });
  };

  const handleCheckout = () => {
    dispatch({ type: ACTIONS.CLEARED_CART });
    setCheckoutSuccess(true);
  };

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (checkoutSuccess) {
    return (
      <section className={styles.cart}>
        <div className={styles.checkoutSuccess}>
          <h3>Order Placed Successfully! 🎉</h3>
          <p>Thank you for your purchase. Your order has been confirmed.</p>
          <Link to="/shop">
            <button className={styles.continueShoppingBtn}>
              Continue Shopping
            </button>
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className={styles.cart}>
      <h2 >Your Cart</h2>

      <ul className={styles.cartItems}>
        {items.map((item) => (
          <li key={item.id}>
            <CartItem
              {...item}
              onIncrease={() => handleIncrease(item.id)}
              onDecrease={() => handleDecrease(item.id)}
              onRemove={() => handleRemove(item.id)}
            />
          </li>
        ))}
      </ul>
      <div className={styles.total}>
        <p>Total: ${totalPrice.toFixed(2)}</p>
        <button className={styles.checkoutBtn} onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </section>
  );
};

export default Cart;
