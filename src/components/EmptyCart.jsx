import { ShoppingCart } from "lucide-react";
import styles from "../styles/EmptyCart.module.css";
import { Link } from "react-router";

const EmptyCart = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.iconWrapper}>
        <ShoppingCart size={40} strokeWidth={1.5} />
      </div>
      <h3>Your cart is empty</h3>
      <p>
        Looks like you haven't added anything yet. Go find something you like.
      </p>

      <Link className={styles.browseBtn} to="/shop">
        Browse products
      </Link>
    </section>
  );
};

export default EmptyCart;
