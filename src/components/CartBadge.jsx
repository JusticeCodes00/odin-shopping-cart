import styles from "../styles/CartBadge.module.css";

const CartBadge = ({ count }) => {
  return (
    <span
      className={styles.CartBadge}
      aria-live="polite"
      data-testid="cartItemCount"
    >
      {count}
    </span>
  );
};

export default CartBadge;
