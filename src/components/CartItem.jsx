import { Minus, Plus, Trash2 } from "lucide-react";
import styles from "../styles/CartItem.module.css";

const CartItem = ({
  title,
  price,
  image,
  category,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <article className={styles.cartItem}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.details}>
        <p className={styles.category}>{category}</p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>${(price * quantity).toFixed(2)}</p>
        <div className={styles.actions}>
          <div className={styles.quantityRow}>
            <button onClick={onDecrease}>
              <Minus size={14} strokeWidth={2.5} />
            </button>
            <span>{quantity}</span>
            <button onClick={onIncrease}>
              <Plus size={14} strokeWidth={2.5} />
            </button>
          </div>
          <button className={styles.removeBtn} onClick={onRemove}>
            <Trash2 size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default CartItem;
