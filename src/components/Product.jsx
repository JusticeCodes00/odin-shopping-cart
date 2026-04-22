import { Star, Minus, Plus } from "lucide-react";
import styles from "../styles/Product.module.css";
import { useState } from "react";

const Product = (props) => {
  const { title, price, description, category, image, rating, onAddToCart } =
    props;
  const [quantity, setQuantity] = useState(1);

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  const handleMinus = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const stars = (rating) => {
    const roundedRate = Math.round(rating.rate);

    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} fill={i < roundedRate ? "#FFC107" : "#E4E4E4"} />
    ));
  };

  return (
    <article className={styles.article}>
      <img src={image} alt={title} />

      <p>{category}</p>

      <div className={styles.starsContainer}>
        {stars(rating)} ({rating.rate})
      </div>

      <h3>{title}</h3>

      <p className={styles.price}>Price: ${price}</p>

      <div className={styles.quantityRow}>
        {/* Minus Button */}
        <button onClick={handleMinus}>
          <Minus size={16} />
        </button>

        {/* Input control */}
        <input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (!isNaN(val) && val >= 1) setQuantity(val);
          }}
        />

        {/* Plus Button */}
        <button onClick={handlePlus}>
          <Plus size={16} />
        </button>
      </div>

      {/* Description */}
      <p className={styles.description}>{description}</p>

      <div className={styles.buttonRow}>
        <button
          onClick={() => {
            onAddToCart(quantity);
            setQuantity(1);
          }}
          className={styles.addToCart}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default Product;
